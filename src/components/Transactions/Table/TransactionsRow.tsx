import { EditIcon, DeleteIcon } from "assets"
import { TransactionsCell } from "components"
import { ITransactionsTableRows } from "interfaces"
import { TransactionCellElementType } from "types"
import { formatMoneyFromCentsReturningString, formatToNormalizedAndLowercase } from "utils"
import { useState, useRef } from 'react'


export function TransactionsRow({ transaction, element = 'td' }: { transaction: ITransactionsTableRows, element?: TransactionCellElementType }) {
  const { id, category, type, value, date } = transaction!
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const colorClass = type ? formatToNormalizedAndLowercase(type!) === 'saida' ?
    'outcome font-semibold' : 'income font-semibold' : undefined
  const formattedValue = isNaN(+value) ? value as string : formatMoneyFromCentsReturningString(+value)
  const ElementTag = element as keyof JSX.IntrinsicElements;

  const deleteModalRef = useRef<HTMLDialogElement>(null)
  const handleDeleteModal = () => {
    if (deleteModalRef.current) {
      if (deleteModalOpen) {
        deleteModalRef.current.showModal()
      } else {
        deleteModalRef.current.close()
      }
      setDeleteModalOpen(!deleteModalOpen)
    }
  }


  return (
    <tr className="flex gap-2 border-b-2 py-2 px-1 uppercase justify-between ">
      <TransactionsCell className="mr-auto" data={category} element={element} />
      <TransactionsCell data={formattedValue} className={colorClass} element={element} />
      <TransactionsCell data={date} element={element} />
      {element === 'td' ?
        <ElementTag
          className='w-10 flex gap-1'>
          <EditIcon
            className='hover:cursor-pointer hover:opacity-75'
            onClick={() => console.log('todo')}
          />
          <DeleteIcon
            className='hover:cursor-pointer hover:opacity-75'
            onClick={handleDeleteModal}
          />
          <dialog ref={deleteModalRef}
            className="w-1/2 rounded-md p-6 text-center">
            <div className="flex flex-col gap-4 items-center">
              <p>
                Realmente deseja apagar essa transação?
              </p>
              <div className="flex gap-3 text-white font-semibold">
                <button className="w-20 py-1.5 rounded-md bg-blue-700"
                // onClick={''}
                >Sim</button>
                <button className="w-20 py-1.5 rounded-md bg-red-700"
                  onClick={handleDeleteModal}
                >Cancelar</button>
              </div>
            </div>
          </dialog>
        </ElementTag> :
        <ElementTag className='w-10' />
      }

    </tr>
  )
}
