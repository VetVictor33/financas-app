import React from 'react';
import { NavbarContextProvider } from 'contexts/NavHeaderContext';
import { UserDataContextProvider } from 'contexts/UserDataContext';


export * from './NavHeaderContext';
export * from './UserDataContext'

export function AppContexts({ children }: { children: React.ReactNode }) {
  return (
    <NavbarContextProvider>
      <UserDataContextProvider>
        {children}
      </UserDataContextProvider>
    </NavbarContextProvider>
  );
}