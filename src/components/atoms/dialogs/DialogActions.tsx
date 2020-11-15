import React from 'react';
import {styled} from '@material-ui/core';

const Container = styled('div')(({theme}) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  padding: theme.spacing(1, 2),
}));

type Props = {};

const DialogActions: React.FC<Props> = ({children}) => {
  return <Container>{children}</Container>;
};

export default DialogActions;
