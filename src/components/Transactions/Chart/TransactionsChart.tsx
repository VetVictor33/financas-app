'use client'
import { LineChart } from '@mui/x-charts/LineChart';
import { Alert } from '@mui/material';
import { useUserDataContext } from 'contexts/UserDataContext';
import { formatDate, formatMoneyFromCents } from 'utils';
import { useEffect } from 'react'

export function TransactionsChart() {
  const { filteredTransactions, filterTransactions, yearFilter, categoryFilter } = useUserDataContext()


  const yearAxis = filteredTransactions.map((({ date }) => formatDate(date, "MM")))
  const valueAxis = filteredTransactions.map(({ value }) => formatMoneyFromCents(value))

  const isNegative = filteredTransactions.find(({ type }) => type === 'saida')

  useEffect(() => {
    filterTransactions()
  }, [yearFilter, categoryFilter])
  if ((!yearFilter || !categoryFilter)) return (
    <Alert severity='info' className='mt-2'>Selecione os filtros</Alert>)
  if ((!yearAxis.length || !valueAxis.length)) return (
    <Alert severity='info' className='mt-2'>Não há dados para essa série</Alert>)
  return (
    <LineChart className='min-h-full'
      xAxis={[{
        id: yearFilter?.toString(),
        label: 'Mês',
        scaleType: 'band',
        data: yearAxis,
      }]}
      series={[
        {
          id: categoryFilter,
          data: valueAxis,
          label: categoryFilter,
          area: true,
          color: isNegative ? '#DC2626' : '#2563EB'
        },
      ]}
      sx={{
        '--ChartsLegend-itemWidth': '100%',
      }}
    />
  );
}
