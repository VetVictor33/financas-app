'use client'
import { Header, TransactionsChart, TransactionsFilter, TransactionsResume, TransactionsTable } from 'components'
import { useNavbarContext, useUserDataContext } from 'contexts'
import { getTransactions } from 'database'
import { checkToken } from 'helpers'
import { ITransactions } from 'interfaces'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const { setTransactions, filterTransactions } = useUserDataContext()
  const { mainContentIndex } = useNavbarContext()
  const router = useRouter()
  const hasToken = checkToken()
  if (!hasToken) router.push('/login')

  async function setData() {
    try {
      const { data }: { data: Array<ITransactions> } = await getTransactions()
      setTransactions(data)
      filterTransactions()
    } catch (error) {
      console.log(error)
    }
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
