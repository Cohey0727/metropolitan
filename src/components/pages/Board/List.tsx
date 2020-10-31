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
import {styled} from '@material-ui/styles';

type Props = {
  tickets?: Ticket[];
  list: List;
  index: number;
};

type StyleProps = {
  index: number;
};

const listColors = ['#9999ff', '#05aa9d', '#d5e524', '#deccff', '#76f7ea'];

const Container = styled(Paper)<Theme, StyleProps>({
  borderTop: ({index}) => `4px solid ${listColors[index % listColors.length]}`,
});

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
    <Container padding={1} margin={1} width={320} index={index}>
      <h2>{list.title}</h2>
      <Droppable droppableId={list.id}>
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <Column
            ref={provided.innerRef}
            {...provided.droppableProps}
            height={'100%'}
          >
            {tickets.map((ticket, ticketIndex) => (
              <Card ticket={ticket} index={ticketIndex} />
            ))}
            {provided.placeholder}
          </Column>
        )}
      </Droppable>
    </Container>
  );
};

export default ListComponent;
