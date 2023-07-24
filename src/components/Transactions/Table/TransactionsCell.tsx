import { TransactionCellElementType } from "types";

type Props = {
  data: string,
  className?: string
  element?: TransactionCellElementType
}



export function TransactionsCell({ data, className, element: Element = 'td' }: Props) {
  const ElementTag = Element as keyof JSX.IntrinsicElements;
  return (
    <ElementTag className={`${className} 
    overflow-hidden text-ellipsis hover:overflow-visible
    w-1/3 m-auto text-center
    whitespace-nowrap
    text-sm`
    }>{data}</ElementTag>
  )
}
