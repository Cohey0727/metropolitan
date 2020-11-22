import React from 'react';
import BaseDialog, {DialogProps} from '@material-ui/core/Dialog';
import {useModalContext} from '../../../providers/ModalProvider';

const Dialog: React.FC<Omit<DialogProps, 'open'>> = (props) => {
  const context = useModalContext();
  return <BaseDialog open={context.open} {...props} />;
};

export default Dialog;
