import React, {useCallback, useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import AddIcon from '@material-ui/icons/Add';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {useAsync} from 'react-use';
import {getProjectUsers} from '../../../api/user/operations';
import {User} from '../../../types';
import {Column} from '../../atoms/containers';
import {Spinner} from '../../atoms/spinner';
import {BasicTable} from '../../molecules/table';
import {TableColumn} from '../../molecules/table/BasicTable';
import {ProjectRouteProps} from '../../templates/ProjectLayout/ProjectLayout';
import {useModal} from '../../../providers/ModalProvider';
import AddMemberDialog from './AddMemberDialog';

type Props = {} & ProjectRouteProps;

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(4),
  },
}));

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
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  useAsync(async () => {
    const data = await getProjectUsers(projectId);
    setUsers(data);
    setLoading(false);
  }, []);

  const openDialog = useModal(AddMemberDialog);
  const handleOpenDialog = useCallback(async () => {
    const user = (await openDialog({projectId})) as User;
    setUsers((_users) => [..._users, user]);
  }, []);

  return (
    <>
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
      <Zoom in={true}>
        <Fab
          className={classes.fab}
          aria-label={'New Ticket'}
          color={'primary'}
          onClick={handleOpenDialog}
        >
          <AddIcon />
        </Fab>
      </Zoom>
    </>
  );
};

export default Members;
