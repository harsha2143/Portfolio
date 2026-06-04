import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";

const LANG_MAP = {
  js: "javascript",
  jsx: "jsx",
  ts: "typescript",
  tsx: "tsx",
  py: "python",
  rb: "ruby",
  rs: "rust",
  go: "go",
  java: "java",
  cpp: "cpp",
  c: "c",
  cs: "csharp",
  sh: "bash",
  bash: "bash",
  zsh: "bash",
  ps1: "powershell",
  powershell: "powershell",
  html: "html",
  css: "css",
  scss: "scss",
  json: "json",
  xml: "xml",
  yaml: "yaml",
  yml: "yaml",
  md: "markdown",
  sql: "sql",
  graphql: "graphql",
  diff: "diff",
  dockerfile: "dockerfile",
  docker: "dockerfile",
};

export default function CodeBlock({ language, value }) {
  const [copied, setCopied] = useState(false);
  const lang = LANG_MAP[language] || language || "text";

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 rounded-lg overflow-hidden border border-[#30363d] group">
      <div className="flex items-center justify-between bg-[#161b22] px-4 py-1.5 border-b border-[#30363d]">
        <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
          {language || "text"}
        </span>
        <button
          onClick={handleCopy}
          className="text-[11px] text-gray-500 hover:text-gray-300 transition-colors opacity-0 group-hover:opacity-100"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <SyntaxHighlighter
        language={lang}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          padding: "1rem",
          fontSize: "0.8125rem",
          lineHeight: "1.6",
          background: "#0d1117",
        }}
        showLineNumbers={false}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
}
