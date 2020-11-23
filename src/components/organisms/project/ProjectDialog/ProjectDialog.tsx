import React, {useState} from 'react';
import {Formik} from 'formik';
import {Dialog, DialogBody, DialogHeader} from '../../../atoms/dialogs';
import './editor.css';
import ProjectForm from './ProjectForm';
import {useModalContext} from '../../../../providers/ModalProvider';
import {createProject} from '../../../../api/project/operations';
import {useCurrentUser} from '../../../../api/user/hooks';

const ProjectDialog: React.FC = (props) => {
  const user = useCurrentUser();
  const {actions} = useModalContext();
  const [initialValues] = useState({
    author: user.sub,
    rootUser: user.sub,
  });

  const handleSubmit = async (values: any) => {
    await createProject(values);
    actions.resolve();
  };

  return (
    <Dialog maxWidth={'md'} fullWidth={true}>
      <DialogHeader>New Project</DialogHeader>
      <DialogBody>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {ProjectForm}
        </Formik>
      </DialogBody>
    </Dialog>
  );
};

export default ProjectDialog;
