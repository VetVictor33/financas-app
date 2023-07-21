import { TransactionsRow } from "components/Transactions/Table/TransactionsRow"
import { ITransactionsTableRows } from "interfaces"


export function TransactionsHead({ head }: { head: ITransactionsTableRows }) {
  return (
    <thead>
      <TransactionsRow transaction={head} element="th" />
    </thead>
  )
}
