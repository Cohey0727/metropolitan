import React, {useCallback} from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {useModalContext} from '../../../utils/ui/modal/modalHandler';
import {styled, Theme} from '@material-ui/core';

type Props = {};

const Container = styled('div')(({theme}) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  minWidth: 240,
  padding: theme.spacing(0, 1, 0.5, 2),
}));

const Title = styled('h3')<Theme, any>((theme) => ({}));

const DialogHeader: React.FC<Props> = ({children}) => {
  const context = useModalContext();
  const close = useCallback(() => {
    context.actions.reject();
  }, [context]);
  return (
    <Container>
      <Title>{children}</Title>
      <IconButton onClick={close}>
        <CloseIcon />
      </IconButton>
    </Container>
  );
};

export default DialogHeader;
