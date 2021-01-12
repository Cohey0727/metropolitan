import React, {useCallback} from 'react';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import {User} from '../../../types';
import {Column} from '../../atoms/containers';
import {Spinner} from '../../atoms/spinners';
import {BasicTable} from '../../molecules/table';
import {TableColumn} from '../../molecules/table/BasicTable';
import {ProjectRouteProps} from '../../templates/ProjectLayout/ProjectLayout';
import {useModal} from '../../../providers/ModalProvider';
import SelectUserDialog from '../../organisms/user/SelectUserDialog';
import {useUsersContext} from '../../../api/user/hooks';
import {Fab} from '../../atoms/buttons';

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
  const {users, addUser} = useUsersContext();

  const openDialog = useModal(SelectUserDialog);
  const handleOpenDialog = useCallback(async () => {
    const user = (await openDialog({})) as User;
    addUser(user);
  }, [openDialog, addUser]);

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
      <Fab aria-label={'Add Member'} color={'primary'} onClick={handleOpenDialog}>
        <AddIcon />
      </Fab>
    </>
  );
};

export default Members;
