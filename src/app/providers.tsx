'use client'

import { ReactNode, useState } from 'react'
import { MantineProvider } from '@mantine/core'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import { ThemeProvider } from '@emotion/react'
import { GlobalStyles } from '@/styles/styles'
import { emotionTransform, MantineEmotionProvider } from '@mantine/emotion'
import { RootStyleRegistry } from './EmotionRootStyleRegistry'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface ProvidersProps {
  children: ReactNode
  session?: Session | null
}

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      white: string
      dark: string
      leaf: string
      primary: string
      secundary: string
      tertiary: string
      red: string
      green: string
      grey: {
        300: string
        500: string
      }
    }
    fonts: {
      xsmall: string
      small: string
      medium: string
      large: string
      xlarge: string
    }
  }
}

export function Providers({ children, session }: ProvidersProps) {
  const theme = {
    colors: {
      white: '#F4F5F6',
      dark: '#242529',
      leaf: '#34353E',
      grey: {
        300: '#CDCCD1',
        500: '#65656E',
      },
      primary: '#A7ABFF',
      secundary: '#F79F75',
      tertiary: '#B7735D',
      red: '#BE2C3F',
      green: '#2CBE64',
    },
    fonts: {
      xsmall: '12px',
      small: '14px',
      medium: '16px',
      large: '18px',
      xlarge: '28px',
    },
  }

  const [client] = useState(() => new QueryClient())

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={client}>
        <RootStyleRegistry>
          <MantineEmotionProvider>
            <ThemeProvider theme={theme}>
              <MantineProvider
                stylesTransform={emotionTransform}
                defaultColorScheme='dark'
              >
                <GlobalStyles />

                {children}
              </MantineProvider>
            </ThemeProvider>
          </MantineEmotionProvider>
        </RootStyleRegistry>
      </QueryClientProvider>
    </SessionProvider>
  )
}
