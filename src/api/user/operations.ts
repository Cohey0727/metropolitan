import {REST_API_URL} from '../constants';
import axios from 'axios';
import {User} from '../../types';

export const getProjectUsers = async (projectId: string) => {
  const url = `${REST_API_URL}/projects/${projectId}/users`;
  const res = await axios.get(url);
  return res.data as User[];
};
