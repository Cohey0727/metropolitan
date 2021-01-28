import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 32,
    height: 32,
    margin: theme.spacing(0, 1),
  },
}));

const TicketCard = (props: Props) => {
  const {ticket, index} = props;
  const classes = useStyles();
  const user = useGetUser(ticket.author);
  const list = useGetList(ticket.currentPosition.list);
  return (
    <Draggable draggableId={ticket.ticketId} index={index} key={ticket.ticketId}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Paper
            padding={0.5}
            display='flex'
            alignItems='center'
            elevation={2}
            square={true}
            variant='outlined'
          >
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
                    className={classes.avatar}
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
