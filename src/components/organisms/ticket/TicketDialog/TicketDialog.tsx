import React, {useCallback, useState} from 'react';
import {Dialog, DialogActions, DialogBody, DialogHeader} from '../../../atoms/dialogs';
import Editor from 'rich-markdown-editor';
import getInitialTicket from './getInitialTicket';
import TextField from '@material-ui/core/TextField';
import './editor.css';
import {Column, Row} from '../../../atoms/containers';
import {createTicket, updateTicket} from '../../../../api/ticket/operations';
import {Button} from '../../../atoms/buttons';
import {makeStyles} from '@material-ui/core';
import {useModalContext} from '../../../../providers/ModalProvider';
import {useCurrentUser} from '../../../../api/user/hooks';
import {Ticket} from '../../../../types';
import useIsMobile from '../../../../utils/hooks/useIsMobile';

type NewProps = {
  projectId: string;
  boardId: string;
  listId: string;
};

type EditProps = {
  ticket: Ticket;
};

function isEdit(props: any): props is EditProps {
  return !!props.ticket;
}

type Props = NewProps | EditProps;

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

const TicketDialog: React.FC<Props> = (props) => {
  const user = useCurrentUser();
  const classes = useStyles();
  const isMobile = useIsMobile();

  const context = useModalContext<any>();
  const [formValues, setFormValues] = useState(() => {
    if (isEdit(props)) {
      const {ticket} = props;
      return ticket;
    } else {
      const {projectId, boardId, listId} = props;
      return getInitialTicket(projectId, boardId, listId, user.sub);
    }
  });
  const handleChange = useCallback(
    (key: string) =>
      function (value: any) {
        setFormValues((currentValues) => ({...currentValues, [key]: value}));
      },
    []
  );
  const handleSubmit = async () => {
    let res;
    if (isEdit(props)) {
      res = await updateTicket(formValues);
    } else {
      res = await createTicket(formValues);
    }
    context.actions.resolve(res);
  };

  return (
    <Dialog maxWidth={'md'} fullWidth={!isMobile} fullScreen={isMobile}>
      <DialogHeader>{isEdit(props) ? 'Edit Ticket' : 'New Ticket'}</DialogHeader>
      <DialogBody>
        <Column padding={1}>
          <TextField
            defaultValue={formValues.title}
            className={classes.title}
            placeholder='Ticket title'
            label='Title'
            onChange={(e) => handleChange('title')(e.target.value)}
          />
          <Column className={classes.editorContainer}>
            <Editor
              defaultValue={formValues.description}
              placeholder='Ticket description'
              onChange={(value) => handleChange('description')(value())}
            />
          </Column>
        </Column>
      </DialogBody>
      <DialogActions>
        <Button color='primary' variant='contained' onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TicketDialog;
