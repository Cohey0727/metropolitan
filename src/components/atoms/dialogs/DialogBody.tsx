import React from 'react';
import {Column} from '../containers';

type Props = {};

const DialogBody: React.FC<Props> = ({children}) => {
  return <Column>{children}</Column>;
};

export default DialogBody;
