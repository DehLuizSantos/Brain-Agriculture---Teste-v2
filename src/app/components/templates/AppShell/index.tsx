'use client'

import { AppShell } from '@mantine/core'
import { ReactNode, useState } from 'react'
import { Providers } from '@/app/providers'
import AppShellNavbar from '../AppShellNavbar'
import AppShellHeader from '../AppShellHeader'
import { Main } from './styles'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function LayoutWithSidebar({ children }: DashboardLayoutProps) {
  const [mobileOpened, setMobileOpened] = useState(false)
  const [desktopOpened, setDesktopOpened] = useState(true)

  const links = [
    {
      link: '/system/dashboard',
      name: 'Dashboard',
      icon: '/icons/view-dashboard.svg',
    },
    {
      link: '/system/produtores',
      name: 'Produtores',
      icon: '/icons/view-produtores.svg',
    },
  ]

  return (
    <Providers>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 200,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding='md'
      >
        <AppShellHeader
          desktopOpened={desktopOpened}
          mobileOpened={mobileOpened}
          setDesktopOpened={setDesktopOpened}
          setMobileOpened={setMobileOpened}
        />

        <AppShellNavbar links={links} />

        <Main>{children}</Main>
      </AppShell>
    </Providers>
  )
}
