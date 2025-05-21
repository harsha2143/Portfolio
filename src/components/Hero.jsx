import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="min-h-[100vh] pt-12 md:pt-20 flex items-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-40 left-20 w-72 h-72 bg-blue-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-72 h-72 bg-blue-700/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="w-full px-4 md:px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left side - Text content (60%) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-3/5 lg:pr-8"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-5"
            >
              <span className="text-blue-500 font-medium text-lg">Hello, I'm</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
            >
              <span className="text-white">Ramisetti</span> <span className="text-blue-500">Venkata Sai Chakrarao</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative mb-6"
            >
              <div className="absolute top-0 left-0 w-12 h-1 bg-blue-500"></div>
              <h2 className="text-xl md:text-2xl font-medium text-gray-300 pt-4">Full Stack Developer</h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-gray-400 mb-8 max-w-xl text-base md:text-lg"
            >
              I build exceptional and accessible digital experiences for the web. Focused on creating intuitive and
              responsive applications that solve real-world problems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <a
                href="https://drive.google.com/file/d/1d7Zq38R71pgBPTY6xfRa8nHXbqItD_iS/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center
 gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:translate-y-[-2px]"
              >
                View My Resume
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 border border-blue-500 text-blue-500 hover:bg-blue-500/10 px-6 py-3 rounded-full transition-all duration-300 transform hover:translate-y-[-2px]"
              >
                Contact Me
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex gap-7 ml-4"
            >
              <a
                href="https://github.com/Chakri2759"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300 "
                aria-label="GitHub"
              >
                <Github size={30} />
              </a>
              <a
                href="https://www.linkedin.com/in/chakri555"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={30} />
              </a>
              
            </motion.div>
          </motion.div>

          {/* Right side - Image (40%) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="w-100% lg:w-2/5 mt-12 lg:mt-0"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 opacity-20 blur-2xl"></div>
              <div className="relative w-100% h-100% rounded-full border-2 border-blue-500/30 overflow-hidden">
                <img
                  src="./src/assets/Portfolio_img.jpg"
                  alt="John Doe"
                  className="object-cover w-70% h-70%"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, rotate: -10 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{
                  delay: 1.2,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100,
                }}
                className="absolute -bottom-4 -right-4 bg-[#0a0a0a] p-4 rounded-lg shadow-lg border border-gray-800"
              >
                {/* <div className="text-sm font-medium">
                  <span className="text-gray-400">Experience</span>
                  <div className="text-2xl font-bold text-blue-500">5+ Years</div>
                </div> */}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.5,
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-1 h-2 bg-blue-500 rounded-full"
          ></motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;