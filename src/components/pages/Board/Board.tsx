import React, {useMemo} from 'react';
import {
  DragDropContext,
  DraggableLocation,
  DropResult,
} from 'react-beautiful-dnd';
import {boardData} from '../../../samples';
import List from './List';
import {Ticket} from '../../../types';
import {Row} from '../../atoms/containers';
import {useTickets} from '../../../api/ticket/hooks';
import {Spinner} from '../../atoms/spinner';
import {updateTicket} from '../../../api/ticket/operations';

const Board: React.FC = () => {
  const {tickets, loading} = useTickets('projectId');
  const ticketsByList = useMemo(
    () =>
      tickets!.reduce((acc: {[key: string]: Ticket[]}, ticket) => {
        const listId = ticket.currentPosition.list;
        acc[listId] = acc[listId] ? [...acc[listId], ticket] : [ticket];
        return acc;
      }, {} as {[key: string]: Ticket[]}),
    [tickets]
  );
  const board = boardData;

  function onDragEnd(result: DropResult) {
    if (!result.destination) return;
    const source: DraggableLocation = result.source;
    const destination: DraggableLocation = result.destination;
    const ticket = tickets!.find(
      (_ticket) => _ticket.id === result.draggableId
    );

    if (
      (source.droppableId === destination.droppableId &&
        source.index === destination.index) ||
      !ticket
    )
      return;

    ticket.currentPosition.list = destination.droppableId;
    updateTicket(ticket);
  }

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
