import { Input } from "components";
import { ChangeEvent, useState } from "react";

export function NewTransactionsModal({ modalRef }) {
  const [category, setCategory] = useState('')
  const [type, setType] = useState('entrada')
  const [value, setValue] = useState(0)
  const [date, setDate] = useState('')

  const [categoryError, setCategoryError] = useState(false)
  const [typeError, setTypeError] = useState(false)
  const [valueError, setValueError] = useState(false)
  const [dateError, setDateError] = useState(false)

  const [categoryErrorMessage, setCategoryErrorMessage] = useState('')
  const [typeErrorMessage, setTypeErrorMessage] = useState('')
  const [valueErrorMessage, setValueErrorMessage] = useState('')
  const [dateErrorMessage, setDateErrorMessage] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const [name, value] = [e.target.name, e.target.value]
    console.log(name, value)
    switch (name) {
      case 'category':
        setCategory(value)
        setCategoryError(false)
        break
      case 'type':
        setType(value)
        setTypeError(false)
        break
      case 'value':
        setValue(+value)
        setValueError(false)
        break
      case 'date':
        setDate(value)
        setDateError(false)
    }
  }

  return (
    <dialog ref={modalRef} className="w-2/3 h-1/2 z-10 rounded-lg">
      <div className="p-5">
        <form >
          <Input label="Tipo" inputClassName={'bg-black'}
            name="category"
            type="text"
            value={category}
            onChange={handleInputChange}
            error={categoryError}
            errorMessage={categoryErrorMessage} />
          <div className="flex flex-col">
            <label htmlFor="type">Categoria</label>
            <select name="type" id="type" value={type} onChange={handleInputChange} className="bg-black bg-opacity-10 border-white border p-2 rounded-md w-full">
              <option value="entrada">Entrada</option>
              <option value="saida">Saida</option>
            </select>
          </div>
          <Input label="Valor" inputClassName={'bg-black'}
            name="value"
            type="number"
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
        </form>
      </div>
    </dialog>
  )
}
