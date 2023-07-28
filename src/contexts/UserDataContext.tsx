'use client'
import { ITransactions, IUserData } from 'interfaces';
import { IUserDataContext } from 'interfaces/IUserDataContext';
import React, { useContext, createContext, useState } from 'react';
import { Storage, formatToNormalizedAndLowercase, paginateArray } from 'utils';


const UserDataContext = createContext<IUserDataContext>(null!);

export function UserDataContextProvider({ children }: { children: React.ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState<IUserData>(undefined!)
  const [transactions, setTransactions] = useState<ITransactions[]>([])
  const [paginatedTransactions, setPaginatedTransactions] = useState<ITransactions[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filteredTransactions, setFilteredTransactions] = useState<ITransactions[]>([])
  const [yearFilter, setYearFilter] = useState<number | undefined>(undefined)
  const [categoryFilter, setCategoryFilter] = useState<ITransactions['category'] | undefined>(undefined)
  const [totalPages, setTotalPages] = useState(0)


  function filterTransactions(incomeTransactions: ITransactions[] = transactions) {
    const byCategory = categoryFilter
    const byYear = yearFilter
    const byCategoryNormalized = byCategory ? formatToNormalizedAndLowercase(byCategory) : undefined
    const filteredResponse = incomeTransactions.filter(({ date, category }) => {
      const filteredByDate = byYear ? new Date(date).getFullYear() === byYear : incomeTransactions
      if (!byCategory) return filteredByDate
      const filteredByCategory = formatToNormalizedAndLowercase(category) === byCategoryNormalized
      if (!byYear) return filteredByCategory
      return filteredByDate && filteredByCategory
    })
    setFilteredTransactions(filteredResponse)
    paginateTransactions(filteredResponse)
  }

  function paginateTransactions(filteredResponse: ITransactions[]) {
    const { paginatedItems, totalPages } = paginateArray(filteredResponse, 8, currentPage)
    setPaginatedTransactions(paginatedItems)
    setTotalPages(totalPages)
  }
  return (
    <UserDataContext.Provider value={{
      loggedIn, setLoggedIn, user, setUser, transactions, setTransactions,
      paginatedTransactions, setPaginatedTransactions, currentPage, setCurrentPage,
      filterTransactions, yearFilter, setYearFilter, categoryFilter, setCategoryFilter,
      filteredTransactions, totalPages
    }}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserDataContext() {
  return useContext(UserDataContext);
}