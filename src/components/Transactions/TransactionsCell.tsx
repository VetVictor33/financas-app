type Props = {
  data: string | number,
  className?: string
}


export function TransactionsCell({ data, className }: Props) {
  return (
    <td className={`${className} overflow-hidden w-32 m-auto text-center`}>{data}</td>
  )
}
