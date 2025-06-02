import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import '@mantine/core/styles.css'
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Brain Agro',
  description: 'Dashboard and login module',
}

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='pt-BR' {...mantineHtmlProps} className={roboto.variable}>
      <head>
        <ColorSchemeScript defaultColorScheme='dark' />
      </head>
      <body className={`${roboto.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
