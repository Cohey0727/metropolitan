import {makeStyles} from '@material-ui/core/styles';
import React, {useCallback, useMemo} from 'react';
import {useHistory} from 'react-router-dom';
import {useProjectContext} from '../../../api/project/hooks';
import {finishBoard} from '../../../api/project/operations';
import {useModal} from '../../../providers/ModalProvider';
import {Board} from '../../../types';
import {Button} from '../../atoms/buttons';
import {Row} from '../../atoms/containers';
import {SimpleSelect} from '../../atoms/input';
import {SimpleDialog} from '../../molecules/dialog';

function Header(props: {board: Board}) {
  const {board} = props;
  const history = useHistory();
  const openConfirmDialog = useModal(SimpleDialog);
  const {project, projectId} = useProjectContext();
  const boardOptions = useMemo(
    () => project.boards.map((_board) => ({label: _board.title, value: _board.boardId})),
    [project]
  );

  const handleBoardChange = useCallback(
    (value: string) => {
      history.replace(`/projects/${projectId}/boards/${value}`);
    },
    [projectId]
  );

  const handleFinishBoard = useCallback(async () => {
    const content = 'Forward tickets to the next board. Are you sure?';
    await openConfirmDialog({content});
    await finishBoard(projectId, board.boardId);
  }, [projectId, board]);

  return (
    <Row padding={[0, 1]} justifyContent={'space-between'}>
      <SimpleSelect
        autoWidth
        options={boardOptions}
        value={board.boardId}
        disableUnderline
        onSelect={handleBoardChange}
      />
      <Button variant={'contained'} color={'primary'} onClick={handleFinishBoard}>
        Finish
      </Button>
    </Row>
  );
}

export default Header;
