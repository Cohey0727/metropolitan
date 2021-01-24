import {Ticket} from '../../types';

const orderUnit = Math.pow(2, 16);

export function calcNewOrder(toListTickets: Ticket[], target: Ticket, newIndex: number) {
  const excludeSelfTickets = toListTickets.filter(
    (_ticket) => _ticket.ticketId !== target.ticketId
  );
  const isSameList = excludeSelfTickets.length !== toListTickets.length;
  const base = isSameList ? excludeSelfTickets : toListTickets;
  const count = base.length;
  if (count === 0) return orderUnit;

  const prevOrder = base[newIndex - 1]?.order || 0;
  const nextOrder = base[newIndex]?.order || base[count - 1].order + orderUnit;
  return (prevOrder + nextOrder) / 2.0;
}
