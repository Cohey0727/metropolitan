import React, {useCallback} from 'react';
import {styled} from '@material-ui/core';
import {Button} from '../buttons';
import {useModalContext} from '../../../utils/ui/modal/modalHandler';

const Container = styled('div')(({theme}) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  padding: theme.spacing(1, 2),
}));

type Props = {};

const DialogActions: React.FC<Props> = ({children}) => {
  const context = useModalContext();
  const close = useCallback(() => {
    context.actions.reject();
  }, [context]);
  return (
    <Container>
      {children}
      <Button color={'primary'} onClick={close}>
        Cancel
      </Button>
    </Container>
  );
};

export default DialogActions;
