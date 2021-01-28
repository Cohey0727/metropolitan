import React, {useCallback} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {Draggable, DraggableProvided, DraggableStateSnapshot} from 'react-beautiful-dnd';

import {Ticket} from '../../../types';
import {Paper, Row} from '../../atoms/containers';
import {useProjectUsers} from '../../../api/user/hooks';
import {useModal} from '../../../providers/ModalProvider';
import TicketDialog from '../../organisms/ticket/TicketDialog';

const useStyles = makeStyles(() => ({
  avatar: {
    width: 32,
    height: 32,
  },
}));

const Container = React.forwardRef((props: React.ComponentProps<typeof Paper>, ref) => (
  <Paper
    ref={ref}
    elevation={4}
    minHeight={120}
    maxHeight={240}
    margin={[1, 0]}
    padding={1}
    display={'flex'}
    flexDirection={'column'}
    {...props}
    style={{cursor: 'pointer', ...props?.style}}
  >
    {props.children}
  </Paper>
));

const Header = React.forwardRef((props: React.ComponentProps<typeof Row>, ref) => (
  <Row {...props} flex={'0 0 auto'} fontSize={1.25}>
    {props.children}
  </Row>
));

const Body = React.forwardRef((props: React.ComponentProps<typeof Row>, ref) => {
  const {palette} = useTheme();
  return (
    <Row {...props} flex={'1 1 0'} padding={[0.5, 0]} color={palette.grey.A700}>
      {props.children}
    </Row>
  );
});

const Footer = React.forwardRef((props: React.ComponentProps<typeof Row>, ref) => (
  <Row {...props} flex={'0 0 auto'} justifyContent={'flex-end'}>
    {props.children}
  </Row>
));

type Props = {
  ticket: Ticket;
  index: number;
};

const Card = ({ticket, index}: Props) => {
  const {getUserById} = useProjectUsers();
  const classes = useStyles();
  const user = getUserById(ticket.author);
  const openDialog = useModal(TicketDialog);

  const hadnleClick = useCallback(() => {
    openDialog({ticket});
  }, [ticket, openDialog]);

  return (
    <Draggable draggableId={ticket.ticketId} index={index} key={ticket.ticketId}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={hadnleClick}
        >
          <Header>{ticket.title}</Header>
          <Body></Body>
          <Footer>
            <Avatar
              src={user?.picture}
              alt={user?.name || ticket.author}
              className={classes.avatar}
            />
          </Footer>
        </Container>
      )}
    </Draggable>
  );
};

export default React.memo(Card);
