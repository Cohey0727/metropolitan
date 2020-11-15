import {useContext} from 'react';
import {UsersContext} from './providers';
import {useAuth0} from '@auth0/auth0-react';
import {User} from '../../types';

export const useUsers = () => useContext(UsersContext);

export const useCurrentUser = () => {
  const {user} = useAuth0();
  return user as User;
};
