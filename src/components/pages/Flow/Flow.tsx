import React, {useMemo} from 'react';
import {useProjectContext} from '../../../api/project/hooks';
import {NodeCoordinates, Port} from 'beautiful-react-diagrams/@types/DiagramSchema';
import {FlowDiagram} from '../../atoms/diagram';

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

  return <FlowDiagram nodes={nodes} links={links} />;
};

export default Flow;
