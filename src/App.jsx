import "./index.css";
import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AnimatedSection from "./components/AnimatedSection";
// Metadata object
const metadata = {
  title: "Chakri's Portfolio",
  description: "Full Stack Developer",
};

function App() {
  // Set document metadata
  React.useEffect(() => {
    document.title = metadata.title;
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = metadata.description;
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-2 sm:p-5">
      <Navbar />
      <main className="min-h-screen">
        <AnimatedSection>
          <Hero />
        </AnimatedSection>
        
        <AnimatedSection delay={0.2}>
          <About />
        </AnimatedSection>
        
       
        
        <AnimatedSection delay={0.2}>
          <Projects />
        </AnimatedSection>
        
        <AnimatedSection delay={0.5}>
          <Contact />
        </AnimatedSection>
        
        <Footer />
      </main>
    </div>
  );
}

export default App;