'use client'
import TableCustumized, { Header } from '@/app/components/organismos/Table'
import {
  produtoresInitialValues,
  ProdutorType,
} from '../../../../types/interfaces/produtores'
import { ProdutoresWrapper } from './styles'
import FormProdutores from '@/app/components/organismos/FormProdutores'

import { useProdutores } from '@/app/hooks/useProdutores'
import { Button, Modal } from '@mantine/core'
import { useProdutoresStore } from '@/store/produtoresStore'
import { FadingComponent } from '@/app/components/atomos/FadingAnimation'
import { useCallback } from 'react'

export default function Produtores() {
  // Estado global com Zustand
  const {
    setOpenForm,
    openModalDelete,
    setOpenModalDelete,
    activePage,
    setActivePage,
    search,
    setProdutores,
    produtores: produtoresZustand,
  } = useProdutoresStore()

  const handleEdit = (row: ProdutorType) => {
    setProdutores(row)
    setOpenForm(true)
  }

  /* Requisições Hooks */
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
    setProdutores(row)
    setOpenModalDelete(true)
  }

  // Exemplo de uso:
  const handleCreate = useCallback(
    (data: ProdutorType) => {
      addProdutor(data)
      setOpenForm(false)
      setProdutores(produtoresInitialValues)
    },
    [addProdutor, setOpenForm, setProdutores]
  )

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

  const handleSubmit = useCallback(
    (formValues: ProdutorType) => {
      if (produtoresZustand!.id) {
        editProdutor({
          id: formValues.id!,
          data: formValues!,
        })
      } else {
        handleCreate(formValues)
      }
    },
    [produtoresZustand, handleCreate, editProdutor]
  )

  if (loading) return <p>Carregando produtores...</p>

  if (error) {
    return <p>Erro ao renderizar produtores</p>
  }

  return (
    <FadingComponent duration={50}>
      <ProdutoresWrapper>
        <FormProdutores
          initialValues={produtoresZustand}
          onSubmit={(formValues) => {
            handleSubmit(formValues)
          }}
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
          size='xs'
          title={`Deletar:
              ${produtoresZustand!.nomeProdutor}`}
          opened={openModalDelete}
          centered
          transitionProps={{ transition: 'fade', duration: 200 }}
          onClose={() => setOpenModalDelete(false)}
        >
          <Button
            color='red'
            fullWidth
            onClick={() => deleteProdutor(Number(produtoresZustand!.id))}
          >
            Confirmar
          </Button>
        </Modal>
      </ProdutoresWrapper>
    </FadingComponent>
  )
}
