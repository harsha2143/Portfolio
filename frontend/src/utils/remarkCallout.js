import { visit } from 'unist-util-visit';

export default function remarkCallout() {
  return (tree) => {
    visit(tree, 'blockquote', (node) => {
      const firstChild = node.children?.[0];
      if (firstChild?.type !== 'paragraph') return;

      const firstTextNode = firstChild.children?.find(c => c.type === 'text');
      if (!firstTextNode) return;

      const match = firstTextNode.value.match(/^\s*\[!(\w+)\]\s*/);
      if (!match) return;

      const calloutType = match[1].toLowerCase();

      firstTextNode.value = firstTextNode.value.slice(match[0].length);

      node.data = {
        hProperties: {
          className: `callout callout-${calloutType}`,
          'data-callout-type': calloutType,
        },
      };
    });
  };
}
