import React from 'react';
import {Column} from '../containers';

type Props = {};

const DialogBody: React.FC<Props> = ({children}) => {
  return (
    <Column padding={[2]} fontSize={'1.2rem'}>
      {children}
    </Column>
  );
};

export default DialogBody;
