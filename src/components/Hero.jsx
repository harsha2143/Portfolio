import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-[100vh] flex items-center bg-gradient-to-br from-black to-[#0a1a3d] overflow-hidden -mx-5 -mt-5"
    >
      <div className="w-full mx-8 mt-20 px-4 md:px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left side - Text content */}
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
              className="mb-2"
            >
              <span className="text-blue-400 font-medium text-xl">Hi, I'm</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              <span className="text-white">Saripalli</span>{" "}
              <span className="text-blue-400">Harshavardhan</span>

            </motion.h1>
            <div className="w-40 h-2 bg-blue-500 mb-8 mt-6"></div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <p className="text-xl lg:text-2xl text-gray-300 mb-8">
                B.Tech in Computer Science and Engineering |  Full Stack Developer
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-blue-200 mb-8 max-w-md md:text-md"
            >
              I’m passionate about building modern web applications and solving real-world problems through technology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex gap-5 mb-10"
            >
              <a
                href="https://github.com/harsha2143"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-black rounded-full p-4 border border-gray-800 shadow-[0_0_15px_3px_rgba(0,191,255,0.4)]  hover:shadow-[0_0_20px_5px_rgba(0,191,255,0.7)] transition-all duration-300 ease-in-out"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/harshavardhansaripalli/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-black rounded-full p-4 border border-gray-800 shadow-[0_0_15px_3px_rgba(0,191,255,0.4)]  hover:shadow-[0_0_20px_5px_rgba(0,191,255,0.7)] transition-all duration-300 ease-in-out"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-row sm:flex-row gap-4"
            >
              <a
                href="https://drive.google.com/file/d/1l2fkKrABQoBKci_CYzcasjgtLXtb6e7m/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full hover:shadow-[0_10px_25px_-5px_rgba(59,120,246,0.6)] transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 w-fit"
              >
                View My Resume
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ x: 0 }}
                  animate={{ x: 0 }}
                  whileHover={{
                    x: 5,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    },
                  }}
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </motion.svg>
              </a>

              <a
                href="#contact"
                className="border border-gray-600 text-white hover:bg-gray-700/50 px-6 py-3 rounded-full transition-all duration-300 transform hover:translate-y-[-2px]"
              >
                Get in Touch
              </a>
            </motion.div>
          </motion.div>

          {/* Right side - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="w-full lg:w-2/5 mt-12 lg:mt-0"
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden border-2 border-gray-700/50">
                <img
                  src="/Profile.jpg"
                  alt="Saripalli Harshavardhan"
                  className="object-cover w-full h-full"
                />
              </div>
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
            className="w-1 h-2 bg-blue-400 rounded-full"
          ></motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;