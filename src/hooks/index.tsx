import React from 'react';

import { AuthProvider } from './auth';

const AppProvier: React.FC = ({children})=>(
  <AuthProvider>
    {children}
  </AuthProvider>
);

export default AppProvier;
