import React from 'react';

import {Ticket} from '../../../types';
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import {areEqual} from 'react-window';
import {Column} from '../../atoms/containers';

type RowProps = {
  data: Ticket[];
  index: number;
  style: any;
};

const grid = 8;

// Memoizing row items for even better performance!
const TicketCard = ({data: quotes, index, style}: RowProps) => {
  const ticket: Ticket = quotes[index];

  // We are rendering an extra item for the placeholder
  // Do do this we increased our data set size to include one 'fake' item
  if (!ticket) {
    return null;
  }

  // Faking some nice spacing around the items
  const patchedStyle = {
    ...style,
    left: style.left + grid,
    top: style.top + grid,
    width: `calc(${style.width} - ${grid * 2}px)`,
    height: style.height - grid,
  };

  return (
    <Draggable draggableId={ticket.id} index={index} key={ticket.id}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Column
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          data-index={index}
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
        </Column>
      )}
    </Draggable>
  );
};

export default React.memo(TicketCard);
