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

export type CompanyType = {
  id: number;
  ticker: string;
  name: string;
  sector: SectorType;
  headquarters: string;
  date_added: string;
};

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

export type CompanySectorMapObj = {
  [key in SectorType]: {
    nodes: ReactFlowNode[];
    edges: ReactFlowEdge[];
  };
};
