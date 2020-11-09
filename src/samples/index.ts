import tickets from './tickets.json';
import users from './users.json';
import projects from './projects.json';
import {Project, Ticket, User} from '../types';

export const ticketsData = tickets as Ticket[];
export const usersData = users as User[];
export const projectData = projects as Project[];
