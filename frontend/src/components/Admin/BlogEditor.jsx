import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { adminGetBlog, createBlog, updateBlog } from "../../services/api";

const MAIN_CATEGORIES = [
  "DSA",
  "Languages",
  "Web Development",
  "Machine Learning",
  "Databases",
  "DevOps",
  "Career",
];

const SUB_CATEGORIES = {
  DSA: [
    "Arrays & Strings",
    "Linked Lists",
    "Stacks & Queues",
    "Trees & Graphs",
    "Dynamic Programming",
    "Sorting & Searching",
    "Recursion & Backtracking",
  ],
  Languages: ["Python", "JavaScript", "Java", "C++", "TypeScript", "Go", "Rust"],
  "Web Development": ["Frontend", "Backend", "Full Stack", "APIs", "CSS & Design"],
  "Machine Learning": ["NLP", "Computer Vision", "Deep Learning", "LLMs", "MLOps"],
  Databases: ["SQL", "MongoDB", "PostgreSQL", "System Design", "Redis"],
  DevOps: ["Docker", "Kubernetes", "CI/CD", "Cloud", "Linux"],
  Career: ["Interview Prep", "Projects", "Experience", "Resume Tips"],
};

export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    category: "General",
    mainCategory: "",
    subCategories: [""],
    readTime: "5 min read",
    published: true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) return navigate("/admin/login");
    if (isEdit) {
      adminGetBlog(id)
        .then((res) => {
          const b = res.data;
          const subs = b.subCategory ? b.subCategory.split(/\s*\|\|\s*/) : [""];
          setForm({
            title: b.title,
            description: b.description,
            content: b.content,
            category: b.category,
            mainCategory: b.mainCategory || "",
            subCategories: subs,
            readTime: b.readTime,
            published: b.published,
          });
        })
        .catch(() => navigate("/admin/dashboard"))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "mainCategory" ? { subCategories: [""] } : {}),
    }));
  };

  const handleSubChange = (idx, value) => {
    setForm((prev) => {
      const subs = [...prev.subCategories];
      subs[idx] = value;
      return { ...prev, subCategories: subs };
    });
  };

  const addSubCategory = () => {
    setForm((prev) => ({ ...prev, subCategories: [...prev.subCategories, ""] }));
  };

  const removeSubCategory = (idx) => {
    setForm((prev) => {
      const subs = prev.subCategories.filter((_, i) => i !== idx);
      return { ...prev, subCategories: subs.length ? subs : [""] };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      ...form,
      subCategory: form.subCategories.filter(Boolean).join(" || "),
    };
    delete payload.subCategories;

    try {
      if (isEdit) {
        await updateBlog(id, payload);
      } else {
        await createBlog(payload);
      }
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save blog");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  const subSuggestions = SUB_CATEGORIES[form.mainCategory];

  return (
    <section className="min-h-screen bg-[#0f172a] text-white px-6 md:px-16 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="text-blue-400 hover:text-blue-300 transition-colors mb-4 inline-block"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold">
            {isEdit ? "Edit Blog" : "New Blog"}
          </h1>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Description *</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Main Category</label>
                <input
                  type="text"
                  name="mainCategory"
                  value={form.mainCategory}
                  onChange={handleChange}
                  placeholder="e.g. DSA, Languages, Machine Learning..."
                  list="mainCatSuggestions"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
                <datalist id="mainCatSuggestions">
                  {MAIN_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} />
                  ))}
                </datalist>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {MAIN_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, mainCategory: cat, subCategories: [""] }))}
                      className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                        form.mainCategory === cat
                          ? "bg-blue-500/20 text-blue-300"
                          : "bg-white/5 text-gray-600 hover:text-gray-400"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                  {form.mainCategory && !MAIN_CATEGORIES.includes(form.mainCategory) && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">custom</span>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm text-gray-400">Sub Categories</label>
                  <button
                    type="button"
                    onClick={addSubCategory}
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                  >
                    + Add
                  </button>
                </div>
                <div className="space-y-2">
                  {form.subCategories.map((sub, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={sub}
                        onChange={(e) => handleSubChange(idx, e.target.value)}
                        placeholder={subSuggestions ? `e.g. ${subSuggestions.slice(0, 3).join(", ")}...` : "Custom sub category..."}
                        list={subSuggestions ? `subSuggestions-${idx}` : undefined}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                      />
                      {subSuggestions && (
                        <datalist id={`subSuggestions-${idx}`}>
                          {subSuggestions.map((s) => <option key={s} value={s} />)}
                        </datalist>
                      )}
                      <button
                        type="button"
                        onClick={() => removeSubCategory(idx)}
                        className="text-red-400 hover:text-red-300 transition-colors px-1.5 py-1 text-sm shrink-0"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                {form.subCategories.length > 0 && form.subCategories.some(Boolean) && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {form.subCategories.filter(Boolean).map((s, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Read Time</label>
                <input
                  type="text"
                  name="readTime"
                  value={form.readTime}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="published"
                  checked={form.published}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, published: e.target.checked }))
                  }
                  className="w-4 h-4 rounded bg-white/5 border-white/10"
                />
                <label htmlFor="published" className="text-sm text-gray-400">
                  Published
                </label>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Content (Markdown) *</label>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  rows={20}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors font-mono text-sm leading-relaxed resize-y"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-3">Preview</label>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 min-h-[500px] max-h-[900px] overflow-y-auto">
                {form.content ? (
                  <div className="space-y-6">
                    <header>
                      <h1 className="text-2xl font-bold text-white">{form.title || "Untitled"}</h1>
                      <p className="text-gray-400 mt-3 text-sm">{form.description || "No description"}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-gray-600">
                        <span>{form.readTime}</span>
                      </div>
                    </header>

                    <div className="flex gap-6">
                      <div className="flex-1 min-w-0 prose prose-invert prose-sm max-w-none
                        prose-headings:text-white
                        prose-p:text-gray-300 prose-p:leading-7
                        prose-code:text-blue-300 prose-code:bg-white/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                        prose-pre:bg-[#1e293b] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-lg
                        prose-li:text-gray-300
                        prose-strong:text-white
                        prose-a:text-blue-400
                        prose-blockquote:border-blue-500
                      ">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {form.content}
                        </ReactMarkdown>
                      </div>
                      <div className="hidden lg:block w-48 shrink-0 border-l border-white/10 pl-5">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">On this page</p>
                        <nav className="space-y-1">
                          {Array.from(form.content.matchAll(/^(#{1,3})\s+(.+)$/gm)).map((m, i) => (
                            <div key={i} className={`text-xs ${m[1].length === 1 ? "text-gray-400" : m[1].length === 2 ? "pl-3 text-gray-600" : "pl-6 text-gray-700"}`}>
                              {m[2].trim()}
                            </div>
                          ))}
                          {!form.content.match(/^#{1,3}\s+.+$/m) && (
                            <p className="text-xs text-gray-600">No headings found</p>
                          )}
                        </nav>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-20">
                    Preview will appear here
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4 justify-end border-t border-white/10 pt-8">
            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
              className="border border-white/10 hover:border-white/30 text-gray-400 px-6 py-3 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-8 py-3 rounded-lg transition-colors font-medium"
            >
              {saving ? "Saving..." : isEdit ? "Update Blog" : "Publish Blog"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
