import { useState, useEffect } from "react";
import { Code, Github, Linkedin, Mail } from "lucide-react";

// Simplified Motion component
const Motion = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div
      className={`transition-all duration-500 ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// Social link component with hover effects
function SocialLink({ href, icon, label }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="relative group" aria-label={label}>
      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-800 hover:border-blue-600 transition-all duration-300">
        <span className="text-gray-300 group-hover:text-blue-500 transition-colors duration-300">
          {icon}
        </span>
      </div>
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="w-full pt-4 pb-4">
      <div className="w-full mx-auto px-4 border-t border-gray-800">
        {/* Name Section */}
        <Motion delay={100}>
          <div className="flex flex-col items-center justify-center mb-6 mt-6">
            <h2 className="text-2xl font-bold text-blue-500 mb-4 text-center px-2 sm:px-0 max-w-full break-words">
              Ramisetti Venkata Sai Chakrarao
            </h2>
            
            {/* Social Icons */}
            <div className="flex items-center justify-center gap-4">
              <SocialLink href="https://linkedin.com/in/chakri555" icon={<Linkedin size={15} />} label="LinkedIn" />
              <SocialLink href="https://github.com/Chakri555" icon={<Github size={15} />} label="GitHub" />
              <SocialLink href="https://mail.google.com/mail/?view=cm&fs=1&to=chakriramisetti555@gmail.com" icon={<Mail size={15} />} label="Mail" />
            </div>
          </div>
        </Motion>
        
        {/* Professional Info */}
        <Motion delay={200}>
          <div className="text-center text-gray-400 text-sm my-6 px-2">
            <p className="break-words">B.Tech in Computer Science and Engineering | Full Stack Developer</p>
          </div>
        </Motion>
        
        {/* Copyright */}
        <Motion delay={400}>
          <div className="text-center text-gray-500 text-sm pt-4">
            <p>© 2025 chakri. All rights reserved.</p>
          </div>
        </Motion>
      </div>
    </footer>
  );
}