import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  theme: "dark",
  startOnLoad: false,
});

export default function Mermaid({ chart }) {
  const [svg, setSvg] = useState("");
  const [error, setError] = useState(null);
  const idRef = useRef("mermaid-" + Math.random().toString(36).slice(2));

  useEffect(() => {
    mermaid
      .render(idRef.current, chart)
      .then(({ svg }) => setSvg(svg))
      .catch((err) => setError(err.message));
  }, [chart]);

  if (error) {
    return (
      <div className="text-red-400 text-sm p-4 border border-red-500/20 rounded-lg bg-red-500/5 my-4">
        Mermaid error: {error}
      </div>
    );
  }

  return (
    <div
      className="my-6 flex justify-center"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
