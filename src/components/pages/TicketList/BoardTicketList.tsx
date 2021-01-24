import React from 'react';
import {Droppable, DroppableProvided, DroppableStateSnapshot} from 'react-beautiful-dnd';
import {useTicketsByBoard} from '../../../api/ticket/hooks';
import {Board} from '../../../types';
import {Column, Container} from '../../atoms/containers';
import TicketCard from './TicketCard';

type Props = {
  board: Board;
};

const BoardTicketList = (props: Props) => {
  const {board} = props;
  const tickets = useTicketsByBoard(board.boardId);
  return (
    <Container padding={[1, 2]} height={'auto'}>
      <h3>{board.title}</h3>
      <Droppable droppableId={board.boardId}>
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
          return (
            <Column ref={provided.innerRef} {...provided.droppableProps} flex={'1 1 auto'}>
              {tickets.map((ticket, ticketIndex) => (
                <TicketCard ticket={ticket} index={ticketIndex} />
              ))}
              {provided.placeholder}
            </Column>
          );
        }}
      </Droppable>
    </Container>
  );
};

export default BoardTicketList;
