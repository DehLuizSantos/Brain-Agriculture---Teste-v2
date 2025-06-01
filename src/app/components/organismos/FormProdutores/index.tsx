'use-client'
import { Dispatch, SetStateAction } from 'react'
import {
  Button,
  MultiSelect,
  NumberInput,
  Select,
  TextInput,
} from '@mantine/core'
import { FormInputs, FormProdutoresContainer, Title } from './styles'
import { ProdutorType } from '../../../../../types/interfaces/produtores'
import { UseFormReturnType } from '@mantine/form'

type FormProdutorProps = {
  initialValues?: ProdutorType
  onSubmit: (values: ProdutorType) => void
  form: UseFormReturnType<ProdutorType>
  submitLabel?: string
  setOpenForm: Dispatch<SetStateAction<boolean>>
  openForm: boolean
}
export default function FormProdutores({
  form,
  onSubmit,
  openForm,
  setOpenForm,
}: FormProdutorProps) {
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
            onClick={() =>
              openForm ? submitValues(form.values) : setOpenForm(!openForm)
            }
            color='green'
          >
            {openForm ? 'Salvar' : 'Criar'}
          </Button>
        </div>
      </Title>

      {openForm && (
        <FormInputs>
          <TextInput
            placeholder='Nome do Produtor'
            {...form.getInputProps('nomeProdutor')}
            required
          />

          <TextInput
            placeholder='Documento'
            {...form.getInputProps('documento')}
            required
          />

          <TextInput
            placeholder='Nome da Fazenda'
            {...form.getInputProps('nomeFazenda')}
            required
          />

          <NumberInput
            placeholder='Total de Hectares'
            {...form.getInputProps('totalHectares')}
            min={1}
            required
          />

          <NumberInput
            placeholder='Área Agricultável'
            {...form.getInputProps('areaAgricultavel')}
            min={0}
            required
          />

          <NumberInput
            placeholder='Área de Vegetação'
            {...form.getInputProps('areaVegetacao')}
            min={0}
            required
          />

          <MultiSelect
            placeholder='Culturas Plantadas'
            data={['Soja', 'Milho', 'Algodão', 'Café', 'Cana de Açucar']}
            {...form.getInputProps('culturasPlantadas')}
            required
          />

          <Select
            placeholder='Estado'
            data={['SP', 'MG', 'PR', 'RS', 'BA']}
            {...form.getInputProps('estado')}
            required
          />

          <TextInput
            placeholder='Cidade'
            {...form.getInputProps('cidade')}
            required
          />
        </FormInputs>
      )}
    </FormProdutoresContainer>
  )
}
