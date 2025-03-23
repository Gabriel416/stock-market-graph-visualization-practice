import React from 'react';
import ReactFlow, {
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  Panel,
  Background,
  Controls,
} from 'reactflow';
import { Input } from './ui/input';

interface GraphVisualizationProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  setSelectedStock: React.Dispatch<React.SetStateAction<string | undefined>>;
  setFilterInput: React.Dispatch<React.SetStateAction<string>>;
}

export const GraphVisualization = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  setSelectedStock,
  setFilterInput,
}: GraphVisualizationProps) => {
  return (
    <div className='h-full w-full'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(_, node) => {
          setSelectedStock(node.id);
        }}
        fitView
      >
        <Panel className='w-[350px]' position='top-right'>
          <Input
            onChange={(e) => setFilterInput(e.target.value)}
            placeholder='Search Companies...'
            className='w-full py-6'
          />
        </Panel>
        <Controls />
        <Background className='bg-blue-50' />
      </ReactFlow>
    </div>
  );
};
