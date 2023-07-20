import { AppContexts } from 'contexts'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Finanças App',
  description: 'O seu app de finanças',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <AppContexts>
          {children}
        </AppContexts>
      </body>
    </html>
  )
}
