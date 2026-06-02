import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkCallout from "../utils/remarkCallout";
import { preprocessContent } from "../utils/preprocess";
import Callout from "./Callout";
import { getBlog, getBlogs, getGroupedBlogs } from "../services/api";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractTOC(content) {
  const items = [];
  const headingRegex = /^(#{1,2})\s+(.+)$/gm;
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2].trim().replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
    items.push({
      type: "heading",
      level: match[1].length,
      text,
      id: slugify(text),
    });
  }
  return items;
}

function getText(children) {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(getText).join("");
  if (children?.props?.children) return getText(children.props.children);
  return "";
}

function createHeadingRenderer(level) {
  return function HeadingRenderer({ children, ...props }) {
    const text = getText(children);
    const id = slugify(text);
    const Tag = `h${level}`;
    return <Tag id={id} {...props}>{children}</Tag>;
  };
}

function buildFileTree(grouped, allBlogs) {
  const cats = Object.keys(grouped).filter((c) => c !== "General");
  const tree = [];

  for (const mc of cats) {
    const subs = grouped[mc];
    const mcBlogs = allBlogs.filter((b) => b.mainCategory === mc);
    const mainNode = { name: mc, type: "folder", children: [], count: mcBlogs.length };

    for (const [rawSub, subBlogs] of Object.entries(subs)) {
      const multiSubs = rawSub.split(/\s*\|\|\s*/);
      for (const singleSub of multiSubs) {
        const parts = singleSub.split(/\s*>\s*/);
        let current = mainNode.children;

        for (let pi = 0; pi < parts.length; pi++) {
          const part = parts[pi];
          let existing = current.find((n) => n.type === "folder" && n.name === part);
          if (!existing) {
            existing = { name: part, type: "folder", children: [], count: 0 };
            current.push(existing);
          }
          existing.count += subBlogs.length;
          current = existing.children;
        }

        for (const blog of subBlogs) {
          if (!current.find((n) => n.type === "file" && n.slug === blog.slug)) {
            current.push({ name: blog.title, type: "file", slug: blog.slug, blog });
          }
        }
      }
    }

    const directBlogs = mcBlogs.filter((b) => !b.subCategory);
    for (const blog of directBlogs) {
      if (!mainNode.children.find((n) => n.type === "file" && n.slug === blog.slug)) {
        mainNode.children.push({ name: blog.title, type: "file", slug: blog.slug, blog });
      }
    }

    if (mainNode.count) tree.push(mainNode);
  }

  if (grouped["General"]) {
    const gBlogs = allBlogs.filter((b) => !b.mainCategory || b.mainCategory === "General");
    if (gBlogs.length) {
      const uncatNode = { name: "Uncategorized", type: "folder", children: [], count: gBlogs.length };
      for (const blog of gBlogs) {
        uncatNode.children.push({ name: blog.title, type: "file", slug: blog.slug, blog });
      }
      tree.push(uncatNode);
    }
  }

  return tree;
}

function Chevron({ open }) {
  return (
    <svg className={`w-3 h-3 shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
      fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg className="w-4 h-4 shrink-0 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function FolderIcon({ open }) {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      {open ? (
        <path d="M5 19a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v1M5 19h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2z" />
      ) : (
        <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2z" />
      )}
    </svg>
  );
}

function FileTree({ nodes, depth, catOpen, toggleCat, onSelectFile, activeSlug }) {
  return nodes.map((node, i) => {
    const key = node.name + depth + i;

    if (node.type === "file") {
      return (
        <div key={key}>
          <button
            onClick={() => onSelectFile(node.blog)}
            className={`w-full flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs transition-all text-left ${
              activeSlug === node.slug
                ? "bg-blue-500/10 text-blue-400 border-l-2 border-blue-500"
                : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]"
            }`}
            style={{ paddingLeft: `${depth * 16 + 12}px` }}
          >
            <FileIcon />
            <span className="truncate text-xs">{node.name}</span>
          </button>
        </div>
      );
    }

    const isOpen = catOpen[key] !== false;

    return (
      <div key={key}>
        <button
          onClick={() => toggleCat(key)}
          className={`w-full flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs transition-all text-left ${
            depth === 0
              ? "text-gray-300 hover:text-white hover:bg-white/[0.04] font-medium"
              : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]"
          }`}
          style={{ paddingLeft: `${depth * 16 + 12}px` }}
        >
          <Chevron open={isOpen} />
          <FolderIcon open={isOpen} />
          <span className="truncate text-xs">{node.name}</span>
          <span className="text-[10px] text-gray-600 ml-auto shrink-0">{node.count}</span>
        </button>
        {isOpen && node.children.length > 0 && (
          <FileTree
            nodes={node.children}
            depth={depth + 1}
            catOpen={catOpen}
            toggleCat={toggleCat}
            onSelectFile={onSelectFile}
            activeSlug={activeSlug}
          />
        )}
      </div>
    );
  });
}

function BlogContentView({ blog }) {
  const headings = useMemo(() => extractTOC(blog.content), [blog]);

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const link = document.querySelector(`[href="#${entry.target.id}"]`);
            if (link) link.setAttribute("data-active-heading", "true");
          } else {
            const link = document.querySelector(`[href="#${entry.target.id}"]`);
            if (link) link.removeAttribute("data-active-heading");
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );
    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-10">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <span className="text-blue-400">{blog.mainCategory || "General"}</span>
          {blog.subCategory && (
            <>
              <span className="text-gray-600">/</span>
              <span>{blog.subCategory}</span>
            </>
          )}
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white">
          {blog.title}
        </h1>
        <p className="text-gray-400 text-base mt-5 leading-relaxed">
          {blog.description}
        </p>
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {blog.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center gap-3 mt-5 text-xs border-b border-white/5 pb-5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
              H
            </div>
            <span className="text-gray-300">Harshavardhan</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-gray-600"></span>
          <span className="text-gray-500">{new Date(blog.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
          <span className="w-1 h-1 rounded-full bg-gray-600"></span>
          <span className="text-gray-500">{blog.readTime}</span>
        </div>
      </header>

      <div className="prose prose-invert prose-lg max-w-none
        prose-headings:text-white prose-headings:font-bold
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:scroll-mt-24
        prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:scroll-mt-24
        prose-p:text-gray-300 prose-p:leading-8 prose-p:mt-4
        prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
        prose-strong:text-white
        prose-code:text-blue-300 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
        prose-li:text-gray-300
        prose-blockquote:border-blue-500 prose-blockquote:text-gray-400
        prose-img:rounded-xl
      ">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkCallout]}
          components={{
            code({ children, className }) {
              return <code className={className}>{children}</code>;
            },
            h1: createHeadingRenderer(1),
            h2: createHeadingRenderer(2),
            h3: createHeadingRenderer(3),
            pre({ children, ...props }) {
              const lang = children?.props?.className?.replace("language-", "") || "";
              return (
                <div className="relative my-4 rounded-lg overflow-hidden border border-[#30363d]">
                  {lang && (
                    <div className="bg-[#161b22] px-4 py-1.5 text-[11px] text-gray-400 border-b border-[#30363d] font-medium">
                      {lang}
                    </div>
                  )}
                  <pre className="bg-[#0d1117] overflow-x-auto p-4 text-sm leading-relaxed m-0" {...props}>
                    {children}
                  </pre>
                </div>
              );
            },
            blockquote({ className, children, ...props }) {
              if (className?.startsWith("callout ")) {
                const type = className.replace("callout callout-", "");
                return <Callout type={type}>{children}</Callout>;
              }
              return <blockquote className={className} {...props}>{children}</blockquote>;
            },
          }}
        >
          {preprocessContent(blog.content)}
        </ReactMarkdown>
      </div>
    </article>
  );
}

function OnThisPage({ headings }) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );
    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav className="space-y-0.5">
      {headings.map((h, i) => (
        <a
          key={i}
          href={`#${h.id}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
          }}
          className={`block text-xs py-1 px-2.5 rounded-lg transition-all ${
            h.level === 1
              ? "text-gray-300 font-medium"
              : h.level === 2
              ? "text-gray-500"
              : "text-gray-600"
          } ${
            activeId === h.id
              ? "text-blue-400 bg-blue-500/10 font-medium"
              : "hover:text-gray-200 hover:bg-white/[0.03]"
          }`}
          style={{ paddingLeft: `${12 + (h.level - 1) * 1}px` }}
        >
          {h.text}
        </a>
      ))}
    </nav>
  );
}

export default function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [grouped, setGrouped] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [catOpen, setCatOpen] = useState({});
  const [activeBlog, setActiveBlog] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      getBlog(slug),
      getBlogs(),
      getGroupedBlogs(),
    ])
      .then(([blogRes, blogsRes, groupedRes]) => {
        const b = blogRes.data;
        setBlog(b);
        setActiveBlog(b);
        setAllBlogs(blogsRes.data);
        setGrouped(groupedRes.data);
      })
      .catch((err) => {
        if (err.response?.status === 404) setError("Blog not found");
        else setError("Failed to load blog");
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const fileTree = useMemo(() => buildFileTree(grouped, allBlogs), [grouped, allBlogs]);
  const headings = useMemo(() => activeBlog ? extractTOC(activeBlog.content) : [], [activeBlog]);

  const handleSelectFile = useCallback((fileBlog) => {
    getBlog(fileBlog.slug)
      .then((res) => setActiveBlog(res.data))
      .catch(() => {});
  }, []);

  const toggleCat = useCallback((key) => {
    setCatOpen((p) => ({ ...p, [key]: p[key] === false ? true : false }));
  }, []);

  if (loading) {
    return (
      <section className="h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-gray-500">Loading blog...</span>
        </div>
      </section>
    );
  }

  if (error || !blog) {
    return (
      <section className="h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-gray-400 text-lg">{error || "Blog not found"}</p>
        <Link to="/blogs" className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 hover:bg-blue-500/20 px-4 py-2 rounded-lg">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blogs
        </Link>
      </section>
    );
  }

  return (
    <div className="h-screen bg-[#020617] text-white flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="shrink-0 border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 flex items-center h-12 gap-4">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-400 transition-colors shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Blogs
          </Link>
          <span className="text-gray-600 text-xs">/</span>
          <span className="text-xs text-gray-300 truncate">{blog.title}</span>
        </div>
      </div>

      {/* 3-column layout */}
      <div className="flex-1 flex overflow-hidden gap-6 px-4 md:px-8 py-6">
        {/* LEFT: Explorer — card style, sticky, no scroll */}
        <aside className="w-60 xl:w-64 shrink-0 hidden lg:block">
          <div className="border border-white/10 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-b border-white/5">
              <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Explorer</span>
              <span className="text-[11px] text-gray-600">{allBlogs.length} items</span>
            </div>
            <nav className="px-3 py-3 space-y-0.5">
              <FileTree
                nodes={fileTree}
                depth={0}
                catOpen={catOpen}
                toggleCat={toggleCat}
                onSelectFile={handleSelectFile}
                activeSlug={activeBlog?.slug}
              />
            </nav>
          </div>
        </aside>

        {/* CENTER: Blog Content — scrollable */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          {activeBlog ? (
            <div className="py-4">
              <BlogContentView blog={activeBlog} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">Select a post from the explorer</p>
              </div>
            </div>
          )}
        </main>

        {/* RIGHT: On This Page — card style, sticky, no scroll */}
        <aside className="w-56 xl:w-64 shrink-0 hidden lg:block">
          <div className="border border-white/10 rounded-xl overflow-hidden">
            <div className="px-6 py-3 bg-white/[0.02] border-b border-white/5">
              <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">On This Page</span>
            </div>
            <nav className="px-3 py-3">
              {activeBlog ? (
                <OnThisPage headings={headings} />
              ) : (
                <p className="text-gray-600 text-sm text-center py-8">Select a post to see its table of contents.</p>
              )}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}
