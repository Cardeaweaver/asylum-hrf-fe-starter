import { useAppContext } from '../context/AppContext.jsx';

export const useDownloadData = () => {
  const { graphData } = useAppContext();

  const filename = 'asylum_data.csv';

  const flattenObject = (obj, prefix = '') => {
    if (!obj || typeof obj !== 'object') {
      return {};
    }
    return Object.keys(obj).reduce((acc, key) => {
      const pre = prefix.length ? `${prefix}.` : '';
      const value = obj[key];

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        Object.assign(acc, flattenObject(value, `${pre}${key}`));
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          Object.assign(acc, flattenObject(item, `${pre}${key}[${index}]`));
        });
      } else {
        acc[`${pre}${key}`] = value;
      }

      return acc;
    }, {});
  };

  function downloadCSV() {
    try {
      console.log('downloadCSV called, graphData:', graphData);
      
      if (!graphData || typeof graphData !== 'object') {
        console.warn('No valid graph data available to download');
        return;
      }

      console.log('Flattening data...');
      const flattenData = flattenObject(graphData);
      console.log('flattenData result:', flattenData, 'type:', typeof flattenData);
      
      if (!flattenData) {
        console.warn('flattenData is null/undefined');
        return;
      }
      
      if (typeof flattenData !== 'object') {
        console.warn('flattenData is not an object, it is:', typeof flattenData);
        return;
      }

      console.log('About to call Object.keys(flattenData)');
      const headers = Object.keys(flattenData);
      console.log('Headers:', headers);
      
      if (!headers || headers.length === 0) {
        console.warn('No headers found for CSV download.');
        return;
      }
      
      const csvRows = [];
      csvRows.push(headers.join(','));

      const row = headers
        .map(header => JSON.stringify(flattenData[header], (key, value) => (value === null ? '' : value)))
        .join(',');
      csvRows.push(row);

      const csvString = csvRows.join('\n');
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      console.log('CSV downloaded successfully');
    } catch (error) {
      console.error('Error downloading CSV:', error);
    }
  }

  return { downloadCSV };
};
