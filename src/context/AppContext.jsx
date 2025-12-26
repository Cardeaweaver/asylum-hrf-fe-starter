import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
// import testData from '../data/test_data.json'; // Removed to use live API
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const AppContext = createContext({});

const useAppContextProvider = () => {
  // Initialize with null or empty object instead of testData
  const [graphData, setGraphData] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useLocalStorage({ graphData, setGraphData });

  // API base URL provided in requirements
  const API_URL = 'https://asylum-be.onrender.com';

  const fetchData = async () => {
    try {
      setIsDataLoading(true);
      // Fetching fiscal and citizenship data from the API endpoints
      const fiscalResponse = await axios.get(`${API_URL}/fiscalSummary`);
      const citizenshipResponse = await axios.get(`${API_URL}/citizenshipSummary`);
      
      // Handle different response structures
      const fiscalData = Array.isArray(fiscalResponse.data) ? fiscalResponse.data : fiscalResponse.data.data || [];
      const citizenshipData = Array.isArray(citizenshipResponse.data) ? citizenshipResponse.data : citizenshipResponse.data.data || [];
      
      // Combine both datasets
      const combinedData = {
        yearResults: fiscalData,
        citizenshipResults: citizenshipData
      };
      
      console.log("Combined Data:", combinedData);
      setGraphData(combinedData);
    } catch (error) {
      console.error("Error fetching asylum data:", error);
    } finally {
      setIsDataLoading(false);
    }
  };

  const getFiscalData = () => {
    // Returns the yearResults portion of the live data
    return graphData?.yearResults || [];
  };

  const getCitizenshipResults = async () => {
    // Returns the citizenshipResults portion of the live data
    return graphData?.citizenshipResults || [];
  };

  const updateQuery = async () => {
    setIsDataLoading(true);
  };

  const clearQuery = () => {
    setGraphData(null);
  };

  const getYears = () => 
    graphData?.yearResults?.map(({ fiscal_year }) => Number(fiscal_year)) ?? [];

  useEffect(() => {
    // Automatically fetch data on initial load to populate graphs
    fetchData();
  }, []);

  useEffect(() => {
    if (isDataLoading) {
      fetchData();
    }
  }, [isDataLoading]);

  return {
    graphData,
    setGraphData,
    isDataLoading,
    updateQuery,
    clearQuery,
    getYears,
    getFiscalData,
    getCitizenshipResults,
  };
};

export function useAppContext() {
  return useContext(AppContext);
}

export function ProvideAppContext({ children }) {
  const contextValue = useAppContextProvider();

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}