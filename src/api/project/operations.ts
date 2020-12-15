import axios from 'axios';
import {REST_API_URL} from '../constants';
import {Project} from '../../types';

const baseUrl = `${REST_API_URL}/projects`;

export const getProject = async (projectId: string) => {
  const res = await axios.get(`${baseUrl}/${projectId}`);
  return res.data as Project;
};

export const getProjects = async (userId: string) => {
  const params = {user_id: userId};
  const res = await axios.get(baseUrl, {params});
  return res.data as Project[];
};

export const createProject = async (values: any) => {
  const res = await axios.post(baseUrl, values);
  return res.data as Project;
};
