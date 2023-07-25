'use client'
import { Header, TransactionsChart, TransactionsFilter, TransactionsResume, TransactionsTable } from 'components'
import { useNavbarContext } from 'contexts'
import { useUserDataContext } from 'contexts/UserDataContext'
import { mockData } from 'data.mock/mockData'
import { checkToken } from 'helpers'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const { setTransactions, filterTransactions } = useUserDataContext()
  const { mainContentIndex } = useNavbarContext()
  const router = useRouter()
  const hasToken = checkToken()
  if (!hasToken) router.push('/login')

  function setData() {
    const mockedTransactions = mockData[0].transactions
    setTransactions(mockedTransactions)
    filterTransactions()
  }
  useEffect(() => { setData() }, [])
  return (
    <>
      <Header />
      <div className='bg-cyan-800 rounded-t-3xl p-6 flex flex-col flex-grow'>
        <TransactionsFilter />
        <div className='flex flex-col flex-grow'>
          {mainContentIndex === 0 ?
            <TransactionsTable />
            :
            <TransactionsChart />
          }
        </div>
        <TransactionsResume />
      </div>
    </>
  )
}
