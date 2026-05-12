import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminGetBlogs, deleteBlog } from "../../services/api";

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSections, setOpenSections] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) return navigate("/admin/login");
    adminGetBlogs()
      .then((res) => setBlogs(res.data))
      .catch(() => navigate("/admin/login"))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch {
      alert("Failed to delete blog");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    navigate("/admin/login");
  };

  const grouped = {};
  for (const blog of blogs) {
    const mc = blog.mainCategory && blog.mainCategory !== "General" ? blog.mainCategory : "Uncategorized";
    const sc = blog.subCategory || "General";
    if (!grouped[mc]) grouped[mc] = {};
    if (!grouped[mc][sc]) grouped[mc][sc] = [];
    grouped[mc][sc].push(blog);
  }

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  const sortedCats = Object.keys(grouped).sort();

  return (
    <section className="min-h-screen bg-[#0f172a] text-white px-6 md:px-16 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold">Blog Dashboard</h1>
            <p className="text-gray-400 mt-1">Manage your blog posts</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin/blogs/new"
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg transition-colors text-sm font-medium"
            >
              + New Blog
            </Link>
            <button
              onClick={handleLogout}
              className="border border-white/10 hover:border-red-500/50 text-gray-400 hover:text-red-400 px-4 py-2.5 rounded-lg transition-all text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {!blogs.length ? (
          <div className="text-center text-gray-400 py-20">
            <p className="text-lg mb-4">No blogs yet</p>
            <Link
              to="/admin/blogs/new"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Create your first blog post →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedCats.map((mc) => {
              const subs = grouped[mc];
              const total = Object.values(subs).reduce((s, b) => s + b.length, 0);
              const isOpen = openSections[mc] !== false;
              return (
                <div key={mc} className="border border-white/10 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection(mc)}
                    className="w-full flex items-center justify-between px-5 py-4 bg-white/[0.03] hover:bg-white/[0.05] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      <span className="font-semibold text-white">{mc}</span>
                      <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">{total}</span>
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 space-y-3">
                      {Object.entries(subs).map(([sc, scBlogs]) => (
                        <div key={sc}>
                          <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2 mt-3 first:mt-0">
                            {sc} <span className="text-gray-700">({scBlogs.length})</span>
                          </h4>
                          <div className="space-y-2">
                            {scBlogs.map((blog) => (
                              <div
                                key={blog._id}
                                className="flex items-center justify-between bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 hover:border-blue-500/30 transition-all"
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-3">
                                    <h3 className="text-sm font-medium truncate">{blog.title}</h3>
                                    {!blog.published && (
                                      <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full shrink-0">
                                        Draft
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-600 mt-0.5">
                                    {blog.category} · {new Date(blog.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2 ml-4 shrink-0">
                                  <Link
                                    to={`/admin/blogs/edit/${blog._id}`}
                                    className="text-blue-400 hover:text-blue-300 px-2.5 py-1 text-xs transition-colors"
                                  >
                                    Edit
                                  </Link>
                                  <button
                                    onClick={() => handleDelete(blog._id, blog.title)}
                                    className="text-red-400 hover:text-red-300 px-2.5 py-1 text-xs transition-colors"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
