import React, { useState } from 'react';
import { useAppContext } from '../../../context/AppContext.jsx';
import { getMapView, mapTypes } from './getMapView.jsx';
import { GraphButtons } from '../../common/GraphButtons.jsx';
import { Loading } from '../../common/Loading.jsx';
import { getGraphsHeader } from './getGraphsHeader.js';

export const GraphsPage = () => {
  const [mapView, setMapView] = useState(mapTypes.ScatterPlot);
  // Get graphData and isDataLoading from AppContext
  const { graphData, isDataLoading } = useAppContext();

  if (isDataLoading) return <Loading />;
  if (!graphData) return <div className="text-center py-20 text-red-500">No data available</div>;

  return (
    /* use w-full and min-h-screen to ensure the footer stays at the bottom */
    <div className='flex flex-col w-full min-h-screen font-serif bg-white'>
      
      {/* 1. Header Section - Matching the Hero style */}
      <section className="bg-[#1e3a8a] text-white py-12 px-10 text-center">
        <h1 className='text-4xl font-normal'>{getGraphsHeader(mapView)}</h1>
      </section>

      {/* 2. Main Content Area */}
      <main className='flex-grow flex flex-col items-center py-16 px-4'>
        <div className='w-full max-w-6xl bg-white shadow-lg rounded-xl p-8'>
          
          {/* Graph/Map Display */}
          <section className='maps w-full h-[600px] mb-10'>
            {getMapView(mapView)} {/* Pass map view type to render the correct component */}
          </section>

          {/* Controls Section */}
          <div className='flex justify-center border-t border-gray-100 pt-8'>
            <GraphButtons mapView={mapView} setMapView={setMapView} />
          </div>
        </div>
      </main>
    </div>
  );
};