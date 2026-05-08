import { useParams, Link } from "react-router-dom";
import { blogs } from "./blogs";

export default function BlogDetails() {
  const { slug } = useParams();

  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
        Blog not found.
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#0f172a] text-white px-6 md:px-16 py-20">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="text-purple-400 hover:text-purple-300 transition"
        >
          ← Back to Blogs
        </Link>

        <div className="mt-10">
          <span className="px-4 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm border border-purple-500/20">
            {blog.category}
          </span>

          <h1 className="text-4xl md:text-6xl font-bold mt-6 leading-tight">
            {blog.title}
          </h1>

          <p className="text-gray-400 text-lg mt-6 leading-relaxed">
            {blog.description}
          </p>

          <div className="flex items-center gap-4 mt-8 text-sm text-gray-500 border-b border-white/10 pb-8">
            <span>{blog.date}</span>
            <span>•</span>
            <span>{blog.readTime}</span>
          </div>
        </div>

        <article className="prose prose-invert prose-lg max-w-none mt-12">
          {blog.content.split("\n").map((line, index) => {
            if (line.startsWith("# ")) {
              return (
                <h2
                  key={index}
                  className="text-3xl font-bold text-white mt-10 mb-5"
                >
                  {line.replace("# ", "")}
                </h2>
              );
            }

            if (line.startsWith("- ")) {
              return (
                <li key={index} className="text-gray-300 ml-5 mt-2">
                  {line.replace("- ", "")}
                </li>
              );
            }

            return line.trim() ? (
              <p key={index} className="text-gray-300 leading-8 mt-4">
                {line}
              </p>
            ) : null;
          })}
        </article>
      </div>
    </section>
  );
}
