import { useQuery } from '@tanstack/react-query'

type DashboardData = {
  totalFazendas: number
  totalHectares: number
  porEstado: {
    name: string
    value: number
  }[]
  porCultura: {
    name: string
    value: number
  }[]
  usoSolo: {
    name: string
    value: number
  }[]
}

export function useDashboardData() {
  const { data, error, isLoading, refetch } = useQuery<DashboardData>({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const res = await fetch('/api/dashboard')

      if (!res.ok) {
        throw new Error('Erro ao buscar dados do dashboard')
      }

      return res.json()
    },
    staleTime: 1000 * 60 * 5, // 5 minutos (ajuste opcional)
  })

  return {
    data,
    error,
    isLoading,
    refetch,
  }
}
