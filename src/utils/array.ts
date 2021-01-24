import _, {ListIterateeCustom, PropertyName, ValueIterateeCustom} from 'lodash';

export function replace<T>(array: T[], newObj: T, iteratee: ValueIterateeCustom<T, PropertyName>) {
  const compareValue =
    typeof iteratee === 'function' ? iteratee(newObj) : _.get(newObj, iteratee as any);
  const predicate = (obj: T) =>
    (typeof iteratee === 'function' ? iteratee(obj) : _.get(obj, iteratee as any)) === compareValue;

  const index = _.findIndex<T>(array, predicate);
  
  if (index < 0) return array;
  
  const newArray = [...array];
  newArray[index] = newObj;
  return newArray;
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

export function keyListBy<T>(array: T[], iteratee: ValueIterateeCustom<T, PropertyName>) {
  return array.reduce((acc, obj) => {
    const key = typeof iteratee === 'function' ? iteratee(obj) : _.get(obj, iteratee as any);
    acc[key] = [...(acc[key] || []), obj];
    return acc;
  }, {} as Record<string, T[]>);
}

type AnyArray = any[] | ReadonlyArray<any>;

export function isEqual(array1: AnyArray, array2: AnyArray) {
  return array1.length === array2.length && array1.every((ele, index) => ele === array2[index]);
}
