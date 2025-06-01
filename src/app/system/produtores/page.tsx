'use client'
import TableCustumized, { Header } from '@/app/components/organismos/Table'
import { mockProdutores } from '../../../../mock/data'
import {
  produtoresInitialValues,
  produtoresSchema,
  ProdutorType,
} from '../../../../types/interfaces/produtores'
import { ProdutoresWrapper } from './styles'
import { useState } from 'react'
import FormProdutores from '@/app/components/organismos/FormProdutores'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'

export default function Produtores() {
  const [openForm, setOpenform] = useState(false)
  const form = useForm<ProdutorType>({
    initialValues: produtoresInitialValues,
    validate: zodResolver(produtoresSchema),
  })
  const [activePage, setPage] = useState(1)

  const handleEdit = (row: ProdutorType) => {
    setOpenform(true)
    form.setValues(row)
  }

  const handleDelete = (row: ProdutorType) => {
    console.log('Delete:', row)
  }

  const handleCreate = (row: ProdutorType) => {
    console.log(row)
  }
  const headers: Header<ProdutorType>[] = [
    { key: 'nomeProdutor', label: 'Nome do Produtor' },
    { key: 'documento', label: 'Documento' },
    { key: 'nomeFazenda', label: 'Nome da Fazenda' },
    { key: 'totalHectares', label: 'Total de Hectares' },
    { key: 'areaAgricultavel', label: 'Área Agricultável' },
    { key: 'areaVegetacao', label: 'Área de Vegetação' },
    { key: 'culturasPlantadas', label: 'Culturas Plantadas' },
    { key: 'estado', label: 'Estado' },
    { key: 'cidade', label: 'Cidade' },
  ]

  return (
    <ProdutoresWrapper>
      <FormProdutores
        openForm={openForm}
        setOpenForm={setOpenform}
        form={form}
        onSubmit={(formValues) => handleCreate(formValues)}
      />
      <TableCustumized
        setPaginationValue={setPage}
        paginationValue={activePage}
        totalData={mockProdutores.length}
        headers={headers}
        rows={mockProdutores}
        onEdit={(row) => handleEdit(row)}
        onDelete={handleDelete}
      />
    </ProdutoresWrapper>
  )
}
