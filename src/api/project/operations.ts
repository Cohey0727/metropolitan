import {ticketsData} from '../../samples';
import {Ticket} from '../../types';

const getLocalStorageKey = (projectId: string) =>
  `project:${projectId}/tickets`;

export const getTickets = async (projectId: string) => {
  /**
   * @TODO change localStorage → api
   **/
  const localData = localStorage.getItem(getLocalStorageKey(projectId));
  return localData ? (JSON.parse(localData) as Ticket[]) : ticketsData;
};


export const connectBoardTickets = (
  projectId: string,
  callBack: (tickets: Ticket[]) => void
) => {
  /**
   * @TODO change listen localStorage → web socket
   **/
  const originalSetItem = window.localStorage.setItem.bind(window.localStorage);
  window.localStorage.setItem = function (key, value) {
    callBack(JSON.parse(value));
    originalSetItem(key, value);
  };
  getTickets(projectId).then((tickets) => {
    callBack(tickets);
  });
  function disconnect() {
    window.localStorage.setItem = originalSetItem;
  }
  return disconnect;
};
