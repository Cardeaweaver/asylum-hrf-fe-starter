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

// Check if running on secure origin (localhost or https)
const isSecureOrigin = 
  window.location.hostname === 'localhost' || 
  window.location.hostname === '127.0.0.1' ||
  window.location.protocol === 'https:';

const shouldUseAuth0 = AUTH_DOMAIN && AUTH_CLIENT_ID && isSecureOrigin;

if (!AUTH_DOMAIN || !AUTH_CLIENT_ID) {
  console.warn('Auth0 configuration missing. Running without authentication.');
}

if (!isSecureOrigin) {
  console.warn('Not on secure origin. Auth0 disabled. Access via http://localhost for authentication.');
}

createRoot(document.getElementById('root')).render(
  shouldUseAuth0 ? (
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
  ) : (
    <ProvideAppContext>
      <App />
    </ProvideAppContext>
  )
);
