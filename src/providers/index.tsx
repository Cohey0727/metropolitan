import React from 'react';
import AuthProvider from './AuthProvider';

const Providers: React.FC = ({children}) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default Providers;
