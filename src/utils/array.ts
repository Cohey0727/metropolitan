import _, {ListIterateeCustom} from 'lodash';

export function replace<T>(array: T[], newObj: T, predicate: ListIterateeCustom<T, boolean>) {
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

export function inject<T>(array: T[], newObj: T, predicate: ListIterateeCustom<T, boolean>) {
  const index = _.findIndex(array, predicate);
  if (index >= 0) {
    array.splice(index, 0, newObj);
  } else {
    array.push(newObj);
  }
  return index;
}
