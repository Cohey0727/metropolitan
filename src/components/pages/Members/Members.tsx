import React, {useCallback} from 'react';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import {User} from '../../../types';
import {Column, Row} from '../../atoms/containers';
import {Spinner} from '../../atoms/spinners';
import {BasicTable} from '../../molecules/table';
import {TableColumn} from '../../molecules/table/BasicTable';
import {ProjectRouteProps} from '../../templates/ProjectLayout/ProjectLayout';
import {useModal} from '../../../providers/ModalProvider';
import SelectUserDialog from '../../organisms/user/SelectUserDialog';
import {useProjectUsers} from '../../../api/user/hooks';
import {Fab} from '../../atoms/buttons';
import TableCell from '@material-ui/core/TableCell';
import {IconButton} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

type Props = {} & ProjectRouteProps;

const ActionCell = ({data}: {data: User}) => {
  const {removeUser} = useProjectUsers();

  const hadnleDelete = useCallback(() => {
    removeUser(data);
  }, [data, removeUser]);

  return (
    <TableCell>
      <IconButton onClick={hadnleDelete}>
        <DeleteIcon />
      </IconButton>
    </TableCell>
  );
};

const columns: TableColumn<User>[] = [
  {
    label: 'Actions',
    accessor: () => '',
    component: ActionCell,
  },
  {
    label: 'Name',
    accessor: (data) => {
      return (
        <Row alignItems={'center'}>
          <Avatar src={data.picture} alt={data.name} style={{height: 32, width: 32, margin: 8}} />
          {data.name}
        </Row>
      );
    },
  },
  {
    label: 'Email',
    accessor: 'email',
  },
];

const Members: React.FC<Props> = (props) => {
  const {users, addUser} = useProjectUsers();

  const openDialog = useModal(SelectUserDialog);
  const handleOpenDialog = useCallback(async () => {
    const user = (await openDialog({})) as User;
    addUser(user);
  }, [openDialog, addUser]);

  return (
    <>
      <Column padding={[2]} boxSizing={'border-box'}>
        <Typography variant='h4' color={'primary'}>
          Members
        </Typography>
        {users.length === 0 ? (
          <Spinner />
        ) : (
          <Column padding={[1, 0]} overflow={'auto'}>
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
