import React, {useCallback, useState} from 'react';
import {Dialog, DialogActions, DialogBody, DialogHeader} from '../../atoms/dialogs';
import Editor from 'rich-markdown-editor';
import TextField from '@material-ui/core/TextField';
import {Column} from '../../atoms/containers';
import {createTicket} from '../../../api/ticket/operations';
import {Button} from '../../atoms/buttons';
import {makeStyles} from '@material-ui/core';
import {useModalContext} from '../../../providers/ModalProvider';
import {useCurrentUser} from '../../../api/user/hooks';

type Props = {};

const useStyles = makeStyles((theme) => ({
  title: {
    flex: '0 0 auto',
  },
  editorContainer: {
    boxSizing: 'border-box',
    overflow: 'scroll',
    maxHeight: 'calc(100vh - 320px)',
    borderWidth: 'thin',
    borderStyle: 'solid',
    borderRadius: 4,
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(1, 0.5),
    borderColor: theme.palette.primary.main,
    '&:hover': {
      borderWidth: 2,
    },
    '&>div, &>div>div, &>div>div>div': {
      minHeight: 240,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
  },
}));

const AddMemberDialog: React.FC<Props> = (props) => {
  const {} = props;
  const handleChange = useCallback(
    (key: string) =>
      function (value: any) {
        // setFormValues((currentValues) => ({...currentValues, [key]: value}));
      },
    []
  );

  const handleSubmit = async () => {};

  return (
    <Dialog maxWidth={'md'} fullWidth={true}>
      <DialogHeader>Add Member</DialogHeader>
      <DialogBody>
        {/* <TextField /> */}
      </DialogBody>
      <DialogActions>
        <Button color='primary' variant='contained' onClick={handleSubmit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMemberDialog;
