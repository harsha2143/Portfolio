import { Link } from "react-router-dom";
import { blogs } from "./blogs";

export default function Blog() {
    // Show only first 2 blogs
    const latestBlogs = blogs.slice(0, 2);

    return (
        <section id="Blogs" className="w-xl bg-[#0f172a] text-white py-20 px-6 md:px-16 -mx-5">
            <div className="max-w-8xl">
                {/* Heading */}
                <div className="mb-8">
                    <p className="text-sm uppercase tracking-[0.3em] text-blue-400 mb-3">
                        Latest Blogs
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                        Thoughts, tutorials & learnings
                    </h2>

                    <p className="text-gray-400 mt-4 text-lg max-w-3xl">
                        Sharing insights from my development journey, AI projects, and web
                        technologies.
                    </p>
                </div>

                {/* Blog List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {latestBlogs.map((blog) => (
                        <Link
                            to={`/blog/${blog.slug}`}
                            key={blog.id}
                            className="group border border-white/10 rounded-3xl p-8 hover:border-blue-500 hover:bg-white/5 transition-all duration-300"
                        >
                            {/* Top Meta */}
                            {/* <div className="flex items-center justify-between mb-6">
                                <span className="text-gray-500 text-lg font-semibold">
                                    {blog.id.toString().padStart(2, "0")}
                                </span>

                                <span className="text-blue-300 text-2xl transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </div> */}

                            {/* Title */}
                            <h3 className="text-2xl font-bold leading-snug transition-all duration-300 group-hover:text-blue-400 flex items-center justify-between mb-2">
                                {blog.title}
                                <span className="text-blue-300 text-2xl transition-transform duration-300 group-hover:translate-x-1 mb-2">
                                    →
                                </span>
                            </h3>
                            

                            {/* Description */}
                            <p className="text-gray-400 mt-4 leading-relaxed">
                                {blog.description}
                            </p>

                            {/* Bottom Meta */}
                            <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-gray-500">
                                <span>{blog.category}</span>

                                <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>

                                <span>{blog.date}</span>

                                <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>

                                <span>{blog.readTime}</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* See More Button */}
                <div className="mt-12 flex justify-center">
                    <Link
                        to="/blogs"
                        className="group inline-flex items-center gap-3 border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 px-6 py-3 rounded-full transition-all duration-300"
                    >
                        See More Blogs

                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}