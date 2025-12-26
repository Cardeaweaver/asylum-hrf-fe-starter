import React from 'react';
import Plot from './PlotClient.jsx';
import { useAppContext } from '../../context/AppContext.jsx';

export const HeatMap = () => {
  const { graphData, getYears } = useAppContext();

  const yearResults = graphData?.yearResults ?? [];
  
  // Since the API only provides yearly summary (no office breakdown),
  // we'll display yearly statistics as a simple bar chart instead
  const years = getYears();
  const grantRates = yearResults.map(y => y.granted);
  const denialRates = yearResults.map(y => 100 - y.granted);

  if (!years.length || !grantRates.length) {
    return <div className="text-center py-20 text-gray-500">No data available</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Plot
        data={[
          {
            x: years,
            y: grantRates,
            name: 'Grant Rate (%)',
            type: 'bar',
            marker: { color: 'rgba(26, 118, 255, 0.8)' },
            hovertemplate: '<b>Year:</b> %{x}<br><b>Grant Rate:</b> %{y:.2f}%<extra></extra>',
          },
          {
            x: years,
            y: denialRates,
            name: 'Denial Rate (%)',
            type: 'bar',
            marker: { color: 'rgba(255, 99, 71, 0.8)' },
            hovertemplate: '<b>Year:</b> %{x}<br><b>Denial Rate:</b> %{y:.2f}%<extra></extra>',
          },
        ]}
        layout={{
          title: 'Asylum Grant vs Denial Rates by Fiscal Year',
          xaxis: { title: 'Fiscal Year', showgrid: true, gridwidth: 1, gridcolor: '#e5e7eb' },
          yaxis: { title: 'Percentage (%)', range: [0, 100], showgrid: true, gridwidth: 1, gridcolor: '#e5e7eb' },
          barmode: 'stack',
          hovermode: 'x unified',
          height: 600,
          paper_bgcolor: '#ffffff',
          plot_bgcolor: '#f9f9f9',
          font: { family: 'serif', color: '#1e3a8a' },
        }}
        config={{ scrollZoom: false, responsive: true, displayModeBar: true }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );

};
