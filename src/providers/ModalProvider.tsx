import React, {
  ComponentType,
  ComponentProps,
  useCallback,
  createContext,
  useContext,
} from 'react';
import {atom, useRecoilState} from 'recoil';

type ModalComponent<C extends ComponentType> = {
  Component: C;
  props: ComponentProps<C>;
};

const Empty = () => <></>;
const defaultComponent: ModalComponent<any> = {Component: Empty, props: {}};
const modalComponent = atom<ModalComponent<any>>({
  key: 'modalComponent',
  default: defaultComponent,
});

type ModalContextType<R = void> = {
  open: boolean;
  actions: {
    resolve: (res: R) => void;
    reject: () => void;
  };
};

const defaultContext: ModalContextType = {
  open: false,
  actions: {resolve: () => {}, reject: () => {}},
};

const modalContext = atom<ModalContextType<any>>({
  key: 'modalContext',
  default: defaultContext,
});

export const useModal = <C extends React.ComponentType<any>, R extends unknown>(
  Component: C
) => {
  const [, setModalComponent] = useRecoilState(modalComponent);
  const [, setModalState] = useRecoilState(modalContext);
  return useCallback(
    (props: ComponentProps<C>) => {
      return new Promise<R>((resolve, reject) => {
        const handleResolve = (successResponse: R) => {
          resolve(successResponse);
          setModalComponent(defaultComponent);
          setModalState(defaultContext);
        };
        const handleReject = () => {
          reject();
          setModalComponent(defaultComponent);
          setModalState(defaultContext);
        };
        const actions = {resolve: handleResolve, reject: handleReject};
        setModalState({open: true, actions});
        setModalComponent({Component, props});
      });
    },
    [Component, setModalComponent, setModalState]
  );
};

const ModalContext = createContext<ModalContextType<any>>(defaultContext);

const ModalProvider: React.FC = ({children}) => {
  const [{Component, props}] = useRecoilState(modalComponent);
  const [{open, actions}] = useRecoilState(modalContext);
  return (
    <ModalContext.Provider value={{open, actions}}>
      <Component {...props} />
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
export default ModalProvider;
