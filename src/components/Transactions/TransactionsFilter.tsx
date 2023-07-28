'use client'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { NewTransactionsModal } from 'components/Transactions/NewTransactionsModal';
import { useUserDataContext } from 'contexts/UserDataContext';
import { Plus } from 'lucide-react';
import { useRef } from 'react';

export function TransactionsFilter() {
  const { transactions,
    yearFilter, setYearFilter, categoryFilter, setCategoryFilter } = useUserDataContext()
  const uniqueYears = Array.from(new Set(transactions.map(({ date }) => new Date(date).getFullYear())));
  const uniqueCategories = Array.from(new Set(transactions.map(({ category }) => category)));

  const modalRef = useRef<HTMLDialogElement>(null)

  const handleYearChange = (event: SelectChangeEvent) => {
    setYearFilter(+(event.target.value));
  };
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategoryFilter(event.target.value);
  };
  const handleNewTransactionsModal = () => {
    modalRef.current?.showModal()
  }

  return (
    <div className='flex flex-col w-full'>
      <div className='flex w-full gap-2'>
        <FormControl fullWidth size="small" >
          <InputLabel htmlFor="year">Ano</InputLabel>
          <Select
            labelId="year"
            id="year"
            value={yearFilter ? yearFilter.toString() : ''}
            label="Age"
            defaultValue={yearFilter ? yearFilter.toString() : ''}
            onChange={handleYearChange}
          >
            <MenuItem value={''} id='none'>
              <em>Todos</em>
            </MenuItem>
            {uniqueYears.map(year => {
              return <MenuItem key={year} id={year.toString()} value={year}>{year}</MenuItem>
            })}
          </Select>
        </FormControl >
        <FormControl fullWidth size="small">
          <InputLabel htmlFor="category">Tipo</InputLabel>
          <Select
            labelId="category"
            id="category"
            value={categoryFilter ? categoryFilter : ''}
            label="Categoria"
            onChange={handleCategoryChange}
            defaultValue={categoryFilter ? categoryFilter : ''}
          >
            <MenuItem value={''} id='none'>
              <em>Todos</em>
            </MenuItem>
            {uniqueCategories.map(category => {
              return <MenuItem key={category} id={category} value={category}>{category}</MenuItem>
            })}
          </Select>
        </FormControl>
        <button className="border-cyan-50 border rounded-lg px-1"
          onClick={handleNewTransactionsModal} >
          <Plus fill='black' />
        </button>
      </div>
      <NewTransactionsModal modalRef={modalRef} />
    </div>
  )
}