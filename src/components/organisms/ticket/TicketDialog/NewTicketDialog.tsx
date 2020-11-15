import React, {useCallback, useState} from 'react';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogHeader,
} from '../../../atoms/dialogs';
import Editor from 'rich-markdown-editor';
import {User} from '../../../../types';
import {Button} from '@material-ui/core';
import getInitialTicket from './getInitialTicket';
import TextField from '@material-ui/core/TextField';
import './editor.css';
import {Column} from '../../../atoms/containers';
import makeResponsiveStyle from '../../../../theme/makeResponsiveStyle';
import {createTicket} from '../../../../api/ticket/operations';
import {useModalContext} from '../../../../utils/ui/modal/modalHandler';

type Props = {
  user: User;
};

const useStyles = makeResponsiveStyle((theme, responsiveInfo) => ({
  title: {},
  editorContainer: {
    overflow: 'scroll',
    maxHeight: 'calc(100vh - 320px)',
    borderWidth: 'thin',
    borderStyle: 'solid',
    borderRadius: 4,
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(1, 0.5),
    borderColor: theme.palette.primary.main,
  },
}));

const NewTicketDialog: React.FC<Props> = (props) => {
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
    <Dialog>
      <DialogHeader>{'New Ticket'}</DialogHeader>
      <DialogBody>
        <Column padding={1}>
          <TextField
            className={classes.title}
            placeholder={'Task: Add a site to form...'}
            label={'Title'}
            onChange={(e) => handleChange('title')(e.target.value)}
          />
          <Column className={classes.editorContainer}>
            <Editor
              placeholder={'Ticket Description'}
              defaultValue=''
              onChange={(value) => handleChange('description')(value())}
            />
          </Column>
        </Column>
      </DialogBody>
      <DialogActions>
        <Button color={'primary'} variant={'contained'} onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewTicketDialog;