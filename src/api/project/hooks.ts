import {useEffect, useState} from 'react';
import {Ticket} from '../../types';
import {connectBoardTickets} from './operations';

export const useTickets = (projectId: string) => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const disconnect = connectBoardTickets(projectId, (tickets) => {
      setTickets(tickets);
      setLoading(false);
    });
    return () => disconnect();
  }, [projectId]);

  return {tickets, loading};
};
