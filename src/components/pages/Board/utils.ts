import {Ticket} from '../../../types';

const orderUnit = 65536;
export function calcNewOrder(
  originalTickets: Ticket[],
  target: Ticket,
  newIndex: number
) {
  const excludeSelfTickets = originalTickets.filter(
    (_ticket) => _ticket.id !== target.id
  );
  if (excludeSelfTickets.length === 0) {
    return orderUnit;
  } else if (newIndex <= 0) {
    return excludeSelfTickets[0].order / 2.0;
  } else if (newIndex >= originalTickets.length - 1) {
    return originalTickets[excludeSelfTickets.length - 1].order + orderUnit;
  } else {
    return (
      (excludeSelfTickets[newIndex - 1].order +
        excludeSelfTickets[newIndex].order) /
      2.0
    );
  }
}
