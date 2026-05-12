import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../services/api";

export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getBlogs()
      .then((res) => setBlogs(res.data))
      .catch(() => setError("Failed to load blogs"))
      .finally(() => setLoading(false));
  }, []);

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
    <section className="min-h-screen bg-[#0f172a] text-white py-20 px-6 md:px-16">
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

        {!blogs.length ? (
          <div className="text-center text-gray-400 py-20">
            No blogs published yet. Check back soon!
          </div>
        ) : (
          <div>
            {blogs.map((blog) => (
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
