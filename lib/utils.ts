import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import ELK, { ElkNode, ElkExtendedEdge } from 'elkjs/lib/elk.bundled.js';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function random_rgba() {
  const o = Math.round;
  const r = Math.random;
  const s = 255;
  return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 0.2 + ')';
}

export function getLayoutedElements(nodes: ElkNode[], edges: ElkExtendedEdge[], options = {}) {
  const elk = new ELK();
  const graph = {
    id: 'root',
    layoutOptions: options,
    children: nodes.map((node) => ({
      ...node,
      width: 150,
      height: 50,
    })),
    edges: edges,
  };

  return elk
    .layout(graph)
    .then((layoutedGraph) => {
      if (layoutedGraph) {
        return {
          nodes: layoutedGraph?.children?.map((node) => ({
            ...node,
            // React Flow expects a position property on the node instead of `x`
            // and `y` fields.
            position: { x: node.x, y: node.y },
          })),

          edges: layoutedGraph.edges,
        };
      }
    })
    .catch(console.error);
}

export function trimAndLowerCase(str: string) {
  return str.toLowerCase().replace(/\s/g, '');
}
