import {useContext} from 'react';
import {UsersContext} from './providers';
import {useAuth0} from '@auth0/auth0-react';
import {AuthUser} from '../../types';

export const useUsersContext = () => useContext(UsersContext);

export const useCurrentUser = () => {
  const {user} = useAuth0();
  return user as AuthUser;
};
