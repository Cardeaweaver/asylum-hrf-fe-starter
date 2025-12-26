"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppContext } from '../../../context/AppContext.jsx';
import { getMapView, mapTypes } from './getMapView.jsx';
import { GraphButtons } from '../../common/GraphButtons.jsx';
import { Loading } from '../../common/Loading.jsx';
import { getGraphsHeader } from './getGraphsHeader.js';

export const GraphsPage = () => {
  const searchParams = useSearchParams();
  const viewParam = searchParams.get('view');
  
  const initialView = viewParam === 'grants' ? mapTypes.HeatMap 
                    : viewParam === 'citizenship' ? mapTypes.ChoroplethMap 
                    : mapTypes.ScatterPlot;
  
  const [mapView, setMapView] = useState(initialView);
  const { graphData, isDataLoading } = useAppContext();

  if (isDataLoading) return <Loading />;
  if (!graphData) return <div className="text-center py-20 text-red-500">No data available</div>;

  return (
    <div className='flex flex-col w-full min-h-screen font-serif bg-white'>
      <section className="bg-[#1e3a8a] text-white py-12 px-10 text-center">
        <h1 className='text-4xl font-normal'>{getGraphsHeader(mapView)}</h1>
      </section>

      <main className='flex-grow flex flex-col items-center py-16 px-4'>
        <div className='w-full max-w-6xl bg-white shadow-lg rounded-xl p-8'>
          <section className='maps w-full h-[600px] mb-10'>
            {getMapView(mapView)}
          </section>

          <div className='flex justify-center border-t border-gray-100 pt-8'>
            <GraphButtons mapView={mapView} setMapView={setMapView} />
          </div>
        </div>
      </main>
    </div>
  );
};
