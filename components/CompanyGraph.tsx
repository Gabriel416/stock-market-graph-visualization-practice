'use client';
import React, { useState, useCallback, useLayoutEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Background,
  Controls,
} from 'reactflow';
import { SectorType, elkOptions, ReactFlowEdge, ReactFlowNode } from '@/constants';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { getNodesAndEdges } from '@/lib/utils';
import ELK from 'elkjs/lib/elk.bundled.js';
import 'reactflow/dist/style.css';

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
  const [filterInput, setFilterInput] = useState('');
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

  useLayoutEffect(() => {
    const filteredCompanies = companies.filter(({ name }) =>
      name.toLowerCase().replace(/\s/g, '').includes(filterInput.toLowerCase().replace(/\s/g, ''))
    );
    const { nodes, edges } = getNodesAndEdges(filteredCompanies);

    onLayout({
      direction: 'DOWN',
      nodes,
      edges,
    });
  }, [companies, filterInput]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
    >
      <Panel className='w-[400px]' position='top-right'>
        <Input
          onChange={(e) => setFilterInput(e.target.value)}
          placeholder='Search Companies...'
          className='w-full py-6'
        />
      </Panel>
      <Controls />
      <Background className='bg-blue-5  0' />
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
