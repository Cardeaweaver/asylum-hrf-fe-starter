"use client";

import { createContext, useContext } from 'react';

// Create a context that mimics Auth0's context structure
const MockAuth0Context = createContext(null);

/**
 * Mock Auth0 Provider for when Auth0 is not available (not on localhost/https)
 */
export function MockAuth0Provider({ children }) {
  const mockAuth0Value = {
    isAuthenticated: false,
    isLoading: false,
    user: null,
    loginWithRedirect: async () => {
      alert('Auth0 is only available on localhost. Please access via http://localhost:3000');
    },
    logout: async () => {
      console.warn('Logout not available - Auth0 not initialized');
    },
    getAccessTokenSilently: async () => {
      throw new Error('Auth0 not available');
    },
  };

  return (
    <MockAuth0Context.Provider value={mockAuth0Value}>
      {children}
    </MockAuth0Context.Provider>
  );
}

/**
 * Hook to use the mock Auth0 context
 */
export function useMockAuth0() {
  return useContext(MockAuth0Context);
}
