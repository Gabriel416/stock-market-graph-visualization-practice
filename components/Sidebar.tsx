'use client';
import React, { useState } from 'react';
import { useGetStockInfo } from '@/hooks/useGetStockInfo';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { Spinner } from './Spinner';

interface SidebarProps {
  selectedStock?: string;
}

export const Sidebar = ({ selectedStock }: SidebarProps) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const { companyData, loading } = useGetStockInfo({ id: selectedStock, setSideBarOpen });

  return (
    <Sheet open={sideBarOpen} onOpenChange={setSideBarOpen}>
      <SheetContent className='w-[400px] sm:w-[540px]'>
        {loading ? (
          <div className='w-full text-center'>
            <Spinner />
          </div>
        ) : companyData ? (
          <SheetHeader>
            <SheetTitle className='text-center'>{companyData.name}</SheetTitle>
            <SheetDescription className='text-left'>
              <ul className='max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 mt-4'>
                <li>{`Ticker: ${companyData.ticker}`}</li>
                <li>{`Sector: ${companyData.sector}`}</li>
                <li>{`Headquarters: ${companyData.headquarters}`}</li>
                <li>{`Date Added to Market: ${new Date(
                  companyData.date_added
                ).toLocaleDateString()}`}</li>
              </ul>
            </SheetDescription>
          </SheetHeader>
        ) : (
          <p>Error Occurred...</p>
        )}
      </SheetContent>
    </Sheet>
  );
};
