import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBlog, getBlogs, getGroupedBlogs } from "../services/api";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractTOC(content) {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      level: match[1].length,
      text: match[2].trim(),
      id: slugify(match[2].trim()),
    });
  }
  return headings;
}

function getText(children) {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(getText).join("");
  if (children?.props?.children) return getText(children.props.children);
  return "";
}

function HeadingRenderer({ level, children, ...props }) {
  const text = getText(children);
  const id = slugify(text);
  const Tag = `h${level}`;
  return <Tag id={id} {...props}>{children}</Tag>;
}

function buildFileTree(grouped, allBlogs) {
  const cats = Object.keys(grouped).filter((c) => c !== "General");
  const tree = [];

  for (const mc of cats) {
    const subs = grouped[mc];
    const mcBlogs = allBlogs.filter((b) => b.mainCategory === mc);
    const mainNode = { name: mc, type: "folder", children: [], count: mcBlogs.length };

    for (const [rawSub, subBlogs] of Object.entries(subs)) {
      // Split multi-value subCategories on "||"
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

    // Blogs directly under mainCategory with no subCategory
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

function FileTree({ nodes, depth, catOpen, toggleCat, onSelectFile, activeSlug }) {
  return nodes.map((node, i) => {
    const key = node.name + depth + i;

    if (node.type === "file") {
      return (
        <div key={key}>
          <button
            onClick={() => onSelectFile(node.blog)}
            className={`w-full flex items-center gap-2 text-sm py-1 transition-colors text-left hover:text-gray-300 ${
              activeSlug === node.slug ? "text-blue-400" : "text-gray-500"
            }`}
            style={{ paddingLeft: `${depth * 16 + 20}px` }}
          >
            <span className="text-xs shrink-0">📄</span>
            <span className="truncate">{node.name}</span>
          </button>
        </div>
      );
    }

    // Folder
    const isOpen = catOpen[key] !== false;
    const isActive = false;

    return (
      <div key={key}>
        <button
          onClick={() => toggleCat(key)}
          className={`w-full flex items-center gap-2 text-sm py-1 transition-colors text-left hover:text-gray-300 ${
            isActive ? "text-blue-400" : depth === 0 ? "text-gray-200 font-medium" : "text-gray-500"
          }`}
          style={{ paddingLeft: `${depth * 16}px` }}
        >
          <Chevron open={isOpen} />
          <span className="text-xs shrink-0">{isOpen ? "📂" : "📁"}</span>
          <span className="truncate">{node.name}</span>
          <span className="text-xs text-gray-700 ml-auto shrink-0">({node.count})</span>
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
    <article>
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          {blog.title}
        </h1>
        <p className="text-gray-400 text-lg mt-6 leading-relaxed">
          {blog.description}
        </p>
        <div className="flex items-center gap-4 mt-6 text-sm text-gray-500 border-b border-white/10 pb-6">
          <span>{new Date(blog.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
          <span className="w-1 h-1 rounded-full bg-gray-700"></span>
          <span>{blog.readTime}</span>
        </div>
      </header>

      <div className="prose prose-invert prose-lg max-w-none
        prose-headings:text-white prose-headings:font-bold
        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:scroll-mt-24
        prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:scroll-mt-24
        prose-p:text-gray-300 prose-p:leading-8 prose-p:mt-4
        prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
        prose-strong:text-white
        prose-code:text-blue-300 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
        prose-pre:bg-[#1e293b] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
        prose-li:text-gray-300
        prose-blockquote:border-blue-500 prose-blockquote:text-gray-400
        prose-img:rounded-xl
      ">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: HeadingRenderer,
            h2: HeadingRenderer,
            h3: HeadingRenderer,
          }}
        >
          {blog.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}

function OnThisPage({ headings }) {
  const [open, setOpen] = useState(true);
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
    <div className="border border-white/10 rounded-xl overflow-hidden sticky top-24">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white/[0.03] hover:bg-white/[0.05] transition-colors"
      >
        <span className="text-sm font-semibold text-gray-300">On this page</span>
        <Chevron open={open} />
      </button>
      {open && (
        <nav className="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
          {headings.map((h, i) => (
            <a
              key={i}
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`block text-sm py-1 transition-colors ${
                h.level === 1
                  ? "pl-0 text-gray-300 font-medium"
                  : h.level === 2
                  ? "pl-4 text-gray-500"
                  : "pl-8 text-gray-600"
              } ${
                activeId === h.id
                  ? "text-blue-400 border-l-2 border-blue-400 -ml-4 pl-[calc(1rem-2px)]"
                  : "hover:text-gray-300"
              }`}
            >
              {h.text}
            </a>
          ))}
        </nav>
      )}
    </div>
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

  const { prev, next } = useMemo(() => {
    const idx = allBlogs.findIndex((b) => b.slug === slug);
    return {
      prev: idx > 0 ? allBlogs[idx - 1] : null,
      next: idx < allBlogs.length - 1 ? allBlogs[idx + 1] : null,
    };
  }, [allBlogs, slug]);

  if (loading) {
    return (
      <section className="min-h-screen bg-[#0f172a] text-white px-6 md:px-16 py-20 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  if (error || !blog) {
    return (
      <section className="min-h-screen bg-[#0f172a] text-white px-6 md:px-16 py-20 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400 text-lg">{error || "Blog not found"}</p>
        <Link to="/blogs" className="text-blue-400 hover:text-blue-300 transition-colors">
          ← Back to Blogs
        </Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#0f172a] text-white px-4 md:px-16 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link to="/blogs" className="text-blue-400 hover:text-blue-300 transition-colors text-sm inline-block">
            ← Back to Blogs
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* ====== LEFT SIDEBAR — File Tree ====== */}
          <aside className="lg:w-64 shrink-0 order-2 lg:order-1">
            <div className="space-y-6 sticky top-24">
              <div className="border border-white/10 rounded-xl overflow-hidden">
                <div className="px-4 py-3 bg-white/[0.03] border-b border-white/5">
                  <span className="text-sm font-semibold text-gray-300">Explorer</span>
                </div>
                <nav className="px-3 py-3 max-h-[70vh] overflow-y-auto">
                  <div className="space-y-0.5">
                    <Link
                      to="/blogs"
                      className="flex items-center gap-2 text-sm py-1 text-gray-400 hover:text-gray-200 transition-colors"
                    >
                      {/* <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      All Blogs */}
                    </Link>
                    <FileTree
                      nodes={fileTree}
                      depth={0}
                      catOpen={catOpen}
                      toggleCat={toggleCat}
                      onSelectFile={handleSelectFile}
                      activeSlug={activeBlog?.slug}
                    />
                  </div>
                </nav>
              </div>

              {/* {activeBlog && (
                <div className="border border-white/10 rounded-xl divide-y divide-white/10">
                  {prev ? (
                    <Link to={`/blog/${prev.slug}`} className="flex flex-col gap-0.5 px-4 py-3 hover:bg-white/[0.03] transition-colors group">
                      <span className="text-xs text-gray-600">← Previous</span>
                      <span className="text-sm text-gray-300 group-hover:text-blue-400 transition-colors truncate">{prev.title}</span>
                    </Link>
                  ) : (
                    <div className="px-4 py-3 opacity-30">
                      <span className="text-xs text-gray-600">← Previous</span>
                      <p className="text-sm text-gray-500 truncate">No older post</p>
                    </div>
                  )}
                  {next ? (
                    <Link to={`/blog/${next.slug}`} className="flex flex-col gap-0.5 px-4 py-3 hover:bg-white/[0.03] transition-colors group">
                      <span className="text-xs text-gray-600">Next →</span>
                      <span className="text-sm text-gray-300 group-hover:text-blue-400 transition-colors truncate">{next.title}</span>
                    </Link>
                  ) : (
                    <div className="px-4 py-3 opacity-30">
                      <span className="text-xs text-gray-600">Next →</span>
                      <p className="text-sm text-gray-500 truncate">No newer post</p>
                    </div>
                  )}
                </div>
              )} */}
            </div>
          </aside>

          {/* ====== MAIN CONTENT ====== */}
          <main className="flex-1 min-w-0 order-3 lg:order-2">
            {activeBlog ? (
              <BlogContentView blog={activeBlog} />
            ) : (
              <div className="text-center text-gray-500 py-20">
                Select a file from the explorer to view a blog.
              </div>
            )}
          </main>

          {/* ====== RIGHT SIDEBAR ====== */}
          <aside className="lg:w-64 shrink-0 order-1 lg:order-3">
            {activeBlog && <OnThisPage headings={headings} />}
            {!activeBlog && (
              <div className="border border-white/10 rounded-xl p-5 sticky top-24 text-center">
                <p className="text-gray-500 text-sm">Select a post to see its table of contents.</p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
