import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {DragDropContext, DraggableLocation, DropResult} from 'react-beautiful-dnd';
import List from './List';
import {Ticket} from '../../../types';
import {Column, Container, Row} from '../../atoms/containers';
import {useTickets} from '../../../api/ticket/hooks';
import {updateTicket} from '../../../api/ticket/operations';
import {calcNewOrder} from './utils';
import {inject} from '../../../utils/array';
import {useModal} from '../../../providers/ModalProvider';
import TicketDialog from '../../organisms/ticket/TicketDialog';
import Add from '@material-ui/icons/Add';
import {makeStyles} from '@material-ui/core';
import {ProjectPathParams} from '../../templates/ProjectLayout/ProjectLayout';
import {useProjectContext} from '../../../api/project/hooks';
import {RouteConfigComponentProps} from 'react-router-config';
import {Spinner} from '../../atoms/spinner';
import Header from './Header';
import {Fab} from '../../atoms/buttons';

export type BoardPathParams = {boardId?: string} & ProjectPathParams;
export type BoardRouteProps = RouteConfigComponentProps<BoardPathParams>;
type Props = BoardRouteProps;

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(4),
  },
  boardTitleContainer: {
    padding: theme.spacing(0, 1),
  },
}));

const Board: React.FC<Props> = (props) => {
  const {match, history} = props;
  const {boardId} = match.params;

  const {project, projectId} = useProjectContext();

  const [board, setBoard] = useState(() => {
    const find = project.boards.find((board) => board.boardId === boardId);
    if (find) return find;
    const _board = project.boards[0];
    history.replace(`/projects/${projectId}/boards/${_board.boardId}`);
    return _board;
  });

  useEffect(() => {
    const find = project.boards.find((board) => board.boardId === boardId);
    if (find) return setBoard(find);
    const _board = project.boards[0];
    history.replace(`/projects/${projectId}/boards/${_board.boardId}`);
    setBoard(_board);
  }, [boardId, projectId]);

  const classes = useStyles();
  const openDialog = useModal(TicketDialog);

  const {tickets} = useTickets(projectId);
  const [localTickets, setLocalTickets] = useState(tickets);

  useEffect(() => {
    setLocalTickets(tickets);
  }, [tickets]);

  const openNewTicket = useCallback(async () => {
    if (!project) return;
    const boardId = project.boards[0].boardId;
    const listId = project.boards[0].lists[0].listId;
    await openDialog({projectId, boardId, listId});
  }, [openDialog, project, projectId]);

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
    const ticket = tickets!.find((_ticket) => _ticket.ticketId === result.draggableId);
    const listTickets = ticketsByList[destination.droppableId] || [];
    if (
      (source.droppableId === destination.droppableId && source.index === destination.index) ||
      !ticket
    )
      return;

    ticket.currentPosition.list = destination.droppableId;
    ticket.order = calcNewOrder(listTickets, ticket, destination.index);
    setLocalTickets([...localTickets]);
    await updateTicket(ticket);
  };
  if (!board) return <Spinner />;
  return (
    <>
      <Column>
        <Header board={board} />
        <DragDropContext onDragEnd={onDragEnd}>
          <Row height={'100%'} width={'100%'} overflowX={'auto'} padding={[0, 0, 0, 1]}>
            {board.lists.map((list, index) => (
              <List
                key={list.listId}
                listId={list.listId}
                index={index}
                tickets={ticketsByList[list.listId]}
              />
            ))}
            <Container minWidth={96} height={'100%'} />
          </Row>
        </DragDropContext>
      </Column>
      <Fab aria-label={'New Ticket'} color={'primary'} onClick={openNewTicket}>
        <Add />
      </Fab>
    </>
  );
};

export default Board;
