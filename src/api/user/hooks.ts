import {useContext} from 'react';
import {UsersContext} from './providers';

export const useUsers = () => useContext(UsersContext);
