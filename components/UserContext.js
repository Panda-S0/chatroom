import React, { createContext, useState } from 'react';

// Create a Context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children,user }) => {

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};
