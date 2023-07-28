'use client'
import { Header, TransactionsChart, TransactionsFilter, TransactionsResume, TransactionsTable } from 'components'
import { useNavbarContext, useUserDataContext } from 'contexts'
import { LocalDatabase } from 'services'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Storage } from 'utils'

export default function Home() {
  const { setTransactions, filterTransactions, user, setUser } = useUserDataContext()
  const { mainContentIndex } = useNavbarContext()

  const router = useRouter()


  async function setData() {
    try {
      const data = LocalDatabase.getTransactions(+Storage.getSessionItem('userId')!)
      setTransactions(data)
      filterTransactions(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (!user) {
      const retrievedUsername = Storage.getSessionItem('username')
      const retrievedUserId = Storage.getSessionItem('userId')
      if (!retrievedUsername || !retrievedUserId) {
        router.push('/login')
      } else {
        setUser({ id: +retrievedUserId, username: retrievedUsername })
      }
    }
    setData()
  })
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
