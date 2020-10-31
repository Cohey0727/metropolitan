import {Diff} from './types';
import _ from 'lodash';

type Predicate = Diff<Parameters<typeof _.findIndex>[1], undefined | null>;

export function replace<T>(array: T[], predicate: Predicate, newObj: T) {
  const index = _.findIndex<T>(array, predicate);
  if (index >= 0) array[index] = newObj;
  return index;
}

export function injectInterval<T>(array: T[], obj: T, interval = 1) {
  let isFirst = true;
  return array.reduce((acc, current, index) => {
    if (!isFirst && (index + 1) % interval === 0) acc.push(obj);
    isFirst = false;
    acc.push(current);
    return acc;
  }, [] as T[]);
}
