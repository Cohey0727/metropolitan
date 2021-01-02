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
import SelectUserDialog from '../../organisms/user/SelectUserDialog';
import {useUsersContext} from '../../../api/user/hooks';

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
  const classes = useStyles();
  const {users, addUser} = useUsersContext();

  const openDialog = useModal(SelectUserDialog);
  const handleOpenDialog = useCallback(async () => {
    const user = (await openDialog({})) as User;
    addUser(user);
  }, []);

  return (
    <>
      <Column padding={[2]}>
        <Typography variant='h3' color={'primary'}>
          Members
        </Typography>
        {users.length === 0 ? (
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
