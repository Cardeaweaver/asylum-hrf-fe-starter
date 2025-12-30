'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AppContext = createContext(null);

export function ProvideAppContext({ children }) {
  const [graphData, setGraphData] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);

  

  const API_URL = 'https://asylum-be.onrender.com';

  const fetchData = async () => {
    try {
      setIsDataLoading(true);
      const fiscalResponse = await axios.get(`${API_URL}/fiscalSummary`);
      const citizenshipResponse = await axios.get(`${API_URL}/citizenshipSummary`);

      // Extract yearResults from fiscal API (it's nested in the response)
      const fiscalData = fiscalResponse.data.yearResults || [];
      const citizenshipData = Array.isArray(citizenshipResponse.data) 
        ? citizenshipResponse.data 
        : citizenshipResponse.data.data || [];

      console.log('Processed fiscalData:', fiscalData);
      console.log('First fiscal year object:', fiscalData[0]);
      console.log('Processed citizenshipData:', citizenshipData);

      const combinedData = {
        yearResults: fiscalData,
        citizenshipResults: citizenshipData
      };
      setGraphData(combinedData);
    } catch (error) {
      console.error('Error fetching asylum data:', error);
    } finally {
      setIsDataLoading(false);
    }
  };

  const getFiscalData = () => {
    return graphData?.yearResults || [];
  };

  const getCitizenshipResults = async () => {
    return graphData?.citizenshipResults || [];
  };

  const updateQuery = async () => {
    // Trigger a fresh fetch and let fetchData manage loading state
    await fetchData();
  };

  const clearQuery = () => {
    setGraphData(null);
  };

  const getYears = () =>
    graphData?.yearResults?.map(({ fiscal_year }) => Number(fiscal_year)) ?? [];

  // Initialize data on mount
  useEffect(() => {
    
    // Fetch fresh data (skip localStorage for now to debug)
    fetchData();
  }, []);

  // Save to localStorage whenever graphData changes
  useEffect(() => {
    if (typeof window !== 'undefined' && graphData) {
      try {
        localStorage.setItem('graphData', JSON.stringify(graphData));
      } catch (e) {
        console.warn('localStorage save failed', e);
      }
    }
  }, [graphData]);

  const contextValue = {
    graphData,
    setGraphData,
    isDataLoading,
    updateQuery,
    clearQuery,
    getYears,
    getFiscalData,
    getCitizenshipResults,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    // Safe defaults when context is not yet available
    return {
      graphData: null,
      setGraphData: () => {},
      isDataLoading: true,
      updateQuery: () => {},
      clearQuery: () => {},
      getYears: () => [],
      getFiscalData: () => [],
      getCitizenshipResults: async () => [],
    };
  }
  return context;
}
