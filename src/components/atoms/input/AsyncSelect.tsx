import React, {Component, ComponentProps, useCallback} from 'react';
import BaseAsyncSelect from 'react-select/async';

export type SelectorOption<T> = {
  label: string;
  value: T;
};

type Props<T> = {
  loadOptions: (inputValue: string) => Promise<SelectorOption<T>[]>;
  onSelect: (option: SelectorOption<T>) => void;
} & ComponentProps<typeof BaseAsyncSelect>;

export default function AsyncSelect<T>(props: Props<T>) {
  const {loadOptions, onSelect} = props;
  const handleChange: ComponentProps<typeof BaseAsyncSelect>['onChange'] = (option, actionMeta) => {
    onSelect(option as SelectorOption<T>);
  };
  return (
    <BaseAsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      onChange={handleChange}
    />
  );
}
