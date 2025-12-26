import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.jsx';
import { ProvideAppContext } from './context/AppContext.jsx';
import { Auth0Provider } from '@auth0/auth0-react';

const AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN;
const AUTH_CLIENT_ID = import.meta.env.VITE_AUTH_CLIENT_ID;

/**
 * Auth0 Integration Complete:
 * - Wrapped ProvideAppContext with Auth0Provider
 * - Add your credentials from Auth0 to a .env file (VITE_AUTH_DOMAIN, VITE_AUTH_CLIENT_ID)
 * - Set the domain, clientId, and authorizationParams
 */

if (!AUTH_DOMAIN || !AUTH_CLIENT_ID) {
  console.error('Auth0 configuration missing. Please add VITE_AUTH_DOMAIN and VITE_AUTH_CLIENT_ID to your .env file.');
}

createRoot(document.getElementById('root')).render(
    <Auth0Provider
      domain={AUTH_DOMAIN}
      clientId={AUTH_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <ProvideAppContext>
        <App />
      </ProvideAppContext>
    </Auth0Provider>
);
