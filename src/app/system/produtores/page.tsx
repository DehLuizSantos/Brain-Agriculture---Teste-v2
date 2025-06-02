'use client'
import TableCustumized, { Header } from '@/app/components/organismos/Table'
import {
  produtoresInitialValues,
  produtoresSchema,
  ProdutorType,
} from '../../../../types/interfaces/produtores'
import { ProdutoresWrapper } from './styles'
import FormProdutores from '@/app/components/organismos/FormProdutores'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'
import { useProdutores } from '@/app/hooks/useProdutores'
import { Button, Modal } from '@mantine/core'
import { useProdutoresStore } from '@/store/produtoresStore'
import { FadingComponent } from '@/app/components/atomos/FadingAnimation'

export default function Produtores() {
  const form = useForm<ProdutorType>({
    initialValues: produtoresInitialValues,
    validate: zodResolver(produtoresSchema),
  })
  // Estado global com Zustand
  const {
    openForm,
    setOpenForm,
    openModalDelete,
    setOpenModalDelete,
    activePage,
    setActivePage,
    search,
  } = useProdutoresStore()

  const handleEdit = (row: ProdutorType) => {
    form.setValues(row)
    setOpenForm(true)
  }

  const {
    produtores,
    total,
    deleteProdutor,
    editProdutor,
    addProdutor,
    error,
    loading,
  } = useProdutores(activePage, search)

  const handleDelete = (row: ProdutorType) => {
    form.setValues(row)
    setOpenModalDelete(true)
  }

  // Exemplo de uso:
  const handleCreate = (data: ProdutorType) => {
    addProdutor(data)
    setOpenForm(false)
    form.reset()
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

  if (loading) return <p>Carregando produtores...</p>

  if (error) {
    return <p>Erro ao renderizar produtores</p>
  }

  return (
    <FadingComponent duration={50}>
      <ProdutoresWrapper>
        <FormProdutores
          openForm={openForm}
          setOpenForm={setOpenForm}
          form={form}
          onSubmit={(formValues) =>
            form.values.id
              ? editProdutor({ id: form.values.id, data: form.values })
              : handleCreate(formValues)
          }
        />

        <TableCustumized
          setPaginationValue={setActivePage}
          paginationValue={activePage}
          totalData={total ?? 1}
          headers={headers}
          rows={produtores}
          onDelete={(row) => handleDelete(row)}
          onEdit={(row) => handleEdit(row)}
        />

        <Modal
          title={`Tem certeza que deseja deletar o produtor: ${form.values.nomeProdutor}`}
          opened={openModalDelete}
          centered
          transitionProps={{ transition: 'fade', duration: 200 }}
          onClose={() => setOpenModalDelete(false)}
        >
          <Button
            color='red'
            fullWidth
            onClick={() => deleteProdutor(Number(form.values.id))}
          >
            Confirmar
          </Button>
        </Modal>
      </ProdutoresWrapper>
    </FadingComponent>
  )
}
