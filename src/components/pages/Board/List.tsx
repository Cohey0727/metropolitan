import React from 'react';
import {Droppable, DroppableProvided, DroppableStateSnapshot} from 'react-beautiful-dnd';
import {Theme} from '@material-ui/core';
import {List, Ticket} from '../../../types';
import {Column, Paper, Row} from '../../atoms/containers';
import Card from './Card';
import {styled} from '@material-ui/styles';
import {useProjectContext} from '../../../api/project/hooks';

type Props = {
  tickets?: Ticket[];
  listId: List['listId'];
  index: number;
};

type StyleProps = {
  index: number;
};

const listColors = ['#9999ff', '#05aa9d', '#d5e524', '#deccff', '#76f7ea'];

const ListPaper = styled(Paper)<Theme, StyleProps>({
  borderTop: ({index}) => `4px solid ${listColors[index % listColors.length]}`,
});

const Title = styled(Row)<Theme, any>(({theme}) => ({
  ...theme.typography.h5,
}));

const ListComponent: React.FC<Props> = (props) => {
  const {listId, tickets = [], index} = props;
  const {getListById} = useProjectContext();
  const list = getListById(listId);
  return (
    <ListPaper
      padding={[1, 0, 0, 0]}
      margin={1}
      minWidth={'max(16vw, 216px)'}
      width={'min(32vw, 324px)'}
      display={'flex'}
      flexDirection={'column'}
      index={index}
    >
      <Title flex={'0 0 auto'} padding={[0, 1]}>
        {list.title}
      </Title>
      <Droppable droppableId={list.listId}>
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
          return (
            <Column
              ref={provided.innerRef}
              {...provided.droppableProps}
              padding={[0, 1]}
              flex={'1 1 auto'}
              height={'100%'}
              overflow={'scroll'}
            >
              {tickets.map((ticket, ticketIndex) => (
                <Card key={ticket.ticketId} ticket={ticket} index={ticketIndex} />
              ))}
              {provided.placeholder}
            </Column>
          );
        }}
      </Droppable>
    </ListPaper>
  );
};

export default ListComponent;
