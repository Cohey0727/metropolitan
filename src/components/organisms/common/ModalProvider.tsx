import Zoom from '@material-ui/core/Zoom';
import React, {createContext, useCallback, useState} from 'react';

export const ModalContext = createContext<any>(null);

export type ModalProps<S = undefined, F = undefined> = {
  open: boolean;
  actions: {
    resolve: (successResponse: S) => void;
    reject: (failureResponse: F) => void;
  };
};

type ModalStackItem<P = any> = {
  key: string;
  Component: React.FC<P>;
  props: P;
};

const ModalPrpvider: React.FC = ({children}) => {
  const [modalStack, setModalStack] = useState<ModalStackItem[]>([]);
  const reset = useCallback(() => setModalStack([]), []);
  const push = useCallback(
    (newItem: ModalStackItem) =>
      setModalStack((current) => [...current, newItem]),
    []
  );

  const close = useCallback(
    (key: string) => () => {
      setModalStack(modalStack.filter((modalItem) => modalItem.key !== key));
    },
    [modalStack]
  );

  const createActions = useCallback(() => {
    return {
      resolve: () => {},
      reject: () => {}
    }
  }, []);

  return (
    <ModalContext.Provider value={{}}>
      {children}
      {modalStack.map(({key, Component, props}) => (
        <Zoom in={true} key={key}>
          <Component props={props} />
        </Zoom>
      ))}
    </ModalContext.Provider>
  );
};
