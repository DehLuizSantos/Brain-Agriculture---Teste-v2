'use client'

import { Button, TextInput, PasswordInput } from '@mantine/core'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ContainerLogin, FormContainer, Logo } from './styles'
import { useForm } from '@mantine/form'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: 'admin@example.com',
      password: 'admin',
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : 'O email deve ser admin@example.com',
      password: (value) =>
        value === 'admin' ? null : 'A senha deve ser admin',
    },
  })

  const handleSubmit = async () => {
    setLoading(true)
    const res = await signIn('credentials', {
      redirect: false,
      email: form.values.email,
      password: form.values.password,
      callbackUrl: '/dashboard',
    })

    if (!form.isValid()) {
      form.setErrors({ email: res?.error, password: res?.error })
      setLoading(false)
    } else {
      router.push('/system/dashboard')
      setLoading(false)
    }
  }

  return (
    <ContainerLogin>
      <FormContainer onSubmit={form.onSubmit(() => handleSubmit())}>
        <Logo>
          <Image
            src={'/Logo.svg'}
            alt='Emprestimos para agro negócio'
            width={140}
            height={62}
            priority={true}
          />
        </Logo>
        <TextInput
          placeholder='you@example.com'
          required
          {...form.getInputProps('email')}
          mt='md'
          error={form.getInputProps('email').error}
        />
        <PasswordInput
          placeholder='••••••••'
          {...form.getInputProps('password')}
          error={form.getInputProps('password').error}
          required
          mt='md'
        />
        <Button
          color={'green'}
          fullWidth
          mt='xl'
          type='submit'
          loading={loading}
        >
          Entrar
        </Button>
      </FormContainer>
    </ContainerLogin>
  )
}
