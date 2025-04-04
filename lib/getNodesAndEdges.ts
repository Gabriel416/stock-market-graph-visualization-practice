import { nodeEdgePosition, sectors } from '@/constants';
import { CompanySectorMapObj, SectorType, CompanyType } from '@/types';
import { random_rgba } from './utils';

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
    style: { backgroundColor: random_rgba() },
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
  const companySectorMap: CompanySectorMapObj = {};

  sectors.forEach((sectorName) => {
    companySectorMap[sectorName] = {
      nodes: [],
      edges: [],
    };
  });

  companies.forEach((company) => {
    const { ticker, sector, name } = company;
    companySectorMap[sector].nodes.push({
      id: ticker,
      data: { label: `${name} (${ticker})`, ...company },
      position: nodeEdgePosition,
      parentNode: sector,
    });
  });

  return aggregateCompanyNodesAndEdges(companySectorMap);
}

function aggregateCompanyNodesAndEdges(companySectorMap: CompanySectorMapObj) {
  const companyNodes = [];
  const companyEdges = [];
  for (const property in companySectorMap) {
    const sectorCompanyNodes = companySectorMap[property as SectorType].nodes;
    const sectorCompanyEdges = companySectorMap[property as SectorType].edges;
    const sectorCompanyNodeCopy = [...sectorCompanyNodes];

    while (sectorCompanyNodeCopy.length) {
      const sourceNode = sectorCompanyNodeCopy.shift();
      const targetNode = sectorCompanyNodeCopy[0];

      if (sourceNode) {
        sectorCompanyEdges.push({
          id: `${sourceNode.data.sector}-${sourceNode.id}`,
          source: sourceNode.data.sector,
          target: sourceNode.id,
        });
      }

      if (sourceNode && targetNode) {
        sectorCompanyEdges.push({
          id: `${sourceNode.id}-${targetNode.id}`,
          source: sourceNode.id,
          target: targetNode.id,
        });
      }
    }

    companyNodes.push(...sectorCompanyNodes);
    companyEdges.push(...sectorCompanyEdges);
  }

  return { companyNodes, companyEdges };
}
