import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../services/api";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getBlogs()
      .then((res) => setBlogs(res.data.slice(0, 2)))
      .catch(() => setError("Failed to load blogs"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section id="Blogs" className="w-xl bg-[#0f172a] text-white py-20 px-6 md:px-16 -mx-5">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="Blogs" className="w-xl bg-[#0f172a] text-white py-20 px-6 md:px-16 -mx-5">
        <div className="text-center text-gray-400">{error}</div>
      </section>
    );
  }

  if (!blogs.length) {
    return (
      <section id="Blogs" className="w-xl bg-[#0f172a] text-white py-20 px-6 md:px-16 -mx-5">
        <div className="text-center text-gray-400">No blogs yet. Check back soon!</div>
      </section>
    );
  }

  return (
    <section id="Blogs" className="w-xl bg-[#0f172a] text-white py-20 px-6 md:px-16 -mx-5">
      <div className="max-w-8xl">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400 mb-3">
            Latest Blogs
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Thoughts, tutorials <span className="text-blue-500">& learnings</span>
          </h2>
          <p className="text-gray-400 mt-4 text-lg max-w-3xl">
            Sharing insights from my development journey, AI projects, and web technologies.
          </p>
        </div>
        

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <Link
              to={`/blog/${blog.slug}`}
              key={blog._id}
              className="group border border-white/10 rounded-3xl p-6 hover:border-blue-500 hover:bg-white/5 transition-all duration-300"
            >
              <h3 className="text-xl font-bold leading-snug transition-all duration-300 group-hover:text-blue-400 flex items-center justify-between">
                {blog.title}
                <span className="text-blue-300 text-3xl transition-transform duration-300 group-hover:translate-x-1 -mt-2">
                  →
                </span>
              </h3>

              <p className="text-gray-400 mt-2 leading-relaxed">
                {blog.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-gray-500">
                <span>{blog.category}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                <span>{new Date(blog.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                <span>{blog.readTime}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/blogs"
            className="group inline-flex items-center gap-3 border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 px-6 py-3 rounded-full transition-all duration-300"
          >
            See More Blogs
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
