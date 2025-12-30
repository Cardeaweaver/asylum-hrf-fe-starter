"use client";

import { Auth0Provider } from '@auth0/auth0-react';
import { ProvideAppContext } from '../context/AppContext.jsx';
import { MockAuth0Provider } from './MockAuth0Provider.jsx';
import { createContext } from 'react';

// Context to track if Auth0 is available
export const Auth0AvailableContext = createContext(false);

export default function ProvidersClient({ children }) {
  const domain = process.env.NEXT_PUBLIC_AUTH_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_AUTH_CLIENT_ID;

  return (
    <Auth0Provider
      domain={domain || ''}
      clientId={clientId || ''}
      authorizationParams={{
        redirect_uri: typeof window !== 'undefined' ? window.location.origin : '',
      }}
    >
      <ProvideAppContext>
        {children}
      </ProvideAppContext>
    </Auth0Provider>
  );
}
