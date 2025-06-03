import { AppShell, Burger, TextInput } from '@mantine/core'
import { useSession } from 'next-auth/react'
import { Dispatch, SetStateAction } from 'react'
import { AppShellHeaderContainer } from './styles'
import Image from 'next/image'
import { useProdutoresStore } from '@/store/produtoresStore'
import { usePathname } from 'next/navigation'

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
  const { setSearch, search } = useProdutoresStore()
  const pathname = usePathname()

  const routesAbleToSearch = ['/system/produtores']

  return (
    <AppShell.Header>
      <AppShellHeaderContainer>
        <h3>Bem-vindo, {session?.user?.name}</h3>
        <TextInput
          placeholder='Pesquisar'
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          disabled={!routesAbleToSearch.includes(pathname)}
          rightSection={
            <Image
              src={'/icons/search.svg'}
              alt='Pesquisar'
              width={15}
              height={15}
            />
          }
        />
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
