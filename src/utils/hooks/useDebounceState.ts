import {useState} from 'react';
import _ from 'lodash';

export default function useDebounceState<T>(
  initialState: T,
  ms: number
): [T, (newState: T) => void] {
  const [state, setState] = useState<T>(initialState);
  const debounceFunc = _.debounce((newState: T) => setState(newState), ms);
  return [state, debounceFunc];
}
