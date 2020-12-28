import React, {useState} from 'react';
import axios from 'axios';
import {Auth0Provider, useAuth0} from '@auth0/auth0-react';
import {useAsync} from 'react-use';
import {Spinner} from '../components/atoms/spinner';
import useOnlyOnce from '../utils/hooks/useOnlyOnce';

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
  const {isAuthenticated, loginWithRedirect, isLoading, getIdTokenClaims} = useAuth0();
  const [innerLoading, setInnerLoading] = useState(true);

  useAsync(async () => {
    if (!isLoading && !isAuthenticated) await loginWithRedirect();
  }, [isLoading, isAuthenticated]);

  useOnlyOnce(async () => {
    const idToken = await getIdTokenClaims();
    axios.defaults.headers.common['Authorization'] = `Bearer ${idToken.__raw}`;
    // axios.defaults.headers.common['Cache-Control'] = `no-cache`;
    setInnerLoading(false);
  }, isAuthenticated);

  if (isLoading || innerLoading) return <Spinner />;
  return <>{isAuthenticated && children}</>;
};
