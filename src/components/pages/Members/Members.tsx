import {Typography} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {useAsync} from 'react-use';
import {getProjectUsers} from '../../../api/user/operations';
import {User} from '../../../types';
import {Column} from '../../atoms/containers';
import {Spinner} from '../../atoms/spinner';
import {BasicTable} from '../../molecules/table';
import {TableColumn} from '../../molecules/table/BasicTable';
import {ProjectRouteProps} from '../../templates/ProjectLayout/ProjectLayout';

type Props = {} & ProjectRouteProps;

const columns: TableColumn<User>[] = [
  {
    label: 'Name',
    accessor: 'name',
  },
  {
    label: 'Email',
    accessor: 'email',
  },
];

const Members: React.FC<Props> = (props) => {
  const {projectId} = props.match.params;
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  useAsync(async () => {
    const data = await getProjectUsers(projectId);
    setUsers(data);
    setLoading(false);
  }, []);
  return (
    <Column padding={[2]}>
      <Typography variant='h3' color={'primary'}>
        Members
      </Typography>
      {loading ? (
        <Spinner />
      ) : (
        <Column padding={[2, 0]}>
          <BasicTable columns={columns} rows={users} />
        </Column>
      )}
    </Column>
  );
};

export default Members;
