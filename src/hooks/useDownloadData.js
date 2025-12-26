import React from 'react';
import { useAppContext } from '../context/AppContext.jsx';

export const useDownloadData = () => {
  const { graphData } = useAppContext();

  const filename = 'asylum_data.csv';

  function downloadJson() {
    const dataStr = JSON.stringify(graphData, null, 2); // Convert to string, formatted
    const blob = new Blob([dataStr], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);
  }

  const flattenObject = (obj, prefix = '') => {
    if (!obj || typeof obj !== 'object') {
      console.warn('flattenObject: obj is not a valid object:', obj);
      return {}; // Return empty object instead of undefined
    }
    
    return Object.keys(obj).reduce((acc, key) => {
      const pre = prefix.length ? `${prefix}.` : '';

      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        Object.assign(acc, flattenObject(obj[key], `${pre}${key}`));
      } else if (Array.isArray(obj[key])) {
        obj[key].forEach((item, index) => {
          Object.assign(acc, flattenObject(item, `${pre}${key}[${index}]`));
        });
      } else {
        acc[`${pre}${key}`] = obj[key];
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
      
      if (!flattenData || typeof flattenData !== 'object') {
        console.warn('flattenData is null/undefined or not an object');
        return;
      }

      const csvRows = [];
      const headers = Object.keys(flattenData);
      console.log('Headers:', headers);
      
      if (!headers || headers.length === 0) {
        console.warn('No headers found for CSV download.');
        return;
      }
      
      csvRows.push(headers.join(',')); // Add headers

      const row = headers.map(header => JSON.stringify(flattenData[header], (key, value) => (value === null ? '' : value))).join(',');
      csvRows.push(row); // Add the data row

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
