import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/styles';
import _ from 'lodash';
import {Theme} from '@material-ui/core';
import defaultTheme from '../../theme';

const mountPoint: any = document.getElementById('modal-root');

export type ModalProps<S = undefined, F = undefined> = {
  open: boolean;
  actions: {
    resolve: (successResponse: S) => void;
    reject: (failureResponse: F) => void;
  };
};

type Option = {
  theme: Theme;
};

const modalHandler = {
  open: function <P>(
    Component: React.FC<P>,
    props: Omit<P, keyof ModalProps>,
    option?: Partial<Option>
  ) {
    return new Promise<any>((resolve, reject) => {
      const handleResolve = (res: any) => {
        this.close(Component, props, option);
        resolve(res);
      };
      const handleReject = (res: any) => {
        this.close(Component, props, option);
        reject(res);
      };
      const actions = {resolve: handleResolve, reject: handleReject};
      let modalProps = {...props, open: false, actions} as P & ModalProps;
      ReactDOM.render(
        <ProviderContainer theme={option && option.theme}>
          <Component {...modalProps} />
        </ProviderContainer>,
        mountPoint,
        () => {
          modalProps = {...props, open: true, actions} as P & ModalProps;
          ReactDOM.render(
            <ProviderContainer theme={option && option.theme}>
              <Component {...modalProps} />
            </ProviderContainer>,
            mountPoint
          );
        }
      );
    });
  },
  close: function (Component: any, props: {}, option?: Partial<Option>) {
    const actions = {
      resolve: () => {},
      reject: () => {},
    };
    return new Promise<any>((resolve) => {
      ReactDOM.render(
        <ProviderContainer theme={option && option.theme}>
          <Component {...props} actions={actions} />
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

function ProviderContainer({
  children,
  theme = defaultTheme,
}: {
  children: React.ReactNode;
  theme?: Theme;
}) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}

export default modalHandler;
