import { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Home,
  Briefcase,
  Phone,
  Code2,
  Terminal,
  FileCode2
} from "lucide-react";

// Coding profile links
const codingProfiles = {
  LeetCode: "https://leetcode.com/u/Harshavardhan_Saripalli/",
  HackerRank: "https://www.hackerrank.com/profile/harshavardhans23",
  CodeChef: "https://www.codechef.com/users/harsha2143",
  GitHub: "https://github.com/harsha2143"
};

// Motion component
const Motion = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <div
      className= {`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)"
      }}
    >
      {children}
    </div>
  );
};

// Social icon link
function SocialLink({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-700 hover:border-blue-600 transition"
    >
      <span className="text-gray-400  group-hover:text-blue-500">{icon}</span>
    </a>
  );
}

// Reusable link row
function FooterLink({ href, label, icon }) {
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-gray-400 hover:text-blue-400 text-sm transition"
      >
        {icon}
        {label}
      </a>
    );
  }

  // Internal anchor link
  return (
    <a
      href={href}
      className="flex items-center gap-2 text-gray-400 hover:text-blue-400 text-sm transition"
    >
      {icon}
      {label}
    </a>
  );
}


export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white border-t border-gray-800 pt-10 pb-6 mt-10 -mb-6 -mx-5">
      <div className="max-w-8xl mx-16 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between">
  {/* Left: About & Socials */}
  <Motion delay={100}>
    <div className="w-full md:w-full flex flex-col items-center md:items-start text-center md:text-left">
      <h2 className="text-3xl font-semibold text-blue-500 mb-6">Saripalli Harshavardhan</h2>
      <p className="text-sm text-gray-400 mb-6">
        Full Stack Developer passionate about building modern web apps with the MERN stack.
      </p>
      <div className="flex gap-4 mt-2">
        <SocialLink href="https://www.linkedin.com/in/harshavardhansaripalli/" icon={<Linkedin size={18} />} label="LinkedIn" />
        <SocialLink href="https://github.com/harsha2143" icon={<Github size={18} />} label="GitHub" />
        <SocialLink href="mailto:harshavardhansaripalli21@gmail.com" icon={<Mail size={18} />} label="Email" />
      </div>
    </div>
  </Motion>

  {/* Right: Quick Links + Coding Profiles */}
  <div className="w-full md:w-1/2 sm:w-full sm:justify-center sm:flex-row sm:mt-10 flex flex-col justify-end gap-40">
    {/* Quick Links */}
    <Motion delay={200}>
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
        <div className="flex flex-col gap-3">
          <FooterLink href="#home" label="Home" icon={<Home size={16} />} />
          <FooterLink href="#projects" label="Projects" icon={<Briefcase size={16} />} />
          <FooterLink href="#contact" label="Contact" icon={<Phone size={16} />} />
          <FooterLink href="#about" label="About" icon={<Home size={16} />} />
        </div>
      </div>
    </Motion>

    {/* Coding Profiles */}
    <Motion delay={300}>
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Coding Profiles</h3>
        <ul className="flex flex-col gap-3 text-sm text-gray-400">
          <FooterLink href={codingProfiles.LeetCode} label="LeetCode" icon={<FileCode2 size={16} />} />
          <FooterLink href={codingProfiles.HackerRank} label="HackerRank" icon={<Code2 size={16} />} />
          <FooterLink href={codingProfiles.CodeChef} label="CodeChef" icon={<Terminal size={16} />} />
          <FooterLink href={codingProfiles.GitHub} label="GitHub" icon={<Github size={16} />} />
        </ul>
      </div>
    </Motion>
  </div>
</div>

        {/* Bottom Footer */}
        <Motion delay={500} className="mt-10 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Saripalli Harshavardhan. All rights reserved.</p>
        </Motion>
      </div>
    </footer>
  );
}
