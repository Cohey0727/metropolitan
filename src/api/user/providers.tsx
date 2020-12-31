import React, {createContext} from 'react';
import {usersData} from '../../samples';
import {AuthUser} from '../../types';

export const UsersContext = createContext<AuthUser[]>([]);

const UsersProvider: React.FC = ({children}) => {
  const users = usersData;
  return <UsersContext.Provider value={users}>{children}</UsersContext.Provider>;
};

export default UsersProvider;
