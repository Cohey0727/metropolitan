import {Diff} from './types';
import _ from 'lodash';

type Predicate = Diff<Parameters<typeof _.findIndex>[1], undefined | null>;

export function replace<T>(array: T[], predicate: Predicate, newObj: T) {
  const index = _.findIndex<T>(array, predicate);
  if (index >= 0) array[index] = newObj;
  return index;
}
