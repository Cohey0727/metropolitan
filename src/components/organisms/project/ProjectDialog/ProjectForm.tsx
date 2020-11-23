import React from 'react';
import {FormikProps} from 'formik/dist/types';
import {Form} from 'formik';
import {TextField} from '../../../molecules/formik/fields';
import {Button, styled} from '@material-ui/core';

type FormValues = {};

type Props = FormikProps<FormValues>;

const ActionContainer = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 4),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

function ProjectForm(props: Props) {
  const {submitForm} = props;
  return (
    <Form>
      <TextField label='Title' name='title' />
      <TextField label='Description' name='description' multiline />
      <ActionContainer>
        <Button variant='contained' color='primary' onClick={submitForm}>
          Submit
        </Button>
      </ActionContainer>
    </Form>
  );
}

export default ProjectForm;
