import mongoose from "mongoose";

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

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, default: "General" },
    mainCategory: {
      type: String,
      enum: [...MAIN_CATEGORIES, "General", ""],
      default: "General",
    },
    subCategory: { type: String, default: "" },
    readTime: { type: String, default: "5 min read" },
    image: { type: String, default: "" },
    published: { type: Boolean, default: true },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

blogSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  next();
});

export { MAIN_CATEGORIES, SUB_CATEGORIES };
export default mongoose.model("Blog", blogSchema);
