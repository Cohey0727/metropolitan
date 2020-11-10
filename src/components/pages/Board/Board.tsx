import React, {useEffect, useMemo, useState} from 'react';
import {
  DragDropContext,
  DraggableLocation,
  DropResult,
} from 'react-beautiful-dnd';
import {projectData} from '../../../samples';
import List from './List';
import {Ticket} from '../../../types';
import {Row} from '../../atoms/containers';
import {useTickets} from '../../../api/ticket/hooks';
import {Spinner} from '../../atoms/spinner';
import {updateTicket} from '../../../api/ticket/operations';
import {calcNewOrder} from './utils';
import {inject} from '../../../utils/array';

const Board: React.FC = () => {
  const project = projectData[0];
  const board = project.boards[0];
  const {tickets, loading} = useTickets(project.projectId);
  const [localTickets, setLocalTickets] = useState(tickets);

  useEffect(() => {
    setLocalTickets(tickets);
  }, [tickets]);

  const ticketsByList = useMemo(
    () =>
      localTickets!.reduce((acc: {[key: string]: Ticket[]}, ticket) => {
        const listId = ticket.currentPosition.list;
        if (acc[listId] === undefined) {
          acc[listId] = [ticket];
          return acc;
        }
        inject(acc[listId], ticket, (_ticket) => _ticket.order > ticket.order);
        return acc;
      }, {} as {[key: string]: Ticket[]}),
    [localTickets]
  );

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const source: DraggableLocation = result.source;
    const destination: DraggableLocation = result.destination;
    const ticket = tickets!.find(
      (_ticket) => _ticket.ticketId === result.draggableId
    );
    const listTickets = ticketsByList[destination.droppableId] || [];
    if (
      (source.droppableId === destination.droppableId &&
        source.index === destination.index) ||
      !ticket
    )
      return;

    ticket.currentPosition.list = destination.droppableId;
    ticket.order = calcNewOrder(listTickets, ticket, destination.index);
    setLocalTickets([...localTickets]);
    await updateTicket(ticket);
  };

  if (loading) return <Spinner />;
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Row padding={[0, 2]} height={'100%'}>
        {board.lists.map((list, index) => (
          <List
            key={list.id}
            list={list}
            index={index}
            tickets={ticketsByList[list.id]}
          />
        ))}
      </Row>
    </DragDropContext>
  );
};

export default Board;
