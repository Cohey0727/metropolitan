import {useContext} from 'react';
import {ProjectContext} from './providers';

export const useProjectContext = () => useContext(ProjectContext);

export const useGetList = (listId: string) => {
  const {getListById} = useProjectContext();
  return getListById(listId);
};
