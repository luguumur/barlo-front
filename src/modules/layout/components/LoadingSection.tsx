"use client";

import React from "react";

const LoadingSection = () => {
  return (
    <section className="flex h-[100vh] w-full justify-center">
      <div className="flex w-full max-w-xs flex-col items-center pt-[30vh]">
        <div className="relative h-24 w-24 flex items-center justify-center">
          <div className="absolute h-24 w-24 animate-spin rounded-full border-b-4 border-t-4 border-[#fec932]" />
        </div>
        <p className="mt-10 h-6 font-bold text-gray-600">
          Loading
          <span className="loading-dot w-[6px] inline-block opacity-0">.</span>
          <span className="loading-dot w-[6px] inline-block opacity-0">.</span>
          <span className="loading-dot w-[6px] inline-block opacity-0">.</span>
        </p>
      </div>
    </section>
  );
};

export default LoadingSection;
