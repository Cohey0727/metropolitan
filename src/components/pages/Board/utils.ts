import {Ticket} from '../../../types';

const orderUnit = 65536;
export function calcNewOrder(
  originalList: Ticket[],
  target: Ticket,
  newIndex: number
) {
  const excludeSelfTickets = originalList.filter(
    (_ticket) => _ticket.id !== target.id
  );
  const isSameList = excludeSelfTickets.length !== originalList.length;
  const base = isSameList ? excludeSelfTickets : originalList;
  const count = base.length;
  if (count === 0) return orderUnit;

  const preOrder = base[newIndex - 1]?.order || 0;
  const nextOrder = base[newIndex]?.order || base[count - 1].order + orderUnit;
  return (preOrder + nextOrder) / 2.0;
}
