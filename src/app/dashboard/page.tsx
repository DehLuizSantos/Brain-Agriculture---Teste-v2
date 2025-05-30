'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  if (status === 'loading') return <p>Carregando...</p>

  return (
    <div>
      <h1>Bem-vindo, {session?.user?.name}</h1>
      <p>Email: {session?.user?.email}</p>
    </div>
  )
}
