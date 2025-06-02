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
import { useCreateProdutor } from '@/app/hooks/useProdutores/useCreateProdutor'
import { Button, Modal } from '@mantine/core'
import { useProdutoresStore } from '@/store/produtoresStore'

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
    isLoading,
    isDeleting,
    isEditing,
  } = useProdutores(activePage)

  const handleDelete = (row: ProdutorType) => {
    form.setValues(row)
    setOpenModalDelete(true)
  }

  const {
    mutate: criarProdutor,
    isPending,
    error: ErrorMutation,
  } = useCreateProdutor()

  // Exemplo de uso:
  const handleCreate = (data: ProdutorType) => {
    criarProdutor(data)
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

  if (isLoading || isPending || isDeleting || isEditing)
    return <p>Carregando produtores...</p>

  if (ErrorMutation) {
    return <p>Erro ao renderizar produtores</p>
  }

  return (
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
      {produtores!.length === 0 ? (
        <div className='no-data-table-wrapper'>
          <p>Não há dados disponíveis</p>
        </div>
      ) : (
        <TableCustumized
          setPaginationValue={setActivePage}
          paginationValue={activePage}
          totalData={total ?? 1}
          headers={headers}
          rows={produtores}
          onDelete={(row) => handleDelete(row)}
          onEdit={(row) => handleEdit(row)}
        />
      )}

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
  )
}
