import { EditIcon, DeleteIcon } from "assets"
import { NewTransactionsModal, TransactionsCell } from "components"
import { ITransactionsTableRows } from "interfaces"
import { TransactionCellElementType } from "types"
import { Storage, formatDate, formatMoneyReturningCurrencyString, formatToNormalizedAndLowercase } from "utils"
import { useState, useRef } from 'react'
import { useUserDataContext } from "contexts"
import { LocalDatabase } from "services"


export function TransactionsRow({ transaction, element = 'td' }: { transaction: ITransactionsTableRows, element?: TransactionCellElementType }) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const { user, transactions, filterTransactions } = useUserDataContext()
  const { id, category, type, value, date } = transaction!

  const colorClass = type ? formatToNormalizedAndLowercase(type!) === 'saida' ?
    'outcome font-semibold' : 'income font-semibold' : undefined

  const numberSign = colorClass === 'outcome font-semibold' ? -1 : 1

  const formattedValue = isNaN(+value) ? value as string : formatMoneyReturningCurrencyString(
    +value * numberSign)
  const formattedDate = formatDate(date, 'dd/MM/yyyy')

  const ElementTag = element as keyof JSX.IntrinsicElements;

  const deleteModalRef = useRef<HTMLDialogElement>(null)
  const editModalRef = useRef<HTMLDialogElement>(null)

  const handleDeleteModal = () => {
    if (deleteModalOpen) {
      deleteModalRef.current?.showModal()
    } else {
      deleteModalRef.current?.close()
    }
    setDeleteModalOpen(!deleteModalOpen)
  }

  const handleTransactionsDelete = async () => {
    try {
      LocalDatabase.removeTransaction(user.id, id!)

      const localTransactions = [...transactions]
      const foundIndex = localTransactions.findIndex(({ user_id, id: itemId }) => user_id === user.id && id === itemId)
      localTransactions.splice(foundIndex, 1)
      filterTransactions(localTransactions)
      handleDeleteModal()
    } catch (error) {
      //@ts-ignore
      console.log(error.message)
    }
  }

  const handleEditModal = () => {
    editModalRef.current?.showModal()
  }

  return (
    <tr className="flex gap-2 border-b-2 py-2 px-1 uppercase justify-between ">
      <TransactionsCell className="mr-auto" data={category} element={element} />
      <TransactionsCell data={formattedValue} className={colorClass} element={element} />
      <TransactionsCell data={formattedDate} element={element} />
      {element === 'td' ?
        <ElementTag
          className='w-10 flex gap-1'>
          <EditIcon
            className='hover:cursor-pointer hover:opacity-75'
            onClick={handleEditModal}
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
                <button type="button" className="w-20 py-1.5 rounded-md bg-blue-700"
                  onClick={handleTransactionsDelete}
                >Sim</button>
                <button type="button" className="w-20 py-1.5 rounded-md bg-red-700"
                  onClick={handleDeleteModal}
                >Cancelar</button>
              </div>
            </div>
          </dialog>
          <NewTransactionsModal modalRef={editModalRef}
            editing={true}
            incomeId={id}
            incomeCategory={category}
            incomeDate={date}
            incomeType={type}
            incomeValue={+value} />
        </ElementTag> :
        <ElementTag className='w-10' />
      }

    </tr>
  )
}
