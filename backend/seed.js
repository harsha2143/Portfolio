import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Blog from "./models/Blog.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";

const blogs = [
  {
    title: "Building ToxicGuard AI with NLP",
    slug: "building-toxicguard-ai",
    category: "Machine Learning",
    mainCategory: "Machine Learning",
    subCategory: "NLP",
    date: "April 2026",
    readTime: "5 min read",
    description:
      "How I developed an AI-powered toxic content detection system using NLP and machine learning.",
    content: `# Introduction

ToxicGuard AI is an intelligent toxic content detection system developed using Natural Language Processing and Machine Learning techniques.

The primary goal of this project was to classify and identify harmful or toxic user-generated text in real-time.

# Problem Statement

Online platforms face serious challenges in moderating harmful comments, abusive language, and toxic discussions.

Manual moderation becomes difficult when handling large amounts of user-generated content.

# Solution

To solve this problem, ToxicGuard AI uses NLP preprocessing techniques and trained machine learning models to detect toxic comments efficiently.

# Technologies Used

- Python
- Scikit-learn
- FastAPI
- React.js
- Tailwind CSS
- NLP

# Features

- Real-time toxic text prediction
- Fast API integration
- Clean user interface
- Machine learning classification
- Text preprocessing pipeline

# Conclusion

This project helped improve my understanding of AI systems, backend integration, and full-stack development.
`,
  },
  {
    title: "FastAPI + React Integration Guide",
    slug: "fastapi-react-guide",
    category: "Web Development",
    mainCategory: "Web Development",
    subCategory: "Full Stack",
    date: "March 2026",
    readTime: "4 min read",
    description:
      "A complete walkthrough of integrating FastAPI backend APIs with a modern React frontend.",
    content: `# Overview

FastAPI is one of the fastest Python backend frameworks.

React is a powerful frontend library used for creating interactive user interfaces.

# Why This Combination?

Using FastAPI with React provides:

- High performance
- Clean architecture
- Easy API integration
- Better scalability

# Backend Setup

The backend was created using FastAPI with REST APIs for predictions.

# Frontend Setup

The frontend was built using React and Tailwind CSS.

# API Communication

Axios and fetch requests were used to connect frontend and backend.

# Final Result

The integration enabled smooth real-time predictions and seamless UI interaction.
`,
  },
  {
    title: "My Final Year Project Experience",
    slug: "final-year-project-experience",
    category: "Career",
    mainCategory: "Career",
    subCategory: "Experience",
    date: "February 2026",
    readTime: "3 min read",
    description:
      "Lessons, challenges, and learnings from building my final year AI project.",
    content: `# Journey

Developing a final year project was one of the most valuable learning experiences during my engineering journey.

# Challenges

- Model training
- Dataset cleaning
- Frontend integration
- Documentation
- PPT preparation

# Learnings

This project improved my:

- Problem solving
- Team collaboration
- Presentation skills
- AI knowledge
- Full-stack development skills

# Final Thoughts

The experience gave me confidence in building real-world AI applications.
`,
  },
  {
    title: "Python List Comprehensions Explained",
    slug: "python-list-comprehensions",
    category: "Languages",
    mainCategory: "Languages",
    subCategory: "Python",
    date: "January 2026",
    readTime: "4 min read",
    description:
      "Master Python list comprehensions with practical examples and common patterns.",
    content: `# Python List Comprehensions

List comprehensions provide a concise way to create lists in Python.

## Basic Syntax

\`\`\`python
new_list = [expression for item in iterable if condition]
\`\`\`

## Examples

\`\`\`python
# Squares of numbers 0-9
squares = [x**2 for x in range(10)]

# Even numbers only
evens = [x for x in range(20) if x % 2 == 0]

# Nested comprehension
matrix = [[j for j in range(3)] for i in range(3)]
\`\`\`

## When to Use

List comprehensions are great for simple transformations and filtering. For complex logic, stick to regular for loops.
`,
  },
  {
    title: "Understanding Binary Search Trees",
    slug: "binary-search-trees",
    category: "DSA",
    mainCategory: "DSA",
    subCategory: "Trees & Graphs",
    date: "December 2025",
    readTime: "6 min read",
    description:
      "A comprehensive guide to Binary Search Trees with insertion, deletion, and traversal algorithms.",
    content: `# Binary Search Trees

A Binary Search Tree (BST) is a tree data structure where each node has at most two children.

## Properties

- Left subtree contains values less than the node
- Right subtree contains values greater than the node
- No duplicate nodes

## Operations

### Insertion
\`\`\`python
def insert(root, val):
    if not root:
        return Node(val)
    if val < root.val:
        root.left = insert(root.left, val)
    else:
        root.right = insert(root.right, val)
    return root
\`\`\`

### Traversal
- In-order: Left → Root → Right (sorted order)
- Pre-order: Root → Left → Right
- Post-order: Left → Right → Root

## Time Complexity

- Average: O(log n)
- Worst: O(n) (skewed tree)

BSTs are fundamental to understanding more advanced tree structures like AVL and Red-Black trees.
`,
  },
  {
    title: "JavaScript Closures Made Simple",
    slug: "javascript-closures",
    category: "Languages",
    mainCategory: "Languages",
    subCategory: "JavaScript",
    date: "November 2025",
    readTime: "5 min read",
    description:
      "Understand JavaScript closures, how they work, and why they matter with real-world examples.",
    content: `# JavaScript Closures

A closure is a function that remembers its outer variables even after the outer function has returned.

## Simple Example

\`\`\`javascript
function outer(x) {
  return function inner(y) {
    return x + y;
  };
}

const add5 = outer(5);
console.log(add5(3)); // 8
\`\`\`

## Common Use Cases

1. **Data privacy** - Creating private variables
2. **Function factories** - Generating specialized functions
3. **Event handlers** - Preserving state in callbacks

Closures are a fundamental concept in JavaScript that every developer should understand.
`,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Blog.deleteMany({});

    // Create admin user
    await User.create({
      username: "Harshaadmin",
      email: "admin@harshaportfolio.com",
      password: "Harsha@2143",
    });
    console.log("Admin user created (email: admin@harshaportfolio.com, password: Harsha@2143)");

    // Create blogs
    await Blog.insertMany(blogs);
    console.log("Blog posts created");

    console.log("Seed complete!");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err.message);
    process.exit(1);
  }
}

seed();
