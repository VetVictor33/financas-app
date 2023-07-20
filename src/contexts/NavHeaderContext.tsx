'use client'
import React, { useContext, createContext, useState } from 'react';

import { IMainContent, INavbarContext, MainContentType } from 'interfaces';
import { HOME_CONTENT } from 'helpers';

const NavbarContext = createContext<INavbarContext>(null!);

export function NavbarContextProvider({ children }: { children: React.ReactNode }) {
  const [mainContent, setMainContent] = useState<MainContentType>(HOME_CONTENT);
  return (
    <NavbarContext.Provider value={{ mainContent, setMainContent }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbarContext() {
  return useContext(NavbarContext);
}