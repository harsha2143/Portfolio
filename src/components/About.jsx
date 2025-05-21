import React from "react";
import { motion } from "framer-motion";
import { Calendar, Code, GraduationCap, Layers, Lightbulb, Rocket, User } from "lucide-react";
import Skills from "../utils/Skills"; 

function About() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * index,
        duration: 0.5,
      },
    }),
  };

  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "Tailwind CSS",
    "GraphQL",
    "AWS",
    "Docker",
  ];

  const education = [
    {
      degree: "B.Tech in Computer Science and Engineering",
      institution: "SRKR Engineering College",
      year: "2022-2026",
      description: "Specialized in full stack development, focusing on web technologies and software engineering principles.",
    }
  ];

  return (
    <section id="about" className="py-20 bg-[#0a0a0a] relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="w-full px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-blue-500">Me</span>
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </motion.div>

        {/* Who I Am and Education Side by Side */}
<div className="flex flex-col lg:flex-row gap-8 mb-16">
  {/* Who I Am Section */}
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className="w-full lg:w-1/2 flex flex-col"
  >
    <h3 className="text-2xl font-bold mb-6 text-blue-500">Who I Am</h3>
    <motion.div
      custom={0}
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="bg-[#111111] p-6 rounded-lg border border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-blue-900/20 hover:shadow-lg flex-1"
    >
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <div className="p-4 bg-blue-500/10 rounded-lg flex items-center justify-center">
          <User className="text-blue-500" size={20} />
        </div>
        <div className="flex-1">
          <h4 className="text-xl font-bold text-white mb-2">Full Stack Developer</h4>
          {/* <h5 className="text-lg font-medium text-blue-400 mb-3">5+ Years Experience</h5> */}
          <p className="text-gray-300 text-base leading-relaxed">
           I am a passionate Full Stack Web Developer, specializing in building responsive, scalable, and user-centric web applications using the MERN stack. With a solid foundation in data structures and algorithms.
          </p>
        </div>
      </div>
    </motion.div>
  </motion.div>

  {/* Education Section */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className="w-full lg:w-1/2 flex flex-col"
  >
    <h3 className="text-2xl font-bold mb-6 text-blue-500">Education</h3>
    <motion.div
      custom={0}
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="bg-[#111111] p-6 rounded-lg border border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-blue-900/20 hover:shadow-lg flex-1"
    >
      {education.map((edu, index) => (
        <div 
          key={index} 
          className={`flex flex-col md:flex-row md:items-start gap-6 ${index > 0 ? 'mt-6 pt-6 border-t border-gray-800' : ''}`}
        >
          <div className="p-4 bg-blue-500/10 rounded-lg flex items-center justify-center">
            <GraduationCap className="text-blue-500" size={20} />
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
            <h5 className="text-md font-medium text-blue-400 mb-3">{edu.institution}</h5>
            <div className="flex items-center gap-2 text-gray-400 mb-4">
              <Calendar size={16} />
              <span className="text-base">{edu.year}</span>
            </div>
            <p className="text-gray-300 text-base leading-relaxed">{edu.description}</p>
          </div>
        </div>
      ))}
    </motion.div>
  </motion.div>
</div>

        {/* Skills Section with Smooth Hover Effects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="py-16"
        >
          <h3 className="text-2xl font-bold mb-6 text-blue-500 relative inline-block">
            My Skills
          
          </h3>
          
          <p className="text-gray-300 mb-8">
            I've worked with a variety of technologies and frameworks in both frontend and backend development. Here are
            some of the key skills I've acquired over the years:
          </p>

          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-6">
            {Skills.map((skill, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="flex flex-col items-center group cursor-pointer"
              >
                <motion.div 
                  className="bg-[#0D1117] w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex items-center justify-center mb-3 
                            shadow-lg relative overflow-hidden group-hover:shadow-blue-500/40 group-hover:shadow-xl"
                  whileHover={{ 
                    scale: 1.08,
                    transition: { 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 15 
                    }
                  }}
                >
                  {/* Subtle gradient overlay on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-500/20 opacity-0"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                  
                  {/* Animated border effect */}
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div 
                      className="absolute inset-x-0 top-0 h-0.5 bg-blue-500"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                    <motion.div 
                      className="absolute inset-y-0 right-0 w-0.5 bg-blue-500"
                      initial={{ scaleY: 0 }}
                      whileHover={{ scaleY: 1 }}
                      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                    />
                    <motion.div 
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-500"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                    />
                    <motion.div 
                      className="absolute inset-y-0 left-0 w-0.5 bg-blue-500"
                      initial={{ scaleY: 0 }}
                      whileHover={{ scaleY: 1 }}
                      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                    />
                  </motion.div>
                  
                  {/* Icon with smooth scale and slight float animation */}
                  <motion.img 
                    src={`/icons/${skill.icon}`} 
                    alt={skill.name} 
                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-sm z-10"
                    initial={{ y: 0 }}
                    whileHover={{ 
                      scale: 1.15,
                      y: [-2, 0, -2],
                      transition: { 
                        scale: { duration: 0.4, ease: "easeOut" },
                        y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                      }
                    }}
                  />
                </motion.div>
                
                {/* Skill name with smooth color transition and underline effect */}
                <motion.p 
                  className="font-medium text-gray-300 text-center text-sm sm:text-base relative inline-block"
                >
                  {skill.name}
                  <motion.span 
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </motion.p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-12 text-center"
          >
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full"
              whileHover={{ 
                scale: 1.03, 
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
                backgroundColor: "#2563EB", // blue-600 to blue-700 smooth transition
                transition: {
                  duration: 0.3,
                  ease: "easeOut"
                }
              }}
              whileTap={{ scale: 0.97 }}
            >
              Let's Work Together
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
                    damping: 10 
                  }
                }}
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </motion.svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;