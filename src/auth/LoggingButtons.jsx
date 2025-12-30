import { useAuth0 } from '@auth0/auth0-react';

/**
 * Login/Logout button component that uses Auth0 authentication
 */
export const LoggingButtons = () => {
  const auth0 = useAuth0();
  
  // Handle case when Auth0 is not initialized (e.g., not on localhost)
  if (!auth0 || typeof auth0.isAuthenticated === 'undefined') {
    return (
      <button className='nav-btn px-4 py-1 opacity-50 cursor-not-allowed' disabled>
        Auth0 Unavailable
      </button>
    );
  }

  const { isAuthenticated, loginWithRedirect, logout } = auth0;
  const buttonText = isAuthenticated ? 'Log Out' : 'Log In';

  const handleLogging = async () => {
    if (isAuthenticated) {
      // Logout functionality
      logout({ logoutParams: { returnTo: window.location.origin } });
    } else {
      // Redirect to Auth0 login
      loginWithRedirect();
    }
  };

  return (
    <button className='nav-btn  px-4 py-1' onClick={handleLogging}>
      {buttonText}
    </button>
  );
};