import React from 'react';
import { Activity } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className='bg-white shadow dark:bg-gray-900'>
      <div className='w-full max-w-screen-xl mx-auto p-4 md:py-8'>
        <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
        <span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
          ©{new Date().getFullYear()}{' '}
          <a href='mailto:gferguson954@gmail.com' className='hover:underline'>
            Gabriel Ferguson
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
