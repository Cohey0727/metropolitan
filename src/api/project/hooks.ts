import {useContext} from 'react';
import {ProjectContext} from './providers';

export const useProjectContext = () => useContext(ProjectContext);
