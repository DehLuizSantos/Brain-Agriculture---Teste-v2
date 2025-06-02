import { useQuery } from '@tanstack/react-query'

type DashboardData = {
  totalFazendas: number
  totalHectares: number
  porEstado: Record<string, number>
  porCultura: Record<string, number>
  usoSolo: {
    areaAgricultavel: number
    areaVegetacao: number
  }
}

export function useDashboardData() {
  return useQuery<DashboardData>({
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
}
