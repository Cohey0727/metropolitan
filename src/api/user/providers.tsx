import React, {createContext} from 'react';
import {usersData} from '../../samples';
import {User} from '../../types';

export const UsersContext = createContext<User[]>([]);

const UsersProvider: React.FC = ({children}) => {
  const users = usersData;
  return (
    <UsersContext.Provider value={users}>{children}</UsersContext.Provider>
  );
};

export default UsersProvider;
