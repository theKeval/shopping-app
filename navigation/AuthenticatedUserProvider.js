import React, { useState, createContext,useEffect } from 'react';
export const AuthenticatedUserContext = createContext({});

export const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {})

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
