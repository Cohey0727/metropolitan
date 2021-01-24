import React, {useCallback, useEffect, useState} from 'react';
import {DragDropContext, DraggableLocation, DropResult} from 'react-beautiful-dnd';
import List from './List';
import {Column, Container, Row} from '../../atoms/containers';
import {useProjectTicket} from '../../../api/ticket/hooks';
import {useModal} from '../../../providers/ModalProvider';
import TicketDialog from '../../organisms/ticket/TicketDialog';
import Add from '@material-ui/icons/Add';
import {ProjectPathParams} from '../../templates/ProjectLayout/ProjectLayout';
import {useProjectContext} from '../../../api/project/hooks';
import {RouteConfigComponentProps} from 'react-router-config';
import {Spinner} from '../../atoms/spinners';
import Header from './Header';
import {Fab} from '../../atoms/buttons';

export type BoardPathParams = {boardId?: string} & ProjectPathParams;
export type BoardRouteProps = RouteConfigComponentProps<BoardPathParams>;
type Props = BoardRouteProps;

const Board: React.FC<Props> = (props) => {
  const {match, history} = props;
  const {boardId} = match.params;

  const {project, projectId} = useProjectContext();
  const {moveTicket, onMoveTicketStart} = useProjectTicket();

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

  const openDialog = useModal(TicketDialog);

  const openNewTicket = useCallback(async () => {
    if (!project) return;
    const boardId = project.boards[0].boardId;
    const listId = project.boards[0].lists[0].listId;
    await openDialog({projectId, boardId, listId});
  }, [openDialog, project, projectId]);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const source: DraggableLocation = result.source;
    const destination: DraggableLocation = result.destination;
    if (source.droppableId === destination.droppableId && source.index === destination.index)
      return;
    moveTicket(
      result.draggableId,
      board.boardId,
      destination.droppableId,
      destination.index,
      'list'
    );
  };

  if (!board) return <Spinner />;
  return (
    <>
      <Column>
        <Header board={board} />
        <DragDropContext onDragEnd={handleDragEnd} onDragStart={onMoveTicketStart}>
          <Row height={'100%'} width={'100%'} overflowX={'auto'} padding={[0, 0, 0, 1]}>
            {board.lists.map((list, index) => (
              <List key={list.listId} listId={list.listId} index={index} />
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
