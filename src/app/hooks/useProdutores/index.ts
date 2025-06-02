import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ProdutorType } from '../../../../types/interfaces/produtores'
import { useProdutoresStore } from '@/store/produtoresStore'

const PAGE_SIZE = 20

type FetchResponse = {
  data: ProdutorType[]
  total: number
}

export function useProdutores(paginationValue: number) {
  const queryClient = useQueryClient()
  const { setOpenForm, setOpenModalDelete, setActivePage } =
    useProdutoresStore()

  // GET: lista paginada de produtores
  const { data, isLoading } = useQuery<FetchResponse>({
    queryKey: ['produtores', paginationValue],
    queryFn: async () => {
      const res = await fetch(
        `/api/produtores?page=${paginationValue}&limit=${PAGE_SIZE}`
      )
      if (!res.ok) throw new Error('Erro ao buscar produtores')
      return res.json()
    },
  })

  // DELETE: produtor
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/produtores/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Erro ao deletar produtor')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['produtores'] })
      setOpenModalDelete(false)
    },
  })

  // PUT: editar produtor
  const editMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: ProdutorType }) => {
      const res = await fetch(`/api/produtores/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Erro ao editar produtor')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['produtores'] })
      setActivePage(1)
      setOpenForm(false)
    },
  })

  return {
    produtores: data?.data ?? [],
    total: data?.total ?? 0,
    isLoading,
    deleteProdutor: deleteMutation.mutate,
    editProdutor: editMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isEditing: editMutation.isPending,
  }
}
