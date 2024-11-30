import React from 'react';
import { UserProvider } from './context/UserContext';
import AppRoutes from './routes';

const App = () => (
  <UserProvider>
    <AppRoutes />
  </UserProvider>
)
;

export default App;
