import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  DragDropContext,
  DraggableLocation,
  DropResult,
} from 'react-beautiful-dnd';
import List from './List';
import {Project, Ticket} from '../../../types';
import {Container, Row} from '../../atoms/containers';
import {useTickets} from '../../../api/ticket/hooks';
import {Spinner} from '../../atoms/spinner';
import {updateTicket} from '../../../api/ticket/operations';
import {calcNewOrder} from './utils';
import {inject} from '../../../utils/array';
import {useModal} from '../../../providers/ModalProvider';
import NewTicketDialog from '../../organisms/ticket/TicketDialog';
import Zoom from '@material-ui/core/Zoom/Zoom';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import {makeStyles} from '@material-ui/core';
import {Location} from 'history';
import useOnlyOnce from '../../../utils/hooks/useOnlyOnce';
import {getProject} from '../../../api/project/operations';
import {ProjectRouteProps} from '../../templates/ProjectLayout/ProjectLayout';

type LocationState = Location<{project: Project} | undefined>;

type Props = ProjectRouteProps;

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(4),
  },
}));

const Board: React.FC<Props> = (props) => {
  const {match, location} = props;
  const projectId = match.params.projectId;
  const locationState = location as LocationState;

  const [project, setProject] = useState(locationState.state?.project);
  useOnlyOnce(async () => {
    const res = await getProject(projectId);
    setProject(res);
  }, project === undefined);

  const classes = useStyles();
  const openDialog = useModal(NewTicketDialog);

  const {tickets, loading} = useTickets(projectId);
  const [localTickets, setLocalTickets] = useState(tickets);

  useEffect(() => {
    setLocalTickets(tickets);
  }, [tickets]);

  const openNewTicket = useCallback(async () => {
    if (!project) return;
    const boardId = project.boards[0].boardId;
    const listId = project.boards[0].lists[0].listId;
    await openDialog({projectId, boardId, listId});
  }, [openDialog, project]);

  const ticketsByList = useMemo(
    () =>
      localTickets!.reduce((acc: {[key: string]: Ticket[]}, ticket) => {
        const listId = ticket.currentPosition.list;
        if (acc[listId] === undefined) {
          acc[listId] = [ticket];
          return acc;
        }
        inject(acc[listId], ticket, (_ticket) => _ticket.order > ticket.order);
        return acc;
      }, {} as {[key: string]: Ticket[]}),
    [localTickets]
  );

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const source: DraggableLocation = result.source;
    const destination: DraggableLocation = result.destination;
    const ticket = tickets!.find(
      (_ticket) => _ticket.ticketId === result.draggableId
    );
    const listTickets = ticketsByList[destination.droppableId] || [];
    if (
      (source.droppableId === destination.droppableId &&
        source.index === destination.index) ||
      !ticket
    )
      return;

    ticket.currentPosition.list = destination.droppableId;
    ticket.order = calcNewOrder(listTickets, ticket, destination.index);
    setLocalTickets([...localTickets]);
    await updateTicket(ticket);
  };

  if (loading || project === undefined) return <Spinner />;

  const board = project.boards[0];
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Row
          height={'100%'}
          width={'100%'}
          overflowX={'auto'}
          padding={[0, 0, 0, 1]}
        >
          {board.lists.map((list, index) => (
            <List
              key={list.listId}
              list={list}
              index={index}
              tickets={ticketsByList[list.listId]}
            />
          ))}
          <Container minWidth={96} height={'100%'} />
        </Row>
      </DragDropContext>
      <Zoom in={true}>
        <Fab
          className={classes.fab}
          aria-label={'New Ticket'}
          color={'primary'}
          onClick={openNewTicket}
        >
          <Add />
        </Fab>
      </Zoom>
    </>
  );
};

export default Board;
