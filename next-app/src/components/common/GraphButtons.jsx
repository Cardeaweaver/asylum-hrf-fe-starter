import { useRouter } from 'next/navigation';
import { useAppContext } from '../../context/AppContext.jsx';
import { mapTypes } from '../../components/pages/DataVisualizations/getMapView.jsx';

const { ScatterPlot, ChoroplethMap, HeatMap } = mapTypes;

export const GraphButtons = ({ mapView, setMapView }) => {
  const router = useRouter();
  const { updateQuery, clearQuery } = useAppContext();

  return (
    <div className='flex flex-col gap-6 items-center'>
      <div className='flex flex-col gap-2'>
        <button className='bg-white p-2 text-black border-2 border-gray-300 hover:bg-gray-100' disabled={mapView === ScatterPlot} onClick={() => setMapView(ScatterPlot)}>
          Time Series
        </button>
        <button className='bg-white p-2 text-black border-2 border-gray-300 hover:bg-gray-100' disabled={mapView === HeatMap} onClick={() => setMapView(HeatMap)}>
          USCIS Asylum Offices Heat Map
        </button>
        <button className='bg-white p-2 text-black border-2 border-gray-300 hover:bg-gray-100' disabled={mapView === ChoroplethMap} onClick={() => setMapView(ChoroplethMap)}>
          Citizenship of Asylum Seeker
        </button>
      </div>

      <div className='flex flex-col gap-2'>
        <button className='bg-[#3b82f6] text-white p-2 hover:bg-[#1e40af]' onClick={updateQuery}>
          Update Query
        </button>
        <button className='bg-[#3b82f6] text-white p-2 hover:bg-[#1e40af]' onClick={clearQuery}>
          Clear Query
        </button>
        <button className='bg-green-600 text-white p-2 hover:bg-green-700' onClick={() => router.push('/')}>
          Home
        </button>
      </div>
    </div>
  );
};
