/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '../../../../../test-utils'
import FormProdutores from '.'
import { produtoresInitialValues } from '../../../../../types/interfaces/produtores'

jest.mock('@mantine/form', () => ({
  useForm: () => ({
    values: produtoresInitialValues,
    getInputProps: () => ({}),
    setFieldValue: () => {},
    onSubmit: (fn: any) => (e: any) => {
      e.preventDefault()
      fn(produtoresInitialValues)
    },
  }),
}))

describe('FormProdutores', () => {
  it('deve renderizar os dados do form corretamente', () => {
    // Criando um objeto fake para passar no form
    const fakeForm: any = {
      values: produtoresInitialValues,
      getInputProps: () => ({}),
      setFieldValue: () => {},
      onSubmit: (fn: any) => (e: any) => {
        e.preventDefault()
        fn(produtoresInitialValues)
      },
    }

    render(
      <FormProdutores
        form={fakeForm}
        onSubmit={() => {}}
        openForm={true}
        setOpenForm={() => {}}
      />
    )

    const submitButton = screen.getByText('Salvar')
    expect(submitButton).toBeDefined()
  })
})
