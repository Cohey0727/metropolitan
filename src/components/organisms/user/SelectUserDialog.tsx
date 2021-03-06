import React, {useState} from 'react';
import {Dialog, DialogActions, DialogBody, DialogHeader} from '../../atoms/dialogs';
import {Button} from '../../atoms/buttons';
import {AsyncSelect} from '../../atoms/input';
import {searchUsers} from '../../../api/user/operations';
import {SelectorOption} from '../../atoms/input/AsyncSelect';
import {useModalContext} from '../../../providers/ModalProvider';
import {Column} from '../../atoms/containers';
import {User} from '../../../types';

type Props = {};

const AddMemberDialog: React.FC<Props> = (props) => {
  const context = useModalContext<any>();

  const [user, setUser] = useState<User | null>(null);

  const searchUser = async (inputValue: string) => {
    if (inputValue.length < 3) return [];
    const users = await searchUsers(inputValue);
    return users.map((user) => ({label: `${user.name}(${user.email})`, value: user}));
  };

  const handleSelect = (user: SelectorOption<User>) => {
    setUser(user!.value);
  };

  const handleSubmit = () => context.actions.resolve(user);

  return (
    <Dialog maxWidth={'sm'} fullWidth={true}>
      <DialogHeader>Add Member</DialogHeader>
      <DialogBody>
        <Column padding={1}>
          <AsyncSelect
            loadOptions={searchUser}
            onSelect={handleSelect}
            autoFocus
            menuPosition='fixed'
          />
        </Column>
      </DialogBody>
      <DialogActions>
        <Button color='primary' variant='contained' onClick={handleSubmit} disabled={!user}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMemberDialog;
