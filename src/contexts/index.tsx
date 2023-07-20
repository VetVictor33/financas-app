import React from 'react';
import { NavbarContextProvider } from 'contexts/NavHeaderContext';


export * from './NavHeaderContext';

export function AppContexts({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarContextProvider>{children}</NavbarContextProvider>
    </>
  );
}