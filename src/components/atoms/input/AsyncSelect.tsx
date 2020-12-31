import React, {Component, ComponentProps, useCallback} from 'react';
import BaseAsyncSelect from 'react-select/async';
import {StylesConfig} from 'react-select/src/styles';

const styles: StylesConfig<any, false> = {
  menuPortal: (base) => ({...base, zIndex: 9999}),
};

export type SelectorOption<T> = {
  label: string;
  value: T;
};

type Props<T> = {
  loadOptions: (inputValue: string) => Promise<SelectorOption<T>[]>;
  onSelect: (option: SelectorOption<T>) => void;
} & ComponentProps<typeof BaseAsyncSelect>;

export default function AsyncSelect<T>(props: Props<T>) {
  const {loadOptions, onSelect, ...others} = props;
  const handleChange: ComponentProps<typeof BaseAsyncSelect>['onChange'] = (option, actionMeta) => {
    onSelect(option as SelectorOption<T>);
  };
  return (
    <BaseAsyncSelect
      cacheOptions
      defaultOptions
      styles={styles}
      loadOptions={loadOptions}
      onChange={handleChange}
      {...others}
    />
  );
}
