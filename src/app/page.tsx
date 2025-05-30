'use client'

import { Container, Title } from '@/styles/container'
import { Button, TextInput, PasswordInput } from '@mantine/core'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormContainer, Logo } from './styles'

export default function LoginPage() {
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('admin')
  const router = useRouter()
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: '/dashboard',
    })

    if (res?.error) {
      setError('Credenciais inválidas')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <Container>
      <Logo>
        <Title>Brain Agro Control</Title>
        <Image
          src={'/Logo.svg'}
          alt='Emprestimos para agro negócio'
          width={140}
          height={62}
        />
      </Logo>
      <FormContainer onSubmit={handleSubmit}>
        <TextInput
          placeholder='you@example.com'
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          required
          mt='md'
        />
        <PasswordInput
          placeholder='••••••••'
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
          mt='md'
        />
        {error && <div>{error}</div>}
        <Button color={'green'} fullWidth mt='xl' type='submit'>
          Entrar
        </Button>
      </FormContainer>
    </Container>
  )
}
