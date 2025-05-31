'use client'

import { AppShell, Burger, Group } from '@mantine/core'
import { ReactNode, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Providers } from '@/app/providers'
import AppShellNavbar from '../AppShellNavbar'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function LayoutWithSidebar({ children }: DashboardLayoutProps) {
  const [mobileOpened, setMobileOpened] = useState(false)
  const [desktopOpened, setDesktopOpened] = useState(true)
  const { data: session } = useSession()

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
        <AppShell.Header>
          <Group
            h='100%'
            px='md'
            justify='space-between'
            align='center'
            gap={2}
          >
            <div className='aside'>
              <Burger
                opened={mobileOpened}
                onClick={() => setMobileOpened(!mobileOpened)}
                hiddenFrom='sm'
                size='sm'
              />
              <Burger
                opened={desktopOpened}
                onClick={() => setDesktopOpened(!desktopOpened)}
                visibleFrom='sm'
                size='sm'
              />
            </div>
            <p>Bem-vindo, {session?.user?.name}</p>
          </Group>
        </AppShell.Header>

        <AppShellNavbar links={links} />

        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </Providers>
  )
}
