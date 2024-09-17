'use client';

import React from 'react';

const LoadingSection = () => {
  return (
    <section className="flex h-full w-full justify-center">
      <div className="flex w-full max-w-xs flex-col items-center pt-[15vh] lg:pt-[30vh]">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-24 w-24 animate-spin rounded-full border-b-4 border-t-4 border-[#fec932]" />
        </div>
        <p className="mt-10 font-bold text-gray-600">
          Loading
          <span className="loading-dot">.</span>
          <span className="loading-dot">.</span>
          <span className="loading-dot">.</span>
        </p>
      </div>
    </section>
  );
};

export default LoadingSection;
