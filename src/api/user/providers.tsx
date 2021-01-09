import React, {createContext, useMemo} from 'react';
import _ from 'lodash';
import {useRouteMatch} from 'react-router-dom';
import {useAsync} from 'react-use';
import {ProjectPathParams} from '../../components/templates/ProjectLayout/ProjectLayout';
import {User} from '../../types';
import useTtlLocalStrage from '../../utils/hooks/useTtlLocalStrage';
import {addProjectUser, getProjectUsers, removeProjectUser} from './operations';

type UsersContextValue = {
  users: User[];
  addUser: (user: User) => void;
  removeUser: (user: User) => void;
  getUserById: (userId: string) => undefined | User;
};

export const UsersContext = createContext<UsersContextValue>({} as any);
const ttl = 1000 * 60 * 10;

type Props = {};

export const ProjectUsersProvider: React.FC<Props> = (props) => {
  const {children} = props;
  const match = useRouteMatch<ProjectPathParams>();
  const {projectId} = match.params;

  const [users, setUsers] = useTtlLocalStrage<User[]>('projectUsers', ttl, []);

  useAsync(async () => {
    const users = await getProjectUsers(projectId);
    setUsers(users);
  }, [projectId]);

  const contextValue: UsersContextValue = useMemo(() => {
    const valueUsers = users || [];
    const userMap = _.keyBy(valueUsers, 'user_id');
    return {
      users: valueUsers,
      getUserById: (userId: string) => userMap[userId],
      addUser: (user: User) => {
        addProjectUser(projectId, user.user_id);
        setUsers([...valueUsers, user]);
      },
      removeUser: (user: User) => {
        removeProjectUser(projectId, user.user_id);
        setUsers(valueUsers.filter((_user) => _user !== user));
      },
    };
  }, [users, projectId, setUsers]);

  return <UsersContext.Provider value={contextValue}>{children}</UsersContext.Provider>;
};
