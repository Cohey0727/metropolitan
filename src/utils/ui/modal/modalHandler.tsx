import React, {createContext, useContext} from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/styles';
import _ from 'lodash';
import theme from '../../../theme';

const mountPoint: any = document.getElementById('modal-root');

export type ModalProps<S, F> = {
  open: boolean;
  actions: {
    resolve: (successResponse?: S) => void;
    reject: (failureResponse?: F) => void;
  };
};

export const ModalContext = createContext<ModalProps<any, any> | null>(null);
export const useModalContext = () => useContext(ModalContext)!;

const modalHandler = {
  open: function <P, S, F>(Component: React.FC<P>, props: P) {
    return new Promise<S>((resolve, reject) => {
      const handleResolve = (successResponse: S) => {
        this.close(Component, props);
        resolve(successResponse);
      };
      const handleReject = (failureResponse: F) => {
        this.close(Component, props);
        reject(failureResponse);
      };
      const actions = {resolve: handleResolve, reject: handleReject};
      ReactDOM.render(
        <ProviderContainer open={false} actions={actions}>
          <Component {...props} />
        </ProviderContainer>,
        mountPoint,
        () => {
          ReactDOM.render(
            <ProviderContainer open={true} actions={actions}>
              <Component {...props} />
            </ProviderContainer>,
            mountPoint
          );
        }
      );
    });
  },
  close: function (Component: any, props: {}) {
    const actions = {
      resolve: () => {},
      reject: () => {},
    };
    return new Promise<any>((resolve) => {
      ReactDOM.render(
        <ProviderContainer open={false} actions={actions}>
          <Component {...props} />
        </ProviderContainer>,
        mountPoint,
        () => {
          _.delay(() => {
            resolve();
            ReactDOM.render(<></>, mountPoint);
          }, 250);
        }
      );
    });
  },
};

type ProviderProps = {
  children: React.ReactElement;
} & ModalProps<any, any>;

function ProviderContainer({children, open, actions}: ProviderProps) {
  return (
    <ModalContext.Provider value={{open, actions}}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ModalContext.Provider>
  );
}

export default modalHandler;
