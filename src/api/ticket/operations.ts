import {ticketsData} from '../../samples';
import {Ticket} from '../../types';
import {replace} from '../../utils/array';
import {TICKET_API_URL, TICKET_WS_URL} from './constants';
import axios from 'axios';

const getLocalStorageKey = (projectId: string) =>
  `project:${projectId}/tickets`;

export const getTickets = async (projectId: string) => {
  const url = `${TICKET_API_URL}/projects/${projectId}/tickets`;
  const res = await axios.get(url);
  return res.data;
};

export const updateTicket = async (newTicket: Ticket) => {
  const url = `${TICKET_API_URL}/projects/${newTicket.projectId}/tickets/${newTicket.ticketId}`;
  const res = await axios.put(url, newTicket);
  return res.data;
};

export const connectProjectTickets = (
  projectId: string,
  callBack: (tickets: Ticket[]) => void
) => {
  const socket = new WebSocket(`${TICKET_WS_URL}?project_id=${projectId}`);
  socket.addEventListener('message', function (event) {
    callBack(JSON.parse(event.data));
  });
  getTickets(projectId).then((tickets) => {
    callBack(tickets);
  });
};
