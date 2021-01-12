import React, {createContext, useMemo, useState} from 'react';
import _ from 'lodash';

import {useLocation, useRouteMatch} from 'react-router-dom';
import {
  LocationState,
  ProjectPathParams,
} from '../../components/templates/ProjectLayout/ProjectLayout';
import {Board, List, Project} from '../../types';
import {Spinner} from '../../components/atoms/spinners';
import useOnlyOnce from '../../utils/hooks/useOnlyOnce';
import {getProject} from './operations';

type ProjectContextValue = {
  project: Project;
  projectId: string;
  getFirstBoard: () => Board;
  getBoardById: (boardId: string) => Board;
  getListById: (listId: string) => List;
};

export const ProjectContext = createContext<ProjectContextValue>({} as any);

type Props = {};

export const ProjectProvider: React.FC<Props> = (props) => {
  const {children} = props;
  const match = useRouteMatch<ProjectPathParams>();
  const location = useLocation<LocationState>();
  const {projectId} = match.params;
  const [project, setProject] = useState(location.state?.project);

  useOnlyOnce(async () => {
    const res = await getProject(projectId);
    setProject(res);
  }, project === undefined);

  const contextValue: ProjectContextValue | undefined = useMemo(() => {
    if (!project) return;
    const boardMap = _.keyBy(project.boards, 'boardId');
    const allLists = project.boards.reduce((acc, board) => {
      return [...acc, ...board.lists];
    }, [] as List[]);
    const listMap = _.keyBy(allLists, 'listId');
    return {
      project: project,
      projectId: projectId,
      getFirstBoard: () => project.boards[0],
      getBoardById: (boardId: string) => boardMap[boardId],
      getListById: (listId: string) => listMap[listId],
    };
  }, [project, projectId]);

  if (contextValue === undefined) return <Spinner />;
  return <ProjectContext.Provider value={contextValue}>{children}</ProjectContext.Provider>;
};
