import React, {useCallback, useMemo} from 'react';
import {useProjectContext} from '../../../api/project/hooks';
import {NodeCoordinates, Port} from 'beautiful-react-diagrams/@types/DiagramSchema';
import {FlowDiagram} from '../../atoms/diagram';
import {Fab} from '../../atoms/buttons';
import Add from '@material-ui/icons/Add';

const Flow: React.FC = () => {
  const {project} = useProjectContext();

  const nodes = useMemo(() => {
    return project.boards.map((board, index) => ({
      id: board.boardId,
      content: board.title,
      coordinates: [100 * (index + 1), 100] as NodeCoordinates,
      inputs: [{id: `input-${board.boardId}`, alignment: 'left'}] as Port[],
      outputs: [{id: `output-${board.boardId}`, alignment: 'right'}] as Port[],
    }));
  }, [project]);

  const links = useMemo(() => {
    return project.flow.map((link) => ({
      input: `input-${link.input}`,
      output: `output-${link.output}`,
    }));
  }, [project]);

  const hanldeAddNewBoard = useCallback(() => {}, []);

  return (
    <>
      <FlowDiagram nodes={nodes} links={links} />
      <Fab aria-label={'New Board'} color={'primary'} onClick={hanldeAddNewBoard}>
        <Add />
      </Fab>
    </>
  );
};

export default Flow;
