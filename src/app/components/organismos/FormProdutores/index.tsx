'use-client'

import {
  Button,
  Group,
  MultiSelect,
  NumberInput,
  Radio,
  Select,
  TextInput,
} from '@mantine/core'
import { FormInputs, FormProdutoresContainer, Title } from './styles'
import {
  produtoresInitialValues,
  ProdutorType,
} from '../../../../../types/interfaces/produtores'
import { UseFormReturnType } from '@mantine/form'
import { Inputcpf } from '../../atomos/InputCPF'
import { useState } from 'react'
import InputCnpj from '../../atomos/InputCNPJ'

type FormProdutorProps = {
  initialValues?: ProdutorType
  onSubmit: (values: ProdutorType) => void
  form: UseFormReturnType<ProdutorType>
  submitLabel?: string
  setOpenForm: (value: boolean) => void
  openForm: boolean
}

export default function FormProdutores({
  form,
  onSubmit,
  openForm,
  setOpenForm,
}: FormProdutorProps) {
  const [isFisicalPerson, setIsFisicalPerson] = useState('fisica')

  const submitValues = (row: ProdutorType) => {
    onSubmit(row)
  }

  return (
    <FormProdutoresContainer>
      <Title>
        <div className='text'>
          <h2>Registre Produtores no sistema</h2>
          <p>Adicione, delete e edite os produtores</p>
        </div>
        <div className='buttons'>
          {openForm && (
            <Button
              onClick={() => setOpenForm(false)}
              variant='outline'
              color='red'
              className='button'
            >
              Cancelar
            </Button>
          )}
          <Button
            className='button'
            onClick={() => {
              if (openForm) {
                form.onSubmit(submitValues)()
              } else {
                form.setValues(produtoresInitialValues)
                setOpenForm(true)
              }
            }}
            color='green'
          >
            {openForm ? 'Salvar' : 'Criar'}
          </Button>
        </div>
      </Title>

      {openForm && (
        <>
          <FormInputs>
            <div className='dialog'>
              <Radio.Group
                name='isPessoaFisica'
                label='Pessoa fisica ou juridica?'
                value={isFisicalPerson}
                onChange={(e) => {
                  setIsFisicalPerson(e)
                }}
                style={{ margin: '20px 0' }}
              >
                <Group mt='xs'>
                  <Radio color='green' value='fisica' label='Fisíca' />
                  <Radio color='green' value='juridica' label='Jurídica' />
                </Group>
              </Radio.Group>
            </div>
            <TextInput
              label='Nome do Produtor'
              {...form.getInputProps('nomeProdutor')}
              error={form.getInputProps('nomeProdutor').error}
              required
            />

            {isFisicalPerson === 'fisica' ? (
              <Inputcpf form={form} />
            ) : (
              <InputCnpj form={form} />
            )}

            <TextInput
              label='Nome da Fazenda'
              {...form.getInputProps('nomeFazenda')}
              error={form.getInputProps('nomeFazenda').error}
              required
            />

            <NumberInput
              label='Total de Hectares'
              {...form.getInputProps('totalHectares')}
              error={form.getInputProps('totalHectares').error}
              min={1}
              required
            />

            <NumberInput
              label='Área Agricultável'
              {...form.getInputProps('areaAgricultavel')}
              error={form.getInputProps('areaAgricultavel').error}
              min={0}
              required
            />

            <NumberInput
              label='Área de Vegetação'
              {...form.getInputProps('areaVegetacao')}
              error={form.getInputProps('areaVegetacao').error}
              min={0}
              required
            />

            <MultiSelect
              label='Culturas Plantadas'
              data={['Soja', 'Milho', 'Algodão', 'Café', 'Cana de Açucar']}
              {...form.getInputProps('culturasPlantadas')}
              error={form.getInputProps('culturasPlantadas').error}
              required
            />

            <Select
              label='Estado'
              data={['SP', 'MG', 'PR', 'RS', 'BA']}
              error={form.getInputProps('estado').error}
              {...form.getInputProps('estado')}
              required
            />

            <TextInput
              label='Cidade'
              error={form.getInputProps('cidade').error}
              {...form.getInputProps('cidade')}
              required
            />
          </FormInputs>
        </>
      )}
    </FormProdutoresContainer>
  )
}
