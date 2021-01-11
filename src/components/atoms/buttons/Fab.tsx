import React, {ComponentProps, useState} from 'react';
import {styled} from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import {useAsync} from 'react-use';

const FabButton = styled(Fab)(({theme}) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    bottom: theme.spacing(10),
  },
}));

type Props = {} & ComponentProps<typeof FabButton>;

export default (props: Props) => {
  const [open, setOpen] = useState(false);
  useAsync(async () => {
    setOpen(true);
  }, []);
  return (
    <Zoom in={open}>
      <FabButton {...props} />
    </Zoom>
  );
};
