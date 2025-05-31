import { AppShell, Burger } from '@mantine/core'
import { useSession } from 'next-auth/react'
import { Dispatch, SetStateAction } from 'react'
import { AppShellHeaderContainer } from './styles'

type AppShellHeaderProps = {
  mobileOpened: boolean
  setDesktopOpened: Dispatch<SetStateAction<boolean>>
  desktopOpened: boolean
  setMobileOpened: Dispatch<SetStateAction<boolean>>
}

export default function AppShellHeader({
  mobileOpened,
  setDesktopOpened,
  desktopOpened,
  setMobileOpened,
}: AppShellHeaderProps) {
  const { data: session } = useSession()

  return (
    <AppShell.Header>
      <AppShellHeaderContainer>
        <h3>Bem-vindo, {session?.user?.name}</h3>
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
      </AppShellHeaderContainer>
    </AppShell.Header>
  )
}
