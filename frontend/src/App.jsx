import "./index.css";
import React from "react";

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Blog from "./components/Blog";
import AllBlogs from "./components/AllBlogs";
import SubCategoryBlogs from "./components/SubCategoryBlogs";
import BlogDetails from "./components/BlogDetails";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AnimatedSection from "./components/AnimatedSection";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";
import BlogEditor from "./components/Admin/BlogEditor";

// Metadata object
const metadata = {
  title: "Harshavardhan's Portfolio | Full Stack Developer",
  description: "Welcome to my professional portfolio. I am a Full Stack Developer passionate about building modern, high-performance web applications using the MERN stack.",
};

// Home Page Component
function HomePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <AnimatedSection>
          <Hero />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <About />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Blog />
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <Experience />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Projects />
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <Achievements />
        </AnimatedSection>

        <AnimatedSection delay={0.5}>
          <Contact />
        </AnimatedSection>
      </main>

      <Footer />
    </>
  );
}

function App() {
  React.useEffect(() => {
    document.title = metadata.title;

    let metaDescription = document.querySelector(
      'meta[name="description"]'
    );

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }

    metaDescription.content = metadata.description;

    // Dynamically initialize Google Analytics 4 (GA4) if measurement ID is provided
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (gaId) {
      // Create and inject the GA script tag
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);

      // Initialize the dataLayer and gtag function
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function () {
        window.dataLayer.push(arguments);
      };
      window.gtag("js", new Date());
      window.gtag("config", gaId);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground w-screen max-w-full overflow-hidden">
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePage />} />

        <Route path="/blogs" element={<AllBlogs />} />
        <Route path="/blogs/:mainCategory/:subCategory" element={<SubCategoryBlogs />} />
        
        {/* Blog Details Page */}
        <Route path="/blog/:slug" element={<BlogDetails />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/blogs/new" element={<BlogEditor />} />
        <Route path="/admin/blogs/edit/:id" element={<BlogEditor />} />
      </Routes>
    </div>
  );
}

export default App;