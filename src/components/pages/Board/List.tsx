import React from 'react';
import {FixedSizeList} from 'react-window';
import {
  DraggableProvided,
  DraggableRubric,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import useTheme from '@material-ui/core/styles/useTheme';
import {Theme} from '@material-ui/core';
import {List, Ticket} from '../../../types';
import TicketCard from './TicketCard';

type Props = {
  tickets: Ticket[];
  list: List;
};

export const getBackgroundColor = (
  theme: Theme,
  isDraggingOver: boolean,
  isDraggingFrom: boolean
): string => {
  if (isDraggingOver) {
    return theme.palette.info.dark;
  }
  if (isDraggingFrom) {
    return theme.palette.info.light;
  }
  return theme.palette.info.main;
};

const ListComponent: React.FC<Props> = (props) => {
  const {list, tickets} = props;
  const theme = useTheme();
  return (
    <div>
      <h2>{list.title}</h2>
      <Droppable
        droppableId={list.id}
        mode='virtual'
        renderClone={(
          provided: DraggableProvided,
          snapshot: DraggableStateSnapshot,
          rubric: DraggableRubric
        ) => <div>Hello</div>}
      >
        {(
          droppableProvided: DroppableProvided,
          snapshot: DroppableStateSnapshot
        ) => {
          // Add an extra item to our list to make space for a dragging item
          // Usually the DroppableProvided.placeholder does this, but that won't
          // work in a virtual list
          const itemCount: number = snapshot.isUsingPlaceholder
            ? tickets.length + 1
            : tickets.length;

          return (
            <FixedSizeList
              height={500}
              itemCount={itemCount}
              itemSize={110}
              width={300}
              outerRef={droppableProvided.innerRef}
              style={{
                backgroundColor: getBackgroundColor(
                  theme,
                  snapshot.isDraggingOver,
                  Boolean(snapshot.draggingFromThisWith)
                ),
                transition: 'background-color 0.2s ease',
                padding: theme.spacing(1),
              }}
              itemData={tickets}
            >
              {TicketCard}
            </FixedSizeList>
          );
        }}
      </Droppable>
    </div>
  );
};

export default ListComponent;
