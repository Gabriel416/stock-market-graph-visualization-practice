'use client';
import ELK from 'elkjs/lib/elk.bundled.js';
import React, { useCallback, useLayoutEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Background,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { SectorType, elkOptions, ReactFlowEdge, ReactFlowNode } from '@/constants';
import { Button } from './ui/button';
import { getNodesAndEdges } from '@/lib/utils';

type CompanyType = {
  id: number;
  ticker: string;
  name: string;
  sector: SectorType;
  headquarters: string;
  date_added: string;
};

interface CompanyGraphProps {
  companies: CompanyType[];
}

const elk = new ELK();

const getLayoutedElements = (nodes, edges, options = {}) => {
  const isHorizontal = options?.['elk.direction'] === 'RIGHT';
  const graph = {
    id: 'root',
    layoutOptions: options,
    children: nodes.map((node) => ({
      ...node,
      // Adjust the target and source handle positions based on the layout
      // direction.
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',

      // Hardcode a width and height for elk to use when layouting.
      width: 150,
      height: 50,
    })),
    edges: edges,
  };

  return elk
    .layout(graph)
    .then((layoutedGraph) => ({
      nodes: layoutedGraph.children.map((node) => ({
        ...node,
        // React Flow expects a position property on the node instead of `x`
        // and `y` fields.
        position: { x: node.x, y: node.y },
      })),

      edges: layoutedGraph.edges,
    }))
    .catch(console.error);
};

function LayoutFlow({ companies }: CompanyGraphProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();

  const onLayout = useCallback(
    ({ direction, nodes, edges }) => {
      const opts = { 'elk.direction': direction, ...elkOptions };

      getLayoutedElements(nodes, edges, opts).then(
        ({ nodes: layoutedNodes, edges: layoutedEdges }) => {
          setNodes(layoutedNodes);
          setEdges(layoutedEdges);

          window.requestAnimationFrame(() => fitView());
        }
      );
    },
    [nodes, edges]
  );

  // Calculate the initial layout on mount.
  useLayoutEffect(() => {
    const { nodes, edges } = getNodesAndEdges(companies);

    onLayout({
      direction: 'DOWN',
      nodes,
      edges,
    });
  }, [companies]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
    >
      <Panel position='top-right'>
        <Button onClick={() => onLayout({ direction: 'DOWN', nodes, edges })}>
          vertical layout
        </Button>

        <Button onClick={() => onLayout({ direction: 'RIGHT', nodes, edges })}>
          horizontal layout
        </Button>
      </Panel>
      <Controls />
      <Background />
    </ReactFlow>
  );
}

export const CompanyGraph = ({ companies }: CompanyGraphProps) => (
  <ReactFlowProvider>
    <div className='h-[80vh] w-full'>
      <LayoutFlow companies={companies} />
    </div>
  </ReactFlowProvider>
);
