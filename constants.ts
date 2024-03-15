export type SectorType =
  | 'Industrials'
  | 'Health Care'
  | 'Information Technology'
  | 'Utilities'
  | 'Financials'
  | 'Materials'
  | 'Consumer Discretionary'
  | 'Real Estate'
  | 'Communication Services'
  | 'Consumer Staples'
  | 'Energy';

export const sectors: SectorType[] = [
  'Industrials',
  'Health Care',
  'Information Technology',
  'Utilities',
  'Financials',
  'Materials',
  'Consumer Discretionary',
  'Real Estate',
  'Communication Services',
  'Consumer Staples',
  'Energy',
];

export type ReactFlowNode = {
  id: string;
  data: { [key: string]: any };
  position: { x: number; y: number };
  parentNode: string;
};

export type ReactFlowEdge = {
  id: string;
  source: string;
  target: string;
  parentNode?: string;
  animated?: boolean;
};

type CompanySectorMapObj = {
  [key in SectorType]: {
    nodes: ReactFlowNode[];
    edges: ReactFlowEdge[];
  };
};

export const nodeEdgePosition = { x: 0, y: 0 };

export const elkOptions = {
  'elk.algorithm': 'box',
  'elk.layered.spacing.nodeNodeBetweenLayers': '25',
  'elk.spacing.nodeNode': '25',
};
