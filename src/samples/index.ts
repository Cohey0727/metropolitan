import users from './users.json';
import projects from './projects.json';
import {Project, Ticket, User} from '../types';

export const usersData = users as User[];
export const projectData = projects as Project[];
