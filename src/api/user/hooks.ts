import {useContext} from 'react';
import {ProjectUsersContext} from './providers';
import {useAuth0} from '@auth0/auth0-react';
import {AuthUser, User} from '../../types';
import {Optional} from '../../types/util';

export const useProjectUsers = () => useContext(ProjectUsersContext);

export const useCurrentUser = () => {
  const {user} = useAuth0();
  return user as AuthUser;
};

export const useGetUser = (userId: string): Optional<User> => {
  const {getUserById} = useProjectUsers();
  return getUserById(userId);
};
