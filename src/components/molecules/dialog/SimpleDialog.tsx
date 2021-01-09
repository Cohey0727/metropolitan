import React from 'react';
import {useModalContext} from '../../../providers/ModalProvider';
import {Button} from '../../atoms/buttons';
import {Dialog, DialogBody, DialogActions} from '../../atoms/dialogs';

type Props = {
  content: React.ReactNode;
};

const SimpleDialog: React.FC<Props> = ({content}) => {
  const context = useModalContext<any>();
  return (
    <Dialog fullWidth maxWidth={'sm'}>
      <DialogBody>{content}</DialogBody>
      <DialogActions>
        <Button color='primary' variant='contained' onClick={() => context.actions.resolve(null)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimpleDialog;
