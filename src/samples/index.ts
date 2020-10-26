import tickets from './tickets.json';
import board from './board.json';
import {Board, Ticket} from '../types';

export const ticketsData = tickets as Ticket[];
export const boardData = board as Board;
