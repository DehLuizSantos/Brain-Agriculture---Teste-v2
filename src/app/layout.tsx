import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import '@mantine/core/styles.css'
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core'
import { Providers } from './providers'
import { GlobalStyles } from '../styles/styles'

export const metadata: Metadata = {
  title: 'Brain Agro',
  description: 'Dashboard and login module',
}

const roboto = Roboto({
  variable: '--font-roboto',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='pt-BR' {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${roboto.variable}`}>
        <GlobalStyles />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
