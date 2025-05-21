import React from "react";
import { Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";

function Experience() {
  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      period: "2021 - Present",
      location: "San Francisco, CA",
      description:
        "Lead the frontend development team in building and maintaining modern web applications. Implemented new features and optimized performance for better user experience.",
      skills: ["React", "Next.js", "TypeScript", "GraphQL"],
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions Ltd.",
      period: "2018 - 2021",
      location: "New York, NY",
      description:
        "Developed and maintained full-stack applications using React and Node.js. Collaborated with designers and product managers to deliver high-quality software solutions.",
      skills: ["React", "Node.js", "Express", "MongoDB"],
    },
    {
      title: "Junior Web Developer",
      company: "WebCraft Agency",
      period: "2016 - 2018",
      location: "Boston, MA",
      description:
        "Built responsive websites and web applications for various clients. Worked closely with senior developers to learn best practices and improve coding skills.",
      skills: ["JavaScript", "HTML/CSS", "jQuery", "PHP"],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-[#0a0a0a] relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-40 left-20 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="w-full px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 title-section"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-blue-500">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-blue-500/20"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ 
                opacity: 0, 
                x: index % 2 === 0 ? -100 : 100
              }}
              whileInView={{ 
                opacity: 1, 
                x: 0 
              }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: [0.21, 0.47, 0.32, 0.98] 
              }}
              className={`timeline-item relative mb-12 md:mb-24 ${
                index % 2 === 0 ? "md:pr-12 md:text-right md:ml-0 md:mr-auto" : "md:pl-12 md:ml-auto md:mr-0"
              } md:w-1/2`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-auto md:right-0 top-0 w-5 h-5 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50 z-10 md:transform md:translate-x-1/2"></div>

              {/* Content box */}
              <div
                className={`relative ml-8 md:ml-0 p-6 bg-[#111111] rounded-lg border border-gray-800 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/10 ${
                  index % 2 !== 0 ? "md:ml-0" : "md:mr-0"
                }`}
              >
                <div className="absolute top-6 -left-3 md:hidden w-3 h-3 rotate-45 bg-[#111111] border-l border-t border-gray-800"></div>
                <div
                  className={`absolute top-6 md:top-6 -right-3 hidden md:block w-3 h-3 rotate-45 bg-[#111111] ${
                    index % 2 === 0 ? "border-r border-t border-gray-800" : "border-l border-b border-gray-800"
                  }`}
                ></div>

                <h3 className="text-xl font-bold text-blue-500 mb-1">{exp.title}</h3>
                <h4 className="text-lg font-medium text-white mb-3">{exp.company}</h4>

                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{exp.location}</span>
                  </div>
                </div>

                <p className="text-gray-300 mb-4">{exp.description}</p>

                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, idx) => (
                    <span key={idx} className="text-xs bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;