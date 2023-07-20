'use client'
import { Header, TransactionsTable } from 'components'
import { useNavbarContext } from 'contexts'

export default function Home() {
  const { mainContent } = useNavbarContext()

  return (
    <>
      <Header />
      <div className='bg-cyan-800 rounded-t-3xl p-6'>
        <TransactionsTable />
      </div>
    </>
  )
}
