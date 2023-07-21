import { TransactionsCell } from "components"
import { ITransactions, ITransactionsTableRows } from "interfaces"
import { TransactionCellElementType } from "types"
import { formatMoneyFromCents, formatToNormalizedAndLowercase } from "utils"


export function TransactionsRow({ transaction, element = 'td' }: { transaction: ITransactionsTableRows, element?: TransactionCellElementType }) {
  const { category, type, value, date } = transaction!

  const colorClass = type ? formatToNormalizedAndLowercase(type!) === 'saida' ?
    'outcome font-semibold' : 'income font-semibold' : undefined

  const formattedValue = isNaN(+value) ? value as string : formatMoneyFromCents(+value)
  return (
    <tr className="flex gap-2 border-b-2 py-2 px-1 uppercase justify-between ">
      <TransactionsCell className="mr-auto" data={category} element={element} />
      <TransactionsCell data={formattedValue} className={colorClass} element={element} />
      <TransactionsCell data={date} element={element} />
    </tr>
  )
}
