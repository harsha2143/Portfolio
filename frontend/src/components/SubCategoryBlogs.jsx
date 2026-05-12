import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlogsBySubCategory } from "../services/api";

export default function SubCategoryBlogs() {
  const { mainCategory, subCategory } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getBlogsBySubCategory(mainCategory, subCategory)
      .then((res) => setData(res.data))
      .catch(() => setError("Failed to load blogs"))
      .finally(() => setLoading(false));
  }, [mainCategory, subCategory]);

  if (loading) {
    return (
      <section className="min-h-screen bg-[#0f172a] text-white py-20 px-6 md:px-16 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="min-h-screen bg-[#0f172a] text-white py-20 px-6 md:px-16 flex items-center justify-center">
        <div className="text-center text-gray-400">{error || "Not found"}</div>
      </section>
    );
  }

  const { blogs } = data;
  const displayMain = decodeURIComponent(mainCategory);
  const subParts = decodeURIComponent(subCategory || "").split(/\s*>\s*/).filter(Boolean);

  return (
    <section className="min-h-screen bg-[#0f172a] text-white py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <Link
            to="/blogs"
            className="text-blue-400 hover:text-blue-300 transition-colors text-sm mb-6 inline-block"
          >
            ← Back to Blogs
          </Link>

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/blogs" className="hover:text-gray-300 transition-colors">Blogs</Link>
            <span>/</span>
            <span className="text-blue-300">{displayMain}</span>
            {subParts.map((part, i) => (
              <span key={i} className="flex items-center gap-2">
                <span>/</span>
                <span className={i === subParts.length - 1 ? "text-white" : "text-gray-400"}>
                  {part}
                </span>
              </span>
            ))}
          </nav>

          <h1 className="text-4xl font-bold">{subParts.join(" > ") || displayMain}</h1>
          <p className="text-gray-400 mt-4 text-lg">
            {blogs.length} {blogs.length === 1 ? "post" : "posts"}
          </p>
        </div>

        {!blogs.length ? (
          <div className="text-center text-gray-400 py-20">
            No posts in this topic yet.
          </div>
        ) : (
          <div className="space-y-3">
            {blogs.map((blog, idx) => (
              <Link
                key={blog._id}
                to={`/blog/${blog.slug}`}
                className="group flex items-center justify-between bg-white/[0.03] border border-white/5 rounded-xl px-6 py-5 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-center gap-5 flex-1 min-w-0">
                  <span className="text-sm font-mono text-gray-600 w-6 shrink-0">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
                      {blog.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-1">{blog.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
                      <span>{new Date(blog.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short" })}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                </div>
                <span className="text-gray-600 text-xl ml-4 transition-all duration-300 group-hover:text-blue-400 group-hover:translate-x-1 shrink-0">
                  →
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
