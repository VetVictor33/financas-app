'use client'
import { LineChart } from '@mui/x-charts/LineChart';
import { useUserDataContext } from 'contexts/UserDataContext';
import { formatDate, formatMoneyFromCentsReturningNumber, formatToNormalizedAndLowercase } from 'utils';


export function TransactionsChart({ filter = 'Salário' }) {
  const { transactions } = useUserDataContext()
  const normalizedCategoryFilter = formatToNormalizedAndLowercase(filter)
  const yearFilter = 2023

  const transactionsFilteredByYear =
    transactions.filter(item => new Date(item.date).getFullYear() === yearFilter)
  const transactionsFilteredByYearAndCategory =
    transactionsFilteredByYear.filter(item => formatToNormalizedAndLowercase(item.category) === normalizedCategoryFilter)

  const yearAxis = transactionsFilteredByYearAndCategory.map(item => +formatDate(item.date, "MM"))
  const valueAxis = transactionsFilteredByYearAndCategory.map(item => formatMoneyFromCentsReturningNumber(item.value))

  console.log(yearAxis, valueAxis)
  return (
    <LineChart
      xAxis={[{
        id: 'Meses',
        label: 'Mês',
        data: yearAxis
      }]}
      series={[
        {
          id: filter,
          data: valueAxis,
          label: filter,
          area: true,
        },
      ]}
      sx={{
        '--ChartsLegend-itemWidth': '100%',
      }}
    />
  );
}
