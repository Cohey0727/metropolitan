import {REST_API_URL} from '../constants';
import axios from 'axios';
import {User} from '../../types';

export const getProjectUsers = async (projectId: string) => {
  const url = `${REST_API_URL}/projects/${projectId}/users`;
  const res = await axios.get(url);
  return res.data as User[];
};

export const addProjectUser = async (projectId: string, userId: string) => {
  const url = `${REST_API_URL}/projects/${projectId}/users`;
  return await axios.post(url, {user_id: userId});
};

export const removeProjectUser = async (projectId: string, userId: string) => {
  const url = `${REST_API_URL}/projects/${projectId}/users/${userId}`;
  return await axios.delete(url);
};

export const searchUsers = async (email: string) => {
  const url = `${REST_API_URL}/users/search?email=${email}`;
  const res = await axios.get(url);
  return res.data as User[];
};
