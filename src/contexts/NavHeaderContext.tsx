'use client'
import React, { createContext, useContext, useState } from 'react';

import { INavbarContext } from 'interfaces';

const NavbarContext = createContext<INavbarContext>(null!);

export function NavbarContextProvider({ children }: { children: React.ReactNode }) {
  const [mainContentIndex, setMainContentIndex] = useState<number>(0);
  return (
    <NavbarContext.Provider value={{ mainContentIndex, setMainContentIndex }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbarContext() {
  return useContext(NavbarContext);
}