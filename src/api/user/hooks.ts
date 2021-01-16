import {useContext} from 'react';
import {ProjectUsersContext} from './providers';
import {useAuth0} from '@auth0/auth0-react';
import {AuthUser} from '../../types';

export const useProjectUsers = () => useContext(ProjectUsersContext);

export const useCurrentUser = () => {
  const {user} = useAuth0();
  return user as AuthUser;
};
