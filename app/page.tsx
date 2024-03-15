'use client';
import React, { useState, useEffect } from 'react';
import { CompanyGraph } from '@/components/CompanyGraph';

export default function Home() {
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    async function getCompanies() {
      const res = await fetch('/api/companies');

      const { companies } = await res.json();
      setCompanies(companies);
    }

    getCompanies();
  }, []);

  return <CompanyGraph companies={companies} />;
}
