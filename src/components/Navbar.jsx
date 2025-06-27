import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Achievements", href: "#achievements" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0a0a0a]/90 backdrop-blur-md py-2 shadow-lg" : "bg-transparent py-4"
      }`}
      style={{ width: "100%", maxWidth: "100vw" }}
    >
      <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center flex-shrink-0"
        >
          <a
            href="#home"
            className="text-xl sm:text-2xl font-bold text-blue-400 truncate max-w-[150px] sm:max-w-full"
          >
            <span className="block md:hidden">HV</span>
            <span className="hidden md:block">Harshavardhan</span>
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="flex items-center flex-grow justify-end">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex space-x-4 lg:space-x-6"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative group text-white hover:text-blue-400 transition-colors duration-300 text-sm lg:text-base"
              >
                <span>{item.name}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </motion.nav>
        </div>

        {/* Contact Me Button (Desktop) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden md:block"
        >
          <a
            href="#contact"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 text-sm lg:text-base lg:ml-5"
          >
            Contact Me
          </a>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:hidden z-50 flex items-center flex-shrink-0"
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-blue-400 transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Navigation - Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#0a0a0a]/95 backdrop-blur-md z-40 md:hidden"
            style={{ width: "100vw", height: "100vh" }}
          >
            <div className="flex flex-col items-center justify-center h-full">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="w-full text-center"
                >
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-4 text-xl text-white hover:text-blue-400 transition-colors"
                  >
                    {item.name}
                  </a>
                </motion.div>
              ))}
              {/* Contact Me Button (Mobile) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                className="mt-4"
              >
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  Contact Me
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;