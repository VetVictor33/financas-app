'use client'
import { Header, TransactionsChart, TransactionsResume, TransactionsTable } from 'components'
import { useNavbarContext } from 'contexts'

export default function Home() {
  const { mainContentIndex } = useNavbarContext()

  return (
    <>
      <Header />
      <div className='bg-cyan-800 rounded-t-3xl p-6 flex flex-col flex-grow'>
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
