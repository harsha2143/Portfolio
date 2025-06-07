import React from "react";
import { motion, useAnimation } from "framer-motion";
import { Calendar, Code, GraduationCap, Layers, Lightbulb, Rocket, User } from "lucide-react";
import Skills from "../utils/Skills";

// Skill Bar Component
const SkillBar = ({ iconSrc, name, percentage, delay = 0 }) => {
  const controls = useAnimation();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      controls.start({
        width: `${percentage}%`,
        transition: { duration: 1.5, ease: "easeOut" },
      });
    }, delay * 150);

    return () => clearTimeout(timer);
  }, [percentage, controls, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="mb-8"
    >
      <div className="flex items-center gap-2 mb-3">
        <img
          src={iconSrc}
          alt={name}
          className="w-10 h-8 object-contain rounded"
        />
        <span className="text-white font-medium text-sm flex-1">{name}</span>
        <span className="text-blue-400 font-semibold text-md">{percentage}%</span>
      </div>

      <div className="relative">
        <div className="w-full bg-gray-800 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={controls}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Skills Tabs Component
const SkillTabs = () => {
  const [activeTab, setActiveTab] = React.useState('Programming Languages');

  const skillCategories = {
    'Programming Languages': [
      { name: 'JavaScript', percentage: 80, iconSrc: '/icons/javascript.webp' },
      { name: 'CPP', percentage: 70, iconSrc: '/icons/cpp7.png' },
      { name: 'SQL', percentage: 65, iconSrc: '/icons/sql.svg' },
      { name: 'Java', percentage: 70, iconSrc: '/icons/java.png' },
      { name: 'Python', percentage: 75, iconSrc: '/icons/python.png' },
      { name: 'TypeScript', percentage: 45, iconSrc: '/icons/typescript.png' },
    ],
    'Databases': [
      { name: 'MongoDB', percentage: 80, iconSrc: '/icons/mongodb.png' },
      { name: 'MySQL', percentage: 70, iconSrc: '/icons/mysql5.png' },
      { name: 'Oracle SQL', percentage: 70, iconSrc: '/icons/Oracle.png' },
    ],
    'Frameworks & Technologies': [
      { name: 'React.js', percentage: 70, iconSrc: '/icons/react3.webp' },
      { name: 'Node.js', percentage: 70, iconSrc: '/icons/nodejs.webp' },
      { name: 'Express.js', percentage: 75, iconSrc: '/icons/express.webp' },
      { name: 'Tailwind CSS', percentage: 70, iconSrc: '/icons/tw2.png' },
      { name: 'HTML5', percentage: 95, iconSrc: '/icons/html1.png' },
      { name: 'CSS3', percentage: 90, iconSrc: '/icons/css3.webp' },
    ],

    'Tools & Platforms': [
      { name: 'Git', percentage: 65, iconSrc: '/icons/git6.png' },
      { name: 'AWS', percentage: 50, iconSrc: '/icons/AWS1.png' },
      { name: 'Docker', percentage: 50, iconSrc: '/icons/docker.webp' },
      { name: 'Postman', percentage: 70, iconSrc: '/icons/postman4.webp' },

    ],

  };

  const tabs = Object.keys(skillCategories);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {tabs.map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab}
          </motion.button>
        ))}
      </div>

      {/* Skills Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#11111] p-8 rounded-lg border border-gray-700"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20">
          {skillCategories[activeTab].map((skill, index) => (
            <SkillBar
              key={skill.name}
              iconSrc={skill.iconSrc}
              name={skill.name}
              percentage={skill.percentage}
              delay={index}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

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

  // Skills with progress percentages (no longer needed for this implementation)
  // const skillsWithProgress = [...];

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

        {/* Skills Section with Tabbed Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="py-16"
        >
          <div className="text-center mb-12" id="skills">
            <h3 className="text-3xl font-bold mb-4">
              My <span className="text-blue-500" >Skills</span>
            </h3>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              My technical skills and proficiency levels.
            </p>
          </div>

          <SkillTabs />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-16 text-center"
          >
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-4 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
                backgroundColor: "#2563EB",
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