import React, {useMemo, useState} from 'react';
import {
  DragDropContext,
  DraggableLocation,
  DropResult,
} from 'react-beautiful-dnd';
import {ticketsData, boardData} from '../../../samples';
import List from './List';
import {Ticket} from '../../../types';
import {Row} from '../../atoms/containers';

const Board: React.FC = () => {
  const [tickets, setTickets] = useState(ticketsData);
  const ticketsByList = useMemo(
    () =>
      tickets.reduce((acc: {[key: string]: Ticket[]}, ticket) => {
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

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Row>
        {board.lists.map((list) => (
          <List list={list} tickets={ticketsByList[list.id]} />
        ))}
      </Row>
    </DragDropContext>
  );
};

export default Board;
