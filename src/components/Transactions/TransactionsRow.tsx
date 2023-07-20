import { TransactionsCell } from "components/Transactions/TransactionsCell"
import { ITransactions } from "interfaces"
import { formatMoneyFromCents, formatToNormalizedAndLowercase } from "utils"


export function TransactionsRow({ transaction }: { transaction: ITransactions }) {
  const { category, type, value, date } = transaction
  const colorClass = formatToNormalizedAndLowercase(type) === 'saida' ?
    'text-red-600 font-semibold' : 'text-blue-600 font-semibold'
  return (
    <div className="flex gap-2 border-b-2 py-2 px-1 uppercase justify-between ">
      <TransactionsCell className="mr-auto" data={category} />
      <div className="flex flex-grow justify-around">
        <TransactionsCell data={type} className={colorClass} />
        <TransactionsCell data={formatMoneyFromCents(value)} className={colorClass} />
        <TransactionsCell data={date.getFullYear()} />
      </div>
    </div>
  )
}
