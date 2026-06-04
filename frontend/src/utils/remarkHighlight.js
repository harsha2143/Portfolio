import { visit } from "unist-util-visit";

export default function remarkHighlight() {
  return (tree) => {
    visit(tree, "text", (node, index, parent) => {
      if (!parent || index === undefined) return;
      const parts = node.value.split(/(==[^=]+==)/g);
      if (parts.length <= 1) return;

      const children = [];
      for (const part of parts) {
        const match = part.match(/^==([^=]+)==$/);
        if (match) {
          children.push({
            type: "html",
            value: `<mark class="px-1 rounded bg-yellow-500/20 text-yellow-300">${match[1]}</mark>`,
          });
        } else if (part) {
          children.push({ type: "text", value: part });
        }
      }

      parent.children.splice(index, 1, ...children);
    });
  };
}
