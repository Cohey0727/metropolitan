import React, {Component, useCallback} from 'react';
import BaseAsyncSelect from 'react-select/async';

export type SelectorOption = {
  label: string;
  value: number | string;
};

type Props = {
  loadOptions: (inputValue: string) => Promise<SelectorOption[]>;
};

export default function AsyncSelect(props: Props) {
  const {loadOptions} = props;
  return <BaseAsyncSelect cacheOptions defaultOptions loadOptions={loadOptions} />;
}
