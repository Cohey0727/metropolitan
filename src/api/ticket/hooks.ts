import {useContext, useEffect, useState} from 'react';
import {Ticket} from '../../types';
import {connectProjectTickets} from './operations';
import {TicketContext} from './provider';

export const useTickets = (projectId: string) => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    connectProjectTickets(projectId, (tickets) => {
      setTickets(tickets);
      setLoading(false);
    });
    return () => {};
  }, [projectId]);

  return {tickets, loading};
};

export const useProjectTicket = () => useContext(TicketContext);

export const useTicketsByList = (listId: string) => {
  const {getTicketsByList} = useContext(TicketContext);
  return getTicketsByList(listId);
};
