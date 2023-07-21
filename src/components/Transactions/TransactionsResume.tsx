'use client'

import { useUserDataContext } from "contexts/UserDataContext"
import { formatMoneyFromCents, formatToNormalizedAndLowercase } from "utils"

export function TransactionsResume() {
  const { transactions, paginatedTransactions } = useUserDataContext()

  const paginatedIncome: number = paginatedTransactions.reduce((accumulator, currentValue) => {
    if (formatToNormalizedAndLowercase(currentValue.type) === 'entrada') {
      return accumulator + currentValue.value
    }
    return accumulator
  }, 0)
  const totalIncome: number = transactions.reduce((accumulator, currentValue) => {
    if (formatToNormalizedAndLowercase(currentValue.type) === 'entrada') {
      return accumulator + currentValue.value
    }
    return accumulator
  }, 0)
  const paginatedOutcome: number = paginatedTransactions.reduce((accumulator, currentValue) => {
    if (formatToNormalizedAndLowercase(currentValue.type) === 'saida') {
      return accumulator + currentValue.value
    }
    return accumulator
  }, 0)
  const totalOutcome: number = transactions.reduce((accumulator, currentValue) => {
    if (formatToNormalizedAndLowercase(currentValue.type) === 'saida') {
      return accumulator + currentValue.value
    }
    return accumulator
  }, 0)

  const paginatedBalance = (paginatedIncome - paginatedOutcome)
  const totalBalance = (totalIncome - totalOutcome)

  return (
    <div className="flex flex-grow-0 justify-around  my-2 py-4 px-2 rounded bg-slate-300 uppercase gap-1
    overflow-hidden overflow-ellipsis hover:overflow-visible ">
      <div className="w-1/2 rounded-lg itens-center bg-slate-600 bg-opacity-30 p-1">
        <p className="text-xs">Filtro:</p>
        <div className="font-mono">
          <p>Entradas: </p>
          <p className="income">{formatMoneyFromCents(paginatedIncome)}</p>
          <p>Saídas: </p>
          <p className="outcome">{formatMoneyFromCents(paginatedOutcome)}</p>
          <p>Saldo: </p>
          <p className={paginatedBalance > 0 ? 'income' : 'outcome'}>{formatMoneyFromCents(paginatedBalance)} </p>
        </div>
      </div>
      <div className="w-1/2 rounded-lg bg-slate-600 bg-opacity-30 p-1">
        <p className="text-xs">Total:</p>
        <div className="font-mono">
          <p>Entradas: </p>
          <p className="income">{formatMoneyFromCents(totalIncome)}</p>
          <p>Saídas: </p>
          <p className="outcome">{formatMoneyFromCents(totalOutcome)}</p>
          <p>Saldo: </p>
          <p className={totalBalance > 0 ? 'income' : 'outcome'}>{formatMoneyFromCents(totalBalance)} </p>
        </div>
      </div>
    </div>
  )
}
