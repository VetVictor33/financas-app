import { Input } from "components";
import { useUserDataContext } from "contexts";
import { ChangeEvent, FormEvent, RefObject, useState } from "react";
import { LocalDatabase } from "services";
import { formatMoneyInput, formatMoneyToCents } from "utils";

type Props = {
  modalRef: RefObject<HTMLDialogElement>,
  incomeId?: number | undefined,
  incomeCategory?: string,
  incomeType?: string,
  incomeValue?: string,
  incomeDate?: string,
  editing?: boolean
}

export function NewTransactionsModal({ modalRef,
  incomeId = undefined, incomeCategory = '', incomeType = 'entrada', incomeValue = '', incomeDate = '', editing = false }: Props) {
  const { user, transactions, setTransactions, filterTransactions } = useUserDataContext()

  const [category, setCategory] = useState(incomeCategory)
  const [type, setType] = useState(incomeType)
  const [value, setValue] = useState(incomeValue ? formatMoneyInput(`R$ ${+incomeValue / 100}`, '') : 'R$ ')
  const [date, setDate] = useState(incomeDate)

  const [categoryError, setCategoryError] = useState(false)
  const [typeError, setTypeError] = useState(false)
  const [valueError, setValueError] = useState(false)
  const [dateError, setDateError] = useState(false)

  const [categoryErrorMessage, setCategoryErrorMessage] = useState('')
  const [typeErrorMessage, setTypeErrorMessage] = useState('')
  const [valueErrorMessage, setValueErrorMessage] = useState('')
  const [dateErrorMessage, setDateErrorMessage] = useState('')

  const [feedbackMessage, setFeedbackMessage] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const [inputName, inputValue] = [e.target.name, e.target.value]

    setFeedbackMessage('')
    switch (inputName) {
      case 'category':
        setCategory(inputValue)
        setCategoryError(false)
        break
      case 'type':
        setType(inputValue)
        setTypeError(false)
        break
      case 'value':
        setValue(formatMoneyInput(inputValue, value))
        setValueError(false)
        break
      case 'date':
        setDate(inputValue)
        setDateError(false)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!category) {
      setCategoryError(true)
      setCategoryErrorMessage('Campo obrigatório')
    }
    if (!type) {
      setTypeError(true)
      setTypeErrorMessage('Campo obrigatório')
    }
    if (!value) {
      setValueError(true)
      setValueErrorMessage('Campo obrigatório')
    }
    if (!date) {
      setDateError(true)
      setDateErrorMessage('Campo obrigatório')
    }
    if (!category || !type || !value || !date) {
      setFeedbackMessage('Faltam campos obrigatórios')
      return
    }

    try {
      const userId = user.id
      const valueInCents = formatMoneyToCents(value)
      const newTransactionData = { user_id: +userId, category, type, value: valueInCents, date }
      const localTransactions = [...transactions]
      if (editing) {
        const editedTransaction = LocalDatabase.editTransaction(userId, incomeId!, newTransactionData)
        const foundIndex = localTransactions.findIndex((transaction) => transaction.id == editedTransaction.id)
        localTransactions.splice(foundIndex, 1, editedTransaction)

        setFeedbackMessage('Editada com sucesso!')
      } else {
        const newTransaction = LocalDatabase.setTransaction(newTransactionData)

        localTransactions.push(newTransaction)

        setFeedbackMessage('Adicionada com sucesso!')
        clearForm()
      }
      setTransactions(localTransactions)
      filterTransactions(localTransactions)
      setTimeout(() => {
        setFeedbackMessage('')
        modalRef.current?.close()
      }, 2000)
    } catch (error) {
      setFeedbackMessage((error as Error).message)
    }
  }

  function clearForm() {
    setCategory('')
    setValue(`R$ ${incomeValue}`)
    setDate('')
  }

  return (
    <dialog ref={modalRef} className="w-2/3 h-fit z-10 rounded-lg relative backdrop:backdrop-blur-sm">
      <div className="p-5">
        < button className="absolute right-3 top-3 hover:cursor-pointer hover:opacity-75 p-2"
          onClick={() => modalRef.current?.close()
          }> x</button >
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <Input label="Tipo" inputClassName={'bg-black'}
            name="category"
            type="text"
            value={category}
            onChange={handleInputChange}
            error={categoryError}
            errorMessage={categoryErrorMessage} />
          <div className="flex flex-col">
            <label htmlFor="type">Categoria <span className="text-red-600 font-semibold">{typeErrorMessage}</span></label>
            <select name="type" id="type" value={type} onChange={handleInputChange} className="bg-black bg-opacity-10 border-white border p-2 rounded-md w-full">
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
          </div>
          <Input label="Valor" inputClassName={'bg-black'}
            name="value"
            type="text"
            value={value}
            onChange={handleInputChange}
            error={valueError}
            errorMessage={valueErrorMessage} />
          <Input label="Data" inputClassName={'bg-black'}
            name="date"
            type="date"
            value={date}
            onChange={handleInputChange}
            error={dateError}
            errorMessage={dateErrorMessage} />
          <div className="h-5">
            <p className={`${(categoryError || typeError || valueError || dateError ? 'text-red-600' : 'text-green-600')}`}
            >{feedbackMessage}</p>
          </div>
          <button className="
          bg-black bg-opacity-10 border-white border p-2 rounded-md w-full uppercase font-semibold">
            {editing ?
              "Editar" :
              "Criar"}
          </button>
        </form>
      </div >
    </dialog >
  )
}
