import React from 'react';
import {
  Dialog,
  DialogBody,
  DialogHeader,
} from '../../../atoms/dialogs';
import {User} from '../../../../types';
import './editor.css';
import {useModalContext} from '../../../../utils/ui/modal/modalHandler';
import {makeStyles} from '@material-ui/core';
import {Formik} from 'formik';
import ProjectForm from './ProjectForm';

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
  const handleSubmit = async () => {};
  return (
    <Dialog maxWidth={'md'} fullWidth={true}>
      <DialogHeader>{'New Ticket'}</DialogHeader>
      <DialogBody>
        <Formik initialValues={{}} onSubmit={handleSubmit}>
          {ProjectForm}
        </Formik>
      </DialogBody>
    </Dialog>
  );
};

export default ProjectDialog;
