import {ticketsData} from '../../samples';
import {Ticket} from '../../types';
import {replace} from '../../utils/array';
import {TICKET_API_URL, TICKET_WS_URL} from './constants';
import axios from 'axios';

const getLocalStorageKey = (projectId: string) =>
  `project:${projectId}/tickets`;

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export const getTickets = async (projectId: string) => {
  const url = `${TICKET_API_URL}/projects/${projectId}/tickets`;
  console.debug({projectId, url});
  const res = await axios.get(url);
  console.debug({res});
  const localData = localStorage.getItem(getLocalStorageKey(projectId));
  return localData ? (JSON.parse(localData) as Ticket[]) : ticketsData;
};

export const updateTicket = async (newTicket: Ticket) => {
  const tickets = await getTickets(newTicket.projectId);
  replace(tickets, newTicket, {ticketId: newTicket.ticketId});
  /**
   * @TODO change localStorage → api
   **/
  localStorage.setItem(
    getLocalStorageKey(newTicket.projectId),
    JSON.stringify(tickets)
  );
};

export const connectProjectTickets = (
  projectId: string,
  callBack: (tickets: Ticket[]) => void
) => {
  /**
   * @TODO change listen localStorage → web socket
   **/
  const socket = new WebSocket(`${TICKET_WS_URL}?project_id=${projectId}`);
  socket.addEventListener('message', function (event) {
    callBack(JSON.parse(event.data));
  });

  getTickets(projectId).then((tickets) => {
    callBack(tickets);
  });

  return socket.close;
};
