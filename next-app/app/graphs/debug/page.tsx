"use client";

import React from 'react';
import { ScatterPlot } from '../../../src/components/common/ScatterPlotMap.jsx';
import { HeatMap } from '../../../src/components/common/HeatMap.jsx';
import { ChoroplethMap } from '../../../src/components/common/ChoroplethMap.jsx';

export default function GraphsDebugRoute() {
  return (
    <div className="flex flex-col gap-10 items-center justify-start w-full min-h-screen py-10">
      <section className="w-full max-w-6xl bg-white shadow rounded p-6">
        <h2 className="text-xl mb-4">Time Series (ScatterPlot)</h2>
        <div className="w-full h-[500px]">
          <ScatterPlot />
        </div>
      </section>

      <section className="w-full max-w-6xl bg-white shadow rounded p-6">
        <h2 className="text-xl mb-4">USCIS Asylum Offices Heat Map</h2>
        <div className="w-full h-[500px]">
          <HeatMap />
        </div>
      </section>

      <section className="w-full max-w-6xl bg-white shadow rounded p-6">
        <h2 className="text-xl mb-4">Citizenship Choropleth</h2>
        <div className="w-full h-[500px]">
          <ChoroplethMap />
        </div>
      </section>
    </div>
  );
}
