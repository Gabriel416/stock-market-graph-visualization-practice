import { useState, useEffect } from 'react';
import { CompanyType } from '@/types';

export const useGetCompanies = () => {
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  useEffect(() => {
    async function getCompanies() {
      const res = await fetch('/api/companies');

      const { companies } = await res.json();
      setCompanies(companies);
    }

    getCompanies();
  }, []);

  return [companies];
};
