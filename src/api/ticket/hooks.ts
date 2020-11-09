import {useEffect, useState} from 'react';
import {Ticket} from '../../types';
import {connectProjectTickets} from './operations';

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
