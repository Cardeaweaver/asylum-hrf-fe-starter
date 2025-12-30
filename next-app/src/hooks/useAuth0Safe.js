"use client";

import { createContext, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// Fallback context for when Auth0 is not available
const FallbackAuth0Context = createContext({
  isAuthenticated: false,
  isLoading: false,
  user: null,
  loginWithRedirect: undefined,
  logout: undefined,
  getAccessTokenSilently: undefined,
});

/**
 * Safe wrapper that tries Auth0 first, falls back to custom context
 * Works with conditional Auth0Provider in ProvidersClient
 */
export function useAuth0Safe() {
  // First try Auth0's context
  try {
    const auth0Context = useAuth0();
    // If we got a valid context, use it
    if (auth0Context && typeof auth0Context.isAuthenticated !== 'undefined') {
      return auth0Context;
    }
  } catch (error) {
    // Auth0 context not available, will use fallback below
  }
  
  // Use fallback context
  return useContext(FallbackAuth0Context);
}

export { FallbackAuth0Context };
