'use client'
import { ITransactions, IUserData } from 'interfaces';
import { IUserDataContext } from 'interfaces/IUserDataContext';
import React, { useContext, createContext, useState } from 'react';


const UserDataContext = createContext<IUserDataContext>(null!);

export function UserDataContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUserData>(undefined!)
  const [transactions, setTransactions] = useState<ITransactions[]>([])
  const [paginatedTransactions, setPaginatedTransactions] = useState<ITransactions[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  return (
    <UserDataContext.Provider value={{
      user, setUser, transactions, setTransactions,
      paginatedTransactions, setPaginatedTransactions, currentPage, setCurrentPage
    }}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserDataContext() {
  return useContext(UserDataContext);
}