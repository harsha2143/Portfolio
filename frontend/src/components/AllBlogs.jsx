import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../services/api";

function Chevron({ open }) {
  return (
    <svg className={`w-3 h-3 shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
      fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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

function FileIcon() {
  return (
    <svg className="w-4 h-4 shrink-0 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    getBlogs()
      .then((res) => setBlogs(res.data))
      .catch(() => setError("Failed to load blogs"))
      .finally(() => setLoading(false));
  }, []);

  const mainCats = [
    ...new Set(
      blogs
        .map((b) => b.mainCategory)
        .filter((c) => c && c !== "General")
    ),
  ];

  const categories = ["All", "Sections", ...mainCats];

  const grouped = useMemo(() => {
    const map = {};
    for (const blog of blogs) {
      const mc = blog.mainCategory || "Uncategorized";
      if (!map[mc]) map[mc] = {};
      const subs = blog.subCategory
        ? blog.subCategory.split(/\s*\|\|\s*/).map((s) => s.trim()).filter(Boolean)
        : ["General"];
      for (const sub of subs) {
        if (!map[mc][sub]) map[mc][sub] = [];
        if (!map[mc][sub].find((b) => b._id === blog._id)) {
          map[mc][sub].push(blog);
        }
      }
    }
    return map;
  }, [blogs]);

  const filteredBlogs =
    filter === "All" || filter === "Sections"
      ? blogs
      : blogs.filter((b) => b.mainCategory === filter);

  const toggle = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-[#0f172a] text-white py-20 px-6 md:px-16 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-[#0f172a] text-white py-20 px-6 md:px-16 flex items-center justify-center">
        <div className="text-center text-gray-400">{error}</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#030712] text-white py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <Link
            to="/"
            className="text-blue-400 hover:text-blue-300 transition-colors text-sm mb-6 inline-block"
          >
            ← Back to Home
          </Link>
          <p className="text-lg uppercase tracking-[0.3em] text-blue-300 mb-3">
            All Blogs
          </p>
          <h1 className="text-4xl font-bold">Articles & Insights</h1>
          <p className="text-gray-400 mt-4 text-lg">
            Explore all blogs, tutorials and experiences.
          </p>
        </div>

        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-white/5">
            {categories.map((cat, idx) => (
              <div key={cat} className="flex items-center gap-2">
                {idx > 1 && <span className="text-gray-700 text-sm mx-1">|</span>}
                <button
                  onClick={() => setFilter(cat)}
                  className={`text-sm px-4 py-1.5 rounded-full transition-all ${
                    filter === cat
                      ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      : "text-gray-500 border border-white/10 hover:text-gray-300 hover:border-white/30"
                  }`}
                >
                  {cat}
                </button>
              </div>
            ))}
          </div>
        )}

        {!filteredBlogs.length ? (
          <div className="text-center text-gray-400 py-20">
            {filter === "All"
              ? "No blogs published yet. Check back soon!"
              : `No blogs in "${filter}" yet.`}
          </div>
        ) : filter === "Sections" ? (
          <div className="border border-white/10 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-white/[0.02] border-b border-white/5 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2z" />
              </svg>
              <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Explorer</span>
              <span className="text-[11px] text-gray-600 ml-auto">{blogs.length} items</span>
            </div>
            <nav className="px-3 py-3 space-y-0.5">
              {Object.entries(grouped).map(([mc, subs]) => {
                const mcKey = mc;
                const mcOpen = expanded[mcKey] !== false;
                const total = Object.values(subs).reduce((s, b) => s + b.length, 0);
                return (
                  <div key={mcKey}>
                    <button
                      onClick={() => toggle(mcKey)}
                      className="w-full flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs transition-all text-left text-gray-300 hover:text-white hover:bg-white/[0.04] font-medium"
                    >
                      <Chevron open={mcOpen} />
                      <FolderIcon open={mcOpen} />
                      <span className="truncate text-xs">{mc}</span>
                      <span className="text-[10px] text-gray-600 ml-auto">{total}</span>
                    </button>
                    {mcOpen && (
                      <div>
                        {Object.entries(subs).map(([sc, scBlogs]) => {
                          const scKey = `${mc}||${sc}`;
                          const scOpen = expanded[scKey] !== false;
                          return (
                            <div key={scKey}>
                              <button
                                onClick={() => toggle(scKey)}
                                className="w-full flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs transition-all text-left text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]"
                                style={{ paddingLeft: "28px" }}
                              >
                                <Chevron open={scOpen} />
                                <FolderIcon open={scOpen} />
                                <span className="truncate text-xs">{sc}</span>
                                <span className="text-[10px] text-gray-600 ml-auto">{scBlogs.length}</span>
                              </button>
                              {scOpen && (
                                <div>
                                  {scBlogs.map((blog) => (
                                    <Link
                                      key={blog._id}
                                      to={`/blog/${blog.slug}`}
                                      className="flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs transition-all text-gray-500 hover:text-blue-400 hover:bg-blue-500/5"
                                      style={{ paddingLeft: "44px" }}
                                    >
                                      <FileIcon />
                                      <span className="truncate text-xs">{blog.title}</span>
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        ) : (
          <div>
            {filteredBlogs.map((blog) => (
              <Link
                to={`/blog/${blog.slug}`}
                key={blog._id}
                className="group block border-b border-white/10 py-8 hover:border-blue-500 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-2xl font-semibold transition-all duration-300 group-hover:text-blue-400">
                      {blog.title}
                    </h3>
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
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
                    <p className="text-gray-400 mt-3 leading-relaxed max-w-3xl">
                      {blog.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mt-5 text-sm text-gray-500">
                      <span>{blog.category}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                      <span>{new Date(blog.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                  <div className="text-gray-500 text-2xl transition-all duration-300 group-hover:text-blue-400 group-hover:translate-x-2 flex items-center">
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
