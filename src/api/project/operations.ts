import axios from 'axios';
import {REST_API_URL} from '../ticket/constants';
import {Project} from '../../types';

export const getProjects = async (userId: string) => {
  const url = `${REST_API_URL}/projects`;
  console.debug({
    url,
    REST_API_URL,
    userId,
  });
  const params = {user_id: userId};
  const res = await axios.get(url, {params});
  return res.data as Project[];
};
