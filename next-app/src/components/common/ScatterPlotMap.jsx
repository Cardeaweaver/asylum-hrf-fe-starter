import Plot from './PlotClient.jsx';
import { useAppContext } from '../../context/AppContext.jsx';

export const ScatterPlot = () => {
  const { graphData, getYears } = useAppContext();

  const grantRates = graphData?.yearResults?.map(({ granted }) => granted) ?? [];

  return (
    <div className='flex items-center justify-center min-h-[600px]'>
      <Plot
        data={[
          {
            x: getYears(),
            y: grantRates,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Grant Rate',
            line: { color: '#3b82f6', width: 3 },
            marker: { color: '#3b82f6', size: 8 },
          },
        ]}
        layout={{
          title: 'Asylum Grant Rate for All USCIS Asylum Offices Over Time',
          xaxis: { title: 'Fiscal Year', showgrid: true, gridwidth: 1, gridcolor: '#e5e7eb' },
          yaxis: { title: 'Grant Rate (%)', range: [0, 100], showgrid: true, gridwidth: 1, gridcolor: '#e5e7eb' },
          hovermode: 'closest',
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
