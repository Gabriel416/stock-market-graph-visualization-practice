'use client';
import React, { useState, useCallback, useLayoutEffect } from 'react';
import {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Node,
  Edge,
} from 'reactflow';
import { elkOptions } from '@/constants';
import { getLayoutedElements, trimAndLowerCase } from '@/lib/utils';
import { getNodesAndEdges } from '@/lib/getNodesAndEdges';
import { CompanyType } from '@/types';
import { ElkNode, ElkExtendedEdge } from 'elkjs/lib/elk.bundled.js';
import { Sidebar } from './Sidebar';
import { GraphVisualization } from './GraphVisualization';
import 'reactflow/dist/style.css';

interface CompanyGraphProps {
  companies: CompanyType[];
}

interface ElkNodesAndEdges {
  nodes: ElkNode[];
  edges: ElkExtendedEdge[];
}

function LayoutFlow({ companies }: CompanyGraphProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [filterInput, setFilterInput] = useState('');
  const [selectedStock, setSelectedStock] = useState<string | undefined>();
  const { fitView } = useReactFlow();

  const onLayout = useCallback(
    ({ nodes, edges }: ElkNodesAndEdges) => {
      getLayoutedElements(nodes, edges, elkOptions).then(
        ({ nodes: layoutedNodes, edges: layoutedEdges }) => {
          setNodes(layoutedNodes);
          setEdges(layoutedEdges);
          if (filterInput?.length) {
            window.requestAnimationFrame(() => fitView());
          }
        }
      );
    },
    [nodes, edges]
  );

  useLayoutEffect(() => {
    const filteredCompanies = companies.filter(({ name }) =>
      trimAndLowerCase(name).includes(trimAndLowerCase(filterInput))
    );
    const { nodes, edges } = getNodesAndEdges(filteredCompanies);

    onLayout({
      nodes,
      edges,
    });
  }, [companies, filterInput]);

  return (
    <>
      <GraphVisualization
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        setSelectedStock={setSelectedStock}
        setFilterInput={setFilterInput}
      />
      <Sidebar selectedStock={selectedStock} />
    </>
  );
}

export const GraphDashboard = ({ companies }: CompanyGraphProps) => (
  <ReactFlowProvider>
    <LayoutFlow companies={companies} />
  </ReactFlowProvider>
);
