import tickets from './tickets.json';
import users from './users.json';
import board from './board.json';
import {Board, Ticket, User} from '../types';

export const ticketsData = tickets as Ticket[];
export const boardData = board as Board;
export const usersData = users as User[];
