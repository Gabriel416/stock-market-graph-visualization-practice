import React, { useState, useEffect } from 'react';
import { CompanyType } from '@/types';

interface UseGetStockInfoParams {
  setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
}

export const useGetStockInfo = ({ setSideBarOpen, id }: UseGetStockInfoParams) => {
  const [loading, setLoading] = useState(false);
  const [companyData, setCompanyData] = useState<CompanyType | null>(null);
  useEffect(() => {
    async function getStockInfo() {
      try {
        setLoading(true);
        const res = await fetch(`/api/companies/${id}`);
        const { company } = await res.json();
        setCompanyData(company);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      setSideBarOpen(true);
      getStockInfo();
    }
  }, [id]);

  return {
    companyData,
    loading,
  };
};
