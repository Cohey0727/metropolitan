import _ from 'lodash';
import {DependencyList, EffectCallback, useEffect, useRef, useState} from 'react';
import {isEqual} from '../array';

export default function useBeforeEffect(effect: EffectCallback, deps: DependencyList) {
  const depsRef = useRef(deps);
  const isFirst = useRef(true);
  if (!isEqual(depsRef.current, deps) || isFirst.current) {
    effect();
    isFirst.current = false;
    depsRef.current = deps;
  }
}
