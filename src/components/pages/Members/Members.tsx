import React from 'react';
import {ProjectRouteProps} from '../../templates/ProjectLayout/ProjectLayout';

type Props = {} & ProjectRouteProps;

const Members: React.FC<Props> = (props) => {
  const {projectId} = props.match.params;
  return <>Members</>;
};

export default Members;
