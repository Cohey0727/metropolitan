import React, {useCallback, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Container} from '../../atoms/containers';
import ProjectCard from './ProjectCard';
import CardUIContainer from '../../molecules/container/CardUIContainer';
import {getProjects} from '../../../api/project/operations';
import {useAsync} from 'react-use';
import {Project} from '../../../types';
import {useCurrentUser} from '../../../api/user/hooks';
import {Spinner} from '../../atoms/spinner';
import ProjectNewCard from './ProjectNewCard';
import ProjectDialog from '../../organisms/project/ProjectDialog';
import {useModal} from '../../../providers/ModalProvider';

const cardWidth = 377;

const ProjectSelect: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const openModal = useModal(ProjectDialog);
  const user = useCurrentUser();
  const history = useHistory();
  const [isLoading, setLoading] = useState(true);

  useAsync(async () => {
    setLoading(true);
    const res = await getProjects(user.sub);
    setProjects(res);
    setLoading(false);
  }, []);

  const handleClick = useCallback(
    (project: Project) => () => history.push(`/projects/${project.projectId}`),
    [history]
  );

  const handleClickNew = useCallback(async () => {
    await openModal({});
  }, [user, openModal]);

  if (isLoading) return <Spinner />;
  return (
    <CardUIContainer itemWidth={cardWidth}>
      {[
        <Container
          key={'new-project-card'}
          padding={2}
          boxSizing='border-box'
          width={cardWidth}
        >
          <ProjectNewCard onClick={handleClickNew} />
        </Container>,
        ...projects.map((project) => {
          return (
            <Container
              key={project.projectId}
              padding={2}
              boxSizing='border-box'
              width={cardWidth}
            >
              <ProjectCard project={project} onClick={handleClick(project)} />
            </Container>
          );
        }),
      ]}
    </CardUIContainer>
  );
};

export default ProjectSelect;
