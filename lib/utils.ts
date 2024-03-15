import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SectorType, nodeEdgePosition, sectors, companySectorMap } from '@/constants';

type CompanyType = {
  id: number;
  ticker: string;
  name: string;
  sector: SectorType;
  headquarters: string;
  date_added: string;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNodesAndEdges(companies: CompanyType[]) {
  const { sectorNodes, sectorEdges } = getSectorNodesAndEdges();
  const { companyNodes, companyEdges } = getCompanyNodesAndEdges(companies);
  return {
    nodes: [...sectorNodes, ...companyNodes],
    edges: [...sectorEdges, ...companyEdges],
  };
}

function getSectorNodesAndEdges() {
  const sectorNodes = sectors.map((sectorName: SectorType) => ({
    id: sectorName,
    data: { label: sectorName },
    position: nodeEdgePosition,
    style: { backgroundColor: 'rgba(255, 0, 0, 0.2)', width: 200, height: 200 },
  }));
  const sectorNodeCopy = [...sectorNodes];
  const sectorEdges = [];

  while (sectorNodeCopy.length) {
    const sourceNode = sectorNodeCopy.shift();
    const targetNode = sectorNodeCopy[0];

    if (sourceNode && targetNode) {
      sectorEdges.push({
        id: `${sourceNode.id}-${targetNode.id}`,
        source: sourceNode.id,
        target: targetNode.id,
        animated: true,
      });
    }
  }

  return {
    sectorNodes,
    sectorEdges,
  };
}

function getCompanyNodesAndEdges(companies: CompanyType[]) {
  const companyNodes = [];
  const companyEdges = [];
  companies.map((company) => {
    const { ticker, sector, name } = company;
    companySectorMap[sector].nodes.push({
      id: ticker,
      data: { label: `${name} (${ticker})`, ...company },
      position: nodeEdgePosition,
      parentNode: sector,
    });
  });

  for (const property in companySectorMap) {
    const sectorCompanyNodes = companySectorMap[property as SectorType].nodes;
    const sectorCompanyEdges = companySectorMap[property as SectorType].edges;
    const sectorCompanyNodeCopy = [...sectorCompanyNodes];

    while (sectorCompanyNodeCopy.length) {
      const sourceNode = sectorCompanyNodeCopy.shift();
      const targetNode = sectorCompanyNodeCopy[0];

      if (sourceNode && targetNode) {
        sectorCompanyEdges.push({
          id: `${sourceNode.id}-${targetNode.id}`,
          source: sourceNode.id,
          target: targetNode.id,
        });

        sectorCompanyEdges.push({
          id: `${sourceNode.data.sector}-${sourceNode.id}`,
          source: sourceNode.data.sector,
          target: sourceNode.id,
        });
      }
    }

    companyNodes.push(...sectorCompanyNodes);
    companyEdges.push(...sectorCompanyEdges);
  }

  return { companyNodes, companyEdges };
}
