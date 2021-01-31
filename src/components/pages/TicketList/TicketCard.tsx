import React from 'react';
import {css} from '@emotion/css';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Draggable, DraggableProvided, DraggableStateSnapshot} from 'react-beautiful-dnd';
import {useGetList} from '../../../api/project/hooks';
import {useGetUser} from '../../../api/user/hooks';
import {Ticket} from '../../../types';
import {Column, Paper, Row} from '../../atoms/containers';

type Props = {
  ticket: Ticket;
  index: number;
};

const avatar = css`
  width: 32px !important;
  height: 32px !important;
  margin: 0 8px;
`;

const paper = css`
  padding: 4px;
  display: flex;
  align-items: center;
`;

const TicketCard = (props: Props) => {
  const {ticket, index} = props;
  const user = useGetUser(ticket.author);
  const list = useGetList(ticket.currentPosition.list);
  return (
    <Draggable draggableId={ticket.ticketId} index={index} key={ticket.ticketId}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Paper className={paper} elevation={2} square={true} variant='outlined'>
            <MoreVertIcon />
            <Row alignItems={'center'} padding={2}>
              <Column width={140} padding={[0, 0.5]}>
                {ticket.title}
              </Column>
              <Column width={140} padding={[0, 0.5]}>
                <Row alignItems={'center'}>
                  <Avatar
                    src={user?.picture}
                    alt={user?.name || ticket.author}
                    classes={{root: avatar}}
                  />
                  {user?.name}
                </Row>
              </Column>
              <Column width={120} padding={[0, 0.5]}>
                {list?.title}
              </Column>
            </Row>
          </Paper>
        </div>
      )}
    </Draggable>
  );
};

export default TicketCard;
