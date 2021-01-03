import React, {useMemo} from 'react';
import {useProjectContext} from '../../../api/project/hooks';
import {NodeCoordinates, Port} from 'beautiful-react-diagrams/@types/DiagramSchema';
import {FlowDiagram} from '../../atoms/diagram';

const Flow: React.FC = () => {
  const {project, projectId} = useProjectContext();
  const nodes = useMemo(() => {
    return project.boards.map((board, index) => ({
      id: board.boardId,
      content: board.title,
      coordinates: [100 * (index + 1), 100] as NodeCoordinates,
      outputs: [{id: 'port-1', alignment: 'right'}] as Port[],
      inputs: [{id: 'port-1', alignment: 'left'}] as Port[],
    }));
  }, []);
  return <FlowDiagram nodes={nodes} />;
};

export default Flow;
