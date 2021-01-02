import {useCallback} from 'react';
import {useEffect, useMemo, useState} from 'react';
import {useLocalStorage} from 'react-use';

type WrappedValue<T> = {
  value: T | undefined;
  expired: number;
};

type Setter<T> = (prevValue: T | undefined) => T;

export default function useTtlLocalStrage<T>(
  key: string,
  ms: number,
  defaultValue?: T,
  options?: Parameters<typeof useLocalStorage>[2]
): [T | undefined, (value: T | Setter<T>) => void, () => void] {
  const [wrappedValue, setValue, remove] = useLocalStorage<WrappedValue<T | undefined>>(
    key,
    {expired: 0, value: defaultValue},
    options as any
  );

  const wrappedSetValue = useCallback((_value: Setter<T> | T) => {
    const expired = new Date().getTime() + ms;
    if (typeof _value === 'function') {
      setValue((prevWrappedValue) => ({
        value: (_value as Setter<T>)(prevWrappedValue!.value),
        expired,
      }));
    } else {
      setValue({value: _value, expired});
    }
  }, []);

  const currentTime = new Date().getTime();
  const currentValue = currentTime > wrappedValue!.expired ? defaultValue : wrappedValue!.value;

  return [currentValue, wrappedSetValue, remove];
}
