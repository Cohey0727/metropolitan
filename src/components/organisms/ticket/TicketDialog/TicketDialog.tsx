import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogHeader,
} from '../../../atoms/dialogs';
import {Ticket} from '../../../../types';
import {Button, LinearProgress} from '@material-ui/core';
import getInitialTicket from './getInitialTicket';

type Props = {
  ticket?: Ticket;
};

const TicketDialog: React.FC<Props> = (props) => {
  const {ticket} = props;
  const isNew = !ticket;
  const title = isNew ? 'New Ticket' : 'Edit Ticket';
  const initialValues = isNew
    ? getInitialTicket('project1', 'board1', 'list1')
    : ({...ticket} as Ticket);
  return (
    <Dialog>
      <DialogHeader>{title}</DialogHeader>
      <DialogBody></DialogBody>
      <DialogActions>
        <Button color={'primary'} variant={'contained'}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TicketDialog;
