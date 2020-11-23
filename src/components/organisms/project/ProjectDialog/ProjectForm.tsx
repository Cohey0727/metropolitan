import React from 'react';
import {FormikProps} from 'formik/dist/types';
import {Form} from 'formik';
import {MultiLineTextField, TextField} from '../../../molecules/formik/fields';
import {Button, styled} from '@material-ui/core';
import {Column} from '../../../atoms/containers';

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
      <Column padding={2}>
        <TextField label='Title' name='title' />
        <MultiLineTextField label='Description' name='description' rows={4} />
        <ActionContainer>
          <Button variant='contained' color='primary' onClick={submitForm}>
            Submit
          </Button>
        </ActionContainer>
      </Column>
    </Form>
  );
}

export default ProjectForm;
