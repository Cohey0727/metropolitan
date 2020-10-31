import React from 'react';
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
import {Column, Paper} from '../../atoms/containers';
import Card from './Card';

type Props = {
  tickets?: Ticket[];
  list: List;
  index: number;
};

const listColors = [];

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
  const {list, tickets = [], index} = props;
  const theme = useTheme();
  return (
    <Paper padding={1} margin={1} width={320}>
      <h2>{list.title}</h2>
      <Droppable droppableId={list.id} mode='virtual'>
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <Column ref={provided.innerRef} {...provided.droppableProps}>
            {tickets.map((ticket, ticketIndex) => (
              <Card ticket={ticket} index={ticketIndex} />
            ))}
          </Column>
        )}
      </Droppable>
    </Paper>
  );
};

export default ListComponent;
