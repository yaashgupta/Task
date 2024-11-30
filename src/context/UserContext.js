import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <UserContext.Provider value={{ users, setUsers, error, setError, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};
