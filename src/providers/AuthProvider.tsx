import React from 'react';
import {Auth0Provider, useAuth0} from '@auth0/auth0-react';
import {useAsync} from 'react-use';
import {Spinner} from '../components/atoms/spinner';

const AuthProvider: React.FC = ({children}) => {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID as string}
      useRefreshTokens={true}
      redirectUri={window.location.origin}
      cacheLocation={'localstorage'}
    >
      <Auth0Authentication>{children}</Auth0Authentication>
    </Auth0Provider>
  );
};

export default AuthProvider;

const Auth0Authentication: React.FC = ({children}) => {
  const {isAuthenticated, loginWithRedirect, isLoading} = useAuth0();

  useAsync(async () => {
    if (!isLoading && !isAuthenticated) await loginWithRedirect();
  }, [isLoading, isAuthenticated]);

  if (isLoading) return <Spinner />;
  return <>{isAuthenticated && children}</>;
};
