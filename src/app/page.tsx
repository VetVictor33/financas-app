'use client'
import { Header } from 'components'
import { useNavbarContext } from 'contexts'
import { HOME_CONTENT } from 'helpers'

export default function Home() {
  const { mainContent } = useNavbarContext()

  return (
    <>
      <Header />
    </>
  )
}
