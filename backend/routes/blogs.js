import { Router } from "express";
import Blog, { MAIN_CATEGORIES, SUB_CATEGORIES } from "../models/Blog.js";
import auth from "../middleware/auth.js";

const router = Router();

// Public: get all published blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true })
      .sort({ createdAt: -1 })
      .select("-content");
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Public: get blogs grouped by mainCategory
router.get("/grouped", async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true })
      .sort({ createdAt: -1 })
      .select("-content");

    const grouped = {};
    for (const cat of MAIN_CATEGORIES) {
      const catBlogs = blogs.filter((b) => b.mainCategory === cat);
      if (catBlogs.length) {
        const subs = {};
        for (const sub of SUB_CATEGORIES[cat] || []) {
          const subBlogs = catBlogs.filter((b) => b.subCategory === sub);
          if (subBlogs.length) subs[sub] = subBlogs;
        }
        // uncategorized blogs in this main category
        const uncategorized = catBlogs.filter((b) => !b.subCategory || b.subCategory === "");
        if (uncategorized.length) subs["Uncategorized"] = uncategorized;
        grouped[cat] = subs;
      }
    }
    // blogs without a mainCategory
    const general = blogs.filter((b) => !b.mainCategory || b.mainCategory === "General");
    if (general.length) grouped["General"] = { Uncategorized: general };

    res.json(grouped);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Public: get blogs by mainCategory + subCategory
router.get("/by-subcategory/:mainCategory/:subCategory", async (req, res) => {
  try {
    const { mainCategory, subCategory } = req.params;
    const blogs = await Blog.find({
      published: true,
      mainCategory: decodeURIComponent(mainCategory),
      subCategory: decodeURIComponent(subCategory),
    })
      .sort({ createdAt: -1 })
      .select("-content");

    res.json({ blogs, mainCategory: decodeURIComponent(mainCategory), subCategory: decodeURIComponent(subCategory) });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Public: get blogs by mainCategory
router.get("/by-category/:mainCategory", async (req, res) => {
  try {
    const mainCategory = decodeURIComponent(req.params.mainCategory);
    const blogs = await Blog.find({
      published: true,
      mainCategory,
    })
      .sort({ createdAt: -1 })
      .select("-content");
    res.json({ blogs, mainCategory });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Public: get single blog by slug
router.get("/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      published: true,
    });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin: get all blogs (including unpublished)
router.get("/admin/all", auth, async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin: get single blog by ID
router.get("/admin/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin: create blog
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, content, category, mainCategory, subCategory, readTime, image, published, tags } = req.body;
    if (!title || !description || !content) {
      return res.status(400).json({ message: "Title, description, and content are required" });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const existing = await Blog.findOne({ slug });
    if (existing) {
      return res.status(400).json({ message: "A blog with this title already exists" });
    }

    const blog = await Blog.create({
      title,
      slug,
      description,
      content,
      category: category || "General",
      mainCategory: mainCategory || "",
      subCategory: subCategory || "",
      readTime: readTime || "5 min read",
      image: image || "",
      published: published !== undefined ? published : true,
      tags: tags || [],
    });

    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin: update blog
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, description, content, category, mainCategory, subCategory, readTime, image, published, tags } = req.body;

    const update = {};
    if (title) update.title = title;
    if (description) update.description = description;
    if (content) update.content = content;
    if (category) update.category = category;
    if (mainCategory !== undefined) update.mainCategory = mainCategory;
    if (subCategory !== undefined) update.subCategory = subCategory;
    if (readTime) update.readTime = readTime;
    if (image !== undefined) update.image = image;
    if (published !== undefined) update.published = published;
    if (tags) update.tags = tags;

    if (title) {
      update.slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin: delete blog
router.delete("/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
