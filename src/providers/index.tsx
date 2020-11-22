import React from 'react';
import AuthProvider from './AuthProvider';
import ModalProvider from './ModalProvider';

const Providers: React.FC = ({children}) => {
  return (
    <AuthProvider>
      <ModalProvider>{children}</ModalProvider>
    </AuthProvider>
  );
};

export default Providers;
