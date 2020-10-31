import React from 'react';

import {Ticket} from '../../../types';
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import {Column, Paper} from '../../atoms/containers';
import {styled} from '@material-ui/styles';

type Props = {
  ticket: Ticket;
  index: number;
};

const Container = styled(Paper)(() => ({}));

const grid = 8;

// Memoizing row items for even better performance!
const Card = ({ticket, index}: Props) => {
  // Faking some nice spacing around the items

  return (
    <Draggable draggableId={ticket.id} index={index} key={ticket.id}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          data-index={index}
          elevation={2}
          minHeight={120}
          maxHeight={240}
          margin={[1, 0]}
          padding={1}
        >
          {ticket.title}
          {/*<Avatar src={quote.author.avatarUrl} alt={quote.author.name} />*/}
          {/*{isClone ? <CloneBadge>Clone</CloneBadge> : null}*/}
          {/*<Content>*/}
          {/*  <BlockQuote>{quote.content}</BlockQuote>*/}
          {/*  <Footer>*/}
          {/*    <Author colors={quote.author.colors}>{quote.author.name}</Author>*/}
          {/*    <QuoteId>id:{quote.id}</QuoteId>*/}
          {/*  </Footer>*/}
          {/*</Content>*/}
        </Container>
      )}
    </Draggable>
  );
};

export default React.memo(Card);
