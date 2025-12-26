import { useAuth0 } from '@auth0/auth0-react';

/**
 * Login/Logout button component that uses Auth0 authentication
 */
export const LoggingButtons = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

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