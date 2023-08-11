'use client'
import { Pagination, Stack } from '@mui/material'
import { TransactionsHead, TransactionsRow } from "components"
import { useUserDataContext } from "contexts/UserDataContext"
import { ChangeEvent, useEffect } from "react"



export function TransactionsTable() {
  const { paginatedTransactions, filterTransactions,
    currentPage, setCurrentPage, totalPages } = useUserDataContext()

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }
  useEffect(() => {
  }, [filterTransactions, currentPage, totalPages])
  return (
    <div className="flex flex-col flex-grow">
      <table className="flex flex-col flex-grow p-2 border-zinc-400 my-auto">
        {paginatedTransactions ?
          <>
            <TransactionsHead head={{ category: 'Tipo', value: 'Valor', date: 'Data' }} />
            <tbody>
              {paginatedTransactions.map((transaction) => {
                return <TransactionsRow key={transaction.id} transaction={transaction} />
              })}
            </tbody>
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
