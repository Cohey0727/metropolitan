import React, {useCallback, useState} from 'react';
import {Dialog, DialogBody, DialogHeader} from '../../../atoms/dialogs';
import {User} from '../../../../types';
import getInitialTicket from './getInitialTicket';
import './editor.css';
import {createTicket} from '../../../../api/ticket/operations';
import {useModalContext} from '../../../../utils/ui/modal/modalHandler';
import {makeStyles} from '@material-ui/core';

type Props = {
  user: User;
};

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

const ProjectDialog: React.FC<Props> = (props) => {
  const {user} = props;
  const classes = useStyles();
  const context = useModalContext();
  const [formValues, setFormValues] = useState(
    getInitialTicket('project1', 'board1', 'list1', user.sub)
  );
  const handleChange = useCallback(
    (key: string) =>
      function (value: any) {
        setFormValues((currentValues) => ({...currentValues, [key]: value}));
      },
    []
  );

  const handleSubmit = async () => {
    const res = await createTicket(formValues);
    context.actions.resolve(res);
  };

  return (
    <Dialog maxWidth={'md'} fullWidth={true}>
      <DialogHeader>New Project</DialogHeader>
      <DialogBody></DialogBody>
    </Dialog>
  );
};

export default ProjectDialog;
