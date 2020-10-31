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
import {Column, Paper, Row} from '../../atoms/containers';
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
  overflow: 'scroll',
});

const Title = styled(Row)<Theme, any>(({theme}) => ({
  ...theme.typography.h5,
}));

const ListComponent: React.FC<Props> = (props) => {
  const {list, tickets = [], index} = props;
  const theme = useTheme();
  return (
    <Container
      padding={[1, 1, 0, 1]}
      margin={1}
      width={320}
      display={'flex'}
      flexDirection={'column'}
      index={index}
    >
      <Title flex={'0 0 auto'}>{list.title}</Title>
      <Droppable droppableId={list.id}>
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <Column
            ref={provided.innerRef}
            {...provided.droppableProps}
            flex={'1 1 auto'}
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
