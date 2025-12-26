import React from 'react';
import Plot from './PlotClient.jsx';
import { useAppContext } from '../../context/AppContext.jsx';

export const ChoroplethMap = () => {
  const { graphData } = useAppContext();

  const citizenshipResults = graphData?.citizenshipResults ?? [];
  
  // Sort by granted rate and take top 15
  const topCitizenships = citizenshipResults
    .filter(c => c.granted)
    .sort((a, b) => Number(b.granted) - Number(a.granted))
    .slice(0, 15);

  const countries = topCitizenships.map(({ citizenship }) => citizenship);
  const grantRates = topCitizenships.map(c => Number(c.granted).toFixed(2));

  if (!countries.length) {
    return <div className="text-center py-20 text-gray-500">No citizenship data available</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Plot
        data={[
          {
            x: grantRates,
            y: countries,
            type: 'bar',
            orientation: 'h',
            marker: { color: 'rgba(26, 118, 255, 0.8)' },
            hovertemplate: '<b>%{y}</b><br>Grant Rate: %{x}%<extra></extra>',
          },
        ]}
        layout={{
          title: 'Top 15 Citizenship Groups by Grant Rate',
          xaxis: { title: 'Grant Rate (%)', showgrid: true, gridwidth: 1, gridcolor: '#e5e7eb' },
          yaxis: { title: 'Citizenship' },
          height: 600,
          paper_bgcolor: '#ffffff',
          plot_bgcolor: '#f9f9f9',
          font: { family: 'serif', color: '#1e3a8a' },
          margin: { l: 150 },
        }}
        config={{ scrollZoom: false, responsive: true, displayModeBar: true }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );

};
