'use-client'

import Image from 'next/image'
import { useState } from 'react'
import { Links, Logo, Navbar } from './styles'
import { usePathname } from 'next/navigation'

type AppShellNavbar = {
  links: {
    link: string
    name: string
    icon: string
  }[]
}

export default function AppShellNavbar({ links }: AppShellNavbar) {
  const pathname = usePathname()
  const [active, setActive] = useState(pathname)

  return (
    <Navbar p='md'>
      <Logo>
        <Image
          src={'/Logo.svg'}
          alt='Emprestimos para agro negócio'
          height={50}
          width={100}
          priority={true}
        />
      </Logo>
      {links.map((item) => (
        <Links
          data-active={item.link === active ? 'true' : 'false'}
          href={item.link}
          key={item.name}
          onClick={() => setActive(item.link)}
        >
          <Image
            width={15}
            height={15}
            src={item.icon}
            alt={item.name}
            priority={true}
          />
          <h5>{item.name}</h5>
        </Links>
      ))}
    </Navbar>
  )
}
