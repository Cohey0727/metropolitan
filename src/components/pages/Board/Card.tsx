import React, {useMemo} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';

import {Ticket} from '../../../types';
import {Column, Paper, Row} from '../../atoms/containers';
import {useUsers} from '../../../api/user/hooks';

type Props = {
  ticket: Ticket;
  index: number;
};

const useStyles = makeStyles(() => ({
  avatar: {
    width: 32,
    height: 32,
  },
}));

const Container = React.forwardRef(
  (props: React.ComponentProps<typeof Paper>, ref) => (
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
    >
      {props.children}
    </Paper>
  )
);

const Header = React.forwardRef(
  (props: React.ComponentProps<typeof Row>, ref) => (
    <Row {...props} flex={'0 0 auto'} fontSize={1.25}>
      {props.children}
    </Row>
  )
);

const Body = React.forwardRef(
  (props: React.ComponentProps<typeof Row>, ref) => {
    const {palette} = useTheme();
    return (
      <Row {...props} flex={'1 1 0'} padding={[0.5, 0]} color={palette.grey.A700}>
        {props.children}
      </Row>
    );
  }
);

const Footer = React.forwardRef(
  (props: React.ComponentProps<typeof Row>, ref) => (
    <Row {...props} flex={'0 0 auto'}>
      {props.children}
    </Row>
  )
);

const Card = ({ticket, index}: Props) => {
  const users = useUsers();
  const classes = useStyles();
  const user = useMemo(
    () => users.find((_user) => _user.sub === ticket.author),
    [users]
  );

  return (
    <Draggable draggableId={ticket.id} index={index} key={ticket.id}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Header>{ticket.title}</Header>
          <Body>{ticket.description}</Body>
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
