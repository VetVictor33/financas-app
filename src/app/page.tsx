'use client'
import { Header, TransactionsResume, TransactionsTable } from 'components'
import { useNavbarContext } from 'contexts'

export default function Home() {
  const { mainContent } = useNavbarContext()

  return (
    <>
      <Header />
      <div className='bg-cyan-800 rounded-t-3xl p-6 flex flex-col flex-grow'>
        <TransactionsTable />
        <TransactionsResume />
      </div>
    </>
  )
}
