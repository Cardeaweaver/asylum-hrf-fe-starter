import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAsylumData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with the actual HRF API endpoint provided in your project brief
        const response = await axios.get('https://hrf-asylum-be-b.herokuapp.com/cases');
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};