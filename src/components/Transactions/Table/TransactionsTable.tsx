'use client'
import { TransactionsHead, TransactionsRow } from "components"
import { useUserDataContext } from "contexts/UserDataContext"
import { mockData } from "data.mock/mockData"
import { ChangeEvent, useEffect, useState } from "react"
import { Pagination, Stack } from '@mui/material';
import { paginateArray } from "utils"



export function TransactionsTable() {
  const { transactions, setTransactions, paginatedTransactions, setPaginatedTransactions, currentPage, setCurrentPage } = useUserDataContext()
  const [totalPages, setTotalPages] = useState(0)
  console.log(currentPage)

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

  useEffect(() => {
    const getTransactions = () => {
      const mockedTransactions = mockData[0].transactions
      setTransactions(mockedTransactions)
      const { paginatedItems, totalPages } = paginateArray(mockedTransactions, 8, currentPage)
      setPaginatedTransactions(paginatedItems)
      setTotalPages(totalPages)
    }
    getTransactions()
  }, [setTransactions, setPaginatedTransactions, currentPage])
  return (
    <div className="flex flex-col  flex-grow">
      <table className="flex flex-col h-fit p-2 border-zinc-400 my-auto">
        <TransactionsHead head={{ category: 'Tipo', value: 'Valor', date: 'Data' }} />
        {paginatedTransactions && paginatedTransactions.map((transaction) => (
          <TransactionsRow key={transaction.id} transaction={transaction} />
        ))}
      </table>
      <Stack spacing={2} >
        <div className={'mx-auto'}>
          <Pagination page={currentPage} count={totalPages} size="small" onChange={handlePageChange} />
        </div>
      </Stack>
    </div>
  )
}
