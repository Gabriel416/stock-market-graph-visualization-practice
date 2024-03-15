'use client';
import React from 'react';
import { useGetCompanies } from '@/hooks/useGetCompanies';
import { GraphDashboard } from '@/components/GraphDashboard';

export default function Home() {
  const [companies] = useGetCompanies();

  return <GraphDashboard companies={companies} />;
}
