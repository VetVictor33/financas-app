'use client'
import { LineChart } from '@mui/x-charts/LineChart';
import { Alert } from '@mui/material';
import { useUserDataContext } from 'contexts/UserDataContext';
import { formatDate, formatMoneyReturningNumber } from 'utils';
import { useEffect } from 'react'

export function TransactionsChart() {
  const { filteredTransactions, filterTransactions, yearFilter, categoryFilter } = useUserDataContext()


  const yearAxis = filteredTransactions.map((({ date }) => +formatDate(date, "MM")))
  const valueAxis = filteredTransactions.map(({ value }) => formatMoneyReturningNumber(value))

  useEffect(() => {
    filterTransactions()
  }, [yearFilter, categoryFilter])
  if ((!yearFilter || !categoryFilter)) return (
    <Alert severity='info' className='mt-2'>Selecione os filtros</Alert>)
  if ((!yearAxis.length || !valueAxis.length)) return (
    <Alert severity='info' className='mt-2'>Não há dados para essa série</Alert>)
  return (
    <LineChart
      xAxis={[{
        id: yearFilter?.toString(),
        label: 'Mês',
        scaleType: 'log',
        data: yearAxis
      }]}
      series={[
        {
          id: categoryFilter,
          data: valueAxis,
          label: categoryFilter,
          area: true,
        },
      ]}
      sx={{
        '--ChartsLegend-itemWidth': '100%',
      }}
    />
  );
}
