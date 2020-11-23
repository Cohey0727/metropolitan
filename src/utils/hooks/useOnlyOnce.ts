import {useEffect, useState} from 'react';

export default function useOnlyOnce(effect: Function, condition: boolean = true) {
  const [isPristine, setPristine] = useState(true);
  const [resCallback, setResCallback] = useState(undefined);

  useEffect(() => {
    if (!condition || !isPristine) return resCallback;
    setPristine(false);
    const res = effect();
    if (typeof res === 'function') {
      setResCallback(res);
      return res;
    }
  }, [condition]);
}
