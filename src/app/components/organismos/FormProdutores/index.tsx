/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
'use client'

import {
  Button,
  Group,
  MultiSelect,
  NumberInput,
  Radio,
  Select,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useFocusTrap } from '@mantine/hooks'
import { zodResolver } from 'mantine-form-zod-resolver'
import { useEffect, useCallback, useMemo, memo, useState } from 'react'
import { isEqual } from 'lodash'
import {
  produtoresInitialValues,
  produtoresSchema,
  ProdutorType,
} from '../../../../../types/interfaces/produtores'
import { useProdutoresStore } from '@/store/produtoresStore'
import InputCnpj from '../../atomos/InputCNPJ'

import { FormInputs, FormProdutoresContainer, Title } from './styles'
import { Inputcpf } from '../../atomos/InputCPF'

type FormProdutorProps = {
  initialValues?: ProdutorType
  onSubmit: (values: ProdutorType) => void
  submitLabel?: string
}

const DocumentoInput = memo(
  ({ isFisicalPerson, form }: { isFisicalPerson: string; form: any }) => {
    return isFisicalPerson === 'fisica' ? (
      <Inputcpf form={form} />
    ) : (
      <InputCnpj form={form} />
    )
  }
)

const FormHeader = memo(
  ({ openForm, setOpenForm, form, submitValues }: any) => (
    <Title>
      <div className='text'>
        <h2>Produtores</h2>
        <p>Adicione, delete e edite os produtores no sistema</p>
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
  )
)

export default function FormProdutores({ onSubmit }: FormProdutorProps) {
  const focusTrapRef = useFocusTrap()

  const [isFisicalPerson, setIsFisicalPerson] = useState('fisica')

  const { openForm, setOpenForm, setProdutores, produtores } =
    useProdutoresStore()

  const form = useForm<ProdutorType>({
    initialValues: produtores,
    validate: zodResolver(produtoresSchema),
  })

  const submitValues = useCallback(
    (row: ProdutorType) => {
      debugger
      setProdutores(row)
      onSubmit(row)
    },
    [onSubmit, setProdutores]
  )

  useEffect(() => {
    if (produtores && !isEqual(form.values, produtores)) {
      form.setValues(produtores)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [produtores])

  const documentoInput = useMemo(
    () => <DocumentoInput isFisicalPerson={isFisicalPerson} form={form} />,
    [isFisicalPerson, form]
  )

  return (
    <FormProdutoresContainer>
      <FormHeader
        openForm={openForm}
        setOpenForm={setOpenForm}
        form={form}
        submitValues={submitValues}
      />

      {openForm && (
        <FormInputs ref={focusTrapRef}>
          <div className='dialog'>
            <Radio.Group
              name='isPessoaFisica'
              label='Pessoa física ou jurídica?'
              value={isFisicalPerson}
              onChange={setIsFisicalPerson}
              className='radio-group'
            >
              <Group mt='xs'>
                <Radio color='green' value='fisica' label='Física' />
                <Radio color='green' value='juridica' label='Jurídica' />
              </Group>
            </Radio.Group>
          </div>

          <TextInput
            label='Nome do Produtor'
            data-autofocus
            {...form.getInputProps('nomeProdutor')}
            required
          />
          {documentoInput}

          <Select
            label='Nome da Fazenda'
            data={[
              'Noite Feliz',
              'Noite Encantada',
              'Sitio do Picapau',
              'Osvald Reis',
            ]}
            {...form.getInputProps('nomeFazenda')}
          />

          <NumberInput
            label='Total de Hectares'
            {...form.getInputProps('totalHectares')}
            min={1}
            required
          />
          <NumberInput
            label='Área Agricultável'
            {...form.getInputProps('areaAgricultavel')}
            min={0}
            required
          />
          <NumberInput
            label='Área de Vegetação'
            {...form.getInputProps('areaVegetacao')}
            min={0}
            required
          />

          <MultiSelect
            label='Culturas Plantadas'
            data={['Soja', 'Milho', 'Algodão', 'Café', 'Cana de Açucar']}
            {...form.getInputProps('culturasPlantadas')}
            required
          />

          <Select
            label='Estado'
            data={['SP', 'MG', 'PR', 'RS', 'BA']}
            {...form.getInputProps('estado')}
            required
          />
          <TextInput
            label='Cidade'
            {...form.getInputProps('cidade')}
            required
          />
        </FormInputs>
      )}
    </FormProdutoresContainer>
  )
}
