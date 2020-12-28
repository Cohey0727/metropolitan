import React from 'react';
import {Dialog, DialogBody, DialogActions, DialogHeader} from '../../atoms/dialogs';

type Props = {};

const SimpleDialog: React.FC<Props> = () => {
  return (
    <Dialog>
      <DialogHeader>DialogHeader</DialogHeader>
      <DialogBody>DialogBody</DialogBody>
      <DialogActions>DialogFooter</DialogActions>
    </Dialog>
  );
};

export default SimpleDialog;
