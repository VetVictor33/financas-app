'use client'
import { Pagination, Stack } from '@mui/material'
import { TransactionsHead, TransactionsRow } from "components"
import { useUserDataContext } from "contexts/UserDataContext"
import { ChangeEvent, useEffect } from "react"



export function TransactionsTable() {
  const { filterTransactions, paginatedTransactions, filteredTransactions,
    currentPage, setCurrentPage, yearFilter, categoryFilter, totalPages } = useUserDataContext()

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }
  useEffect(() => {
    filterTransactions()
  }, [currentPage, totalPages, yearFilter, categoryFilter])
  return (
    <div className="flex flex-col  flex-grow">
      <table className="flex flex-col h-fit p-2 border-zinc-400 my-auto">
        {paginatedTransactions.length ?
          <>
            <TransactionsHead head={{ category: 'Tipo', value: 'Valor', date: 'Data' }} />
            {paginatedTransactions.map((transaction) => (
              <TransactionsRow key={transaction.id} transaction={transaction} />
            ))}
          </>
          : ''}
      </table>
      <Stack spacing={2} >
        <div className={'mx-auto'}>
          <Pagination page={currentPage} count={totalPages} size="small" onChange={handlePageChange} />
        </div>
      </Stack>
    </div>
  )
}
