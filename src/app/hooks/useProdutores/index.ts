import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ProdutorType } from '../../../../types/interfaces/produtores'
import { useProdutoresStore } from '@/store/produtoresStore'
import { useDashboardData } from '../useDashboard'

const PAGE_SIZE = 5

type FetchResponse = {
  data: ProdutorType[]
  total: number
}

export function useProdutores(paginationValue: number, search?: string) {
  const queryClient = useQueryClient()
  const { setOpenForm, setOpenModalDelete, setActivePage } =
    useProdutoresStore()

  const { refetch: refetchDashboardData } = useDashboardData()

  // GET: lista paginada de produtores
  const { data, isLoading, refetch } = useQuery<FetchResponse>({
    queryKey: ['produtores', paginationValue, search],
    queryFn: async () => {
      const res = await fetch(
        `/api/produtores?page=${paginationValue}&limit=${PAGE_SIZE}&search=${search}`
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
      queryClient.invalidateQueries({ queryKey: ['produtores', 'dashboard'] })
      refetch()
      refetchDashboardData()
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
      queryClient.invalidateQueries({ queryKey: ['produtores', 'dashboard'] })
      refetch()
      refetchDashboardData()
      setActivePage(1)
      setOpenForm(false)
    },
  })

  // POST: adicionar produtor
  const addMutation = useMutation({
    mutationFn: async (novoProdutor: ProdutorType) => {
      const res = await fetch('/api/produtores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoProdutor),
      })

      if (!res.ok) {
        const erro = await res.json()
        throw new Error(erro?.error || 'Erro ao criar produtor')
      }

      return res.json()
    },

    // ✅ Revalida os dados após criar
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['produtores', 'dashboard'] })
      refetchDashboardData()
      refetch()
    },
  })

  return {
    produtores: data?.data ?? [],
    total: data?.total ?? 0,
    deleteProdutor: deleteMutation.mutate,
    editProdutor: editMutation.mutate,
    addProdutor: addMutation.mutate,
    loading:
      isLoading ||
      addMutation.isPending ||
      deleteMutation.isPending ||
      editMutation.isPending,
    error: editMutation.error || addMutation.error || deleteMutation.error,
  }
}
