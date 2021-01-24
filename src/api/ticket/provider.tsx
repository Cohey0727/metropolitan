import React, {createContext, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import _ from 'lodash';

import {useRouteMatch} from 'react-router-dom';
import {ProjectPathParams} from '../../components/templates/ProjectLayout/ProjectLayout';
import {List, Ticket} from '../../types';
import {connectProjectTickets, updateTicket} from './operations';
import {Spinner} from '../../components/atoms/spinners';
import {keyListBy, replace} from '../../utils/array';
import {Optional} from '../../types/util';
import {calcNewOrder} from './utils';
import useBeforeEffect from '../../utils/hooks/useBeforeEffect';

type TicketsContextValue = {
  tickets: Ticket[];
  onMoveTicketStart: () => void;
  moveTicket: (ticketId: Ticket['ticketId'], toListId: List['listId'], toIndex: number) => void;
  getTicketsByBoard: (boardId: string) => Ticket[];
  getTicketsByList: (listId: string) => Ticket[];
  getTicketById: (ticket: string) => Optional<Ticket>;
};

export const TicketContext = createContext<TicketsContextValue>({} as any);

type Props = {};

type TicketRef = {
  allTickets: Ticket[];
  idTicket: Record<string, Ticket>;
  boardTickets: Record<string, Ticket[]>;
  listTickets: Record<string, Ticket[]>;
};

export const TicketProvider: React.FC<Props> = (props) => {
  const {children} = props;
  const match = useRouteMatch<ProjectPathParams>();
  const {projectId} = match.params;
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const clientPriority = useRef(false);

  useEffect(() => {
    setLoading(true);
    connectProjectTickets(projectId, (tickets) => {
      if (!clientPriority.current) {
        setTickets(tickets);
        setLoading(false);
      }
    });
  }, [projectId]);

  const ticketRefs = useRef<TicketRef>({
    allTickets: [],
    idTicket: {},
    boardTickets: {},
    listTickets: {},
  });

  useBeforeEffect(() => {
    const idTicket = _.keyBy(tickets, (ticket) => ticket.ticketId);
    const boardTickets = keyListBy(tickets, (ticket) => _.get(ticket, 'currentPosition.board'));
    const listTickets = keyListBy(tickets, (ticket) => _.get(ticket, 'currentPosition.list'));
    ticketRefs.current.allTickets = tickets;
    ticketRefs.current.idTicket = idTicket;
    ticketRefs.current.boardTickets = boardTickets;
    ticketRefs.current.listTickets = listTickets;
  }, [tickets]);

  const moveTicket = useCallback(
    (ticketId: Ticket['ticketId'], toListId: List['listId'], toIndex: number) => {
      clientPriority.current = true;
      setTimeout(() => (clientPriority.current = false), 1000);
      const ticket = ticketRefs.current.idTicket[ticketId];
      const toListTickests = ticketRefs.current.listTickets[toListId] || [];
      const allTickets = ticketRefs.current.allTickets;
      const order = calcNewOrder(toListTickests, ticket, toIndex);
      const newTicket = {
        ...ticket,
        order,
        currentPosition: {...ticket.currentPosition, list: toListId},
      };
      const newTickets = replace(allTickets, newTicket, 'ticketId');
      setTickets(newTickets);
      updateTicket(newTicket);
    },
    []
  );

  const contextFunctions: Omit<TicketsContextValue, 'tickets' | 'moveTicket'> = useMemo(() => {
    return {
      onMoveTicketStart: () => (clientPriority.current = true),
      getTicketById: (ticketId) => ticketRefs.current.idTicket[ticketId],
      getTicketsByBoard: (boardId) => ticketRefs.current.boardTickets[boardId] || [],
      getTicketsByList: (listId) => ticketRefs.current.listTickets[listId] || [],
    };
  }, []);

  const contextValue = useMemo(() => ({...contextFunctions, moveTicket, tickets}), [tickets]);

  if (loading) return <Spinner />;
  return <TicketContext.Provider value={contextValue}>{children}</TicketContext.Provider>;
};
