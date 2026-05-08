import "./index.css";
import React from "react";

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Blog from "./components/Blog";
import AllBlogs from "./components/AllBolgs";
import BlogDetails from "./components/BlogDetails";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AnimatedSection from "./components/AnimatedSection";

// Metadata object
const metadata = {
  title: "Harshavardhan's Portfolio",
  description: "Full Stack Developer",
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
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground w-screen max-w-full overflow-hidden px-2 py-2 sm:p-5">
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePage />} />

        <Route path="/blogs" element={<AllBlogs />} />
        
        {/* Blog Details Page */}
        <Route path="/blog/:slug" element={<BlogDetails />} />
      </Routes>
    </div>
  );
}

export default App;