'use-client'

import { AppShell } from '@mantine/core'
import Image from 'next/image'
import { useState } from 'react'
import { Links, Logo } from './styles'

type AppShellNavbar = {
  links: {
    link: string
    name: string
    icon: string
  }[]
}

export default function AppShellNavbar({ links }: AppShellNavbar) {
  const [active, setActive] = useState('Dashboard')

  return (
    <AppShell.Navbar p='md'>
      <Logo>
        <Image
          src={'/Logo.svg'}
          alt='Emprestimos para agro negócio'
          width={120}
          height={50}
          priority={true}
        />
      </Logo>
      {links.map((item) => (
        <Links
          data-active={item.name === active ? 'true' : 'false'}
          href={item.link}
          key={item.name}
          onClick={() => setActive(item.name)}
        >
          <Image width={15} height={15} src={item.icon} alt={item.name} />
          <h5>{item.name}</h5>
        </Links>
      ))}
    </AppShell.Navbar>
  )
}
