'use client'
import { TransactionsRow } from "components/Transactions/TransactionsRow"
import { useUserDataContext } from "contexts/UserDataContext"
import { mockData } from "data.mock/mockData"
import { ChangeEvent, useEffect, useState } from "react"
import { Pagination, Stack } from '@mui/material';
import { paginateArray } from "utils"



export function TransactionsTable() {
  const { transactions, setTransactions, currentPage, setCurrentPage } = useUserDataContext()
  const [totalPages, setTotalPages] = useState(0)

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

  useEffect(() => {
    const getTransactions = () => {
      const mockedData = mockData[0].transactions
      const { paginatedItems, totalPages } = paginateArray(mockedData, 6, currentPage)
      setTransactions(paginatedItems)
      setTotalPages(totalPages)
    }
    getTransactions()
  }, [setTransactions, currentPage])
  return (
    <>
      <div className="flex flex-col h-fit p-2 border-zinc-400 ">
        {transactions && transactions.map((transaction) => (
          <TransactionsRow key={transaction.id} transaction={transaction} />
        ))}
      </div>
      <Stack spacing={2} >
        <div className={'mx-auto'}>
          <Pagination count={totalPages} size="small" onChange={handlePageChange} />
        </div>
      </Stack>
    </>
  )
}
