import React from 'react';
import {TextField} from './TextField';
import wrapField from './wrapField';

type Props = React.ComponentProps<typeof TextField>;

function DateTimeField(props: Props) {
  return (
    <TextField
      {...props}
      type="datetime-local"
      InputLabelProps={{shrink: true}}
    />
  );
}
export default wrapField(DateTimeField);
