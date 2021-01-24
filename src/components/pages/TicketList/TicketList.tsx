import React, {useCallback} from 'react';
import {DragDropContext, DraggableLocation, DropResult} from 'react-beautiful-dnd';
import {useProjectContext} from '../../../api/project/hooks';
import {useProjectTicket} from '../../../api/ticket/hooks';
import {Column} from '../../atoms/containers';
import BoardTicketList from './BoardTicketList';

const TicketList = () => {
  const {project} = useProjectContext();
  const {moveTicket, onMoveTicketStart} = useProjectTicket();
  const {getBoardById} = useProjectContext();

  const hanldeDragEnd = useCallback(async (result: DropResult) => {
    if (!result.destination) return;
    const source: DraggableLocation = result.source;
    const destination: DraggableLocation = result.destination;
    if (source.droppableId === destination.droppableId && source.index === destination.index)
      return;

    const board = getBoardById(destination.droppableId);
    moveTicket(
      result.draggableId,
      destination.droppableId,
      board.lists[0].listId,
      destination.index,
      'board'
    );
  }, []);

  return (
    <DragDropContext onDragEnd={hanldeDragEnd} onDragStart={onMoveTicketStart}>
      <Column width={'100%'} overflow={'auto'} padding={[1, 1, 12]}>
        {project.boards.map((board) => (
          <BoardTicketList board={board} />
        ))}
      </Column>
    </DragDropContext>
  );
};

export default TicketList;
