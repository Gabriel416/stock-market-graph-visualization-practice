import { SectorType } from './types';

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

export const nodeEdgePosition = { x: 0, y: 0 };

export const elkOptions = {
  'elk.algorithm': 'box',
  'elk.layered.spacing.nodeNodeBetweenLayers': '25',
  'elk.spacing.nodeNode': '25',
};
