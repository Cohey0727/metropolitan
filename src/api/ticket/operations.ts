import {Ticket} from '../../types';
import {TICKET_API_URL, TICKET_WS_URL} from './constants';
import axios from 'axios';

export const getTickets = async (projectId: string) => {
  const url = `${TICKET_API_URL}/projects/${projectId}/tickets`;
  const res = await axios.get(url);
  return res.data as Ticket[];
};

export const createTicket = async (newTicket: Ticket) => {
  const url = `${TICKET_API_URL}/projects/${newTicket.projectId}/tickets`;
  const res = await axios.post(url, newTicket);
  return res.data as Ticket;
};

export const updateTicket = async (newTicket: Ticket) => {
  const url = `${TICKET_API_URL}/projects/${newTicket.projectId}/tickets/${newTicket.ticketId}`;
  const res = await axios.put(url, newTicket);
  return res.data as Ticket;
};

export const deleteTicket = async (newTicket: Ticket) => {
  const url = `${TICKET_API_URL}/projects/${newTicket.projectId}/tickets/${newTicket.ticketId}`;
  const res = await axios.delete(url);
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
