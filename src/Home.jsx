
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}

export default Home;