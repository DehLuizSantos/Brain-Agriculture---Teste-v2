'use client'

import { useDashboardData } from '@/app/hooks/useDashboard'
import { DashboardWrapper } from './styles'

export default function Dashboard() {
  const { data, isLoading, isError } = useDashboardData()

  if (isLoading) return <p>Carregando...</p>
  if (isError || !data) return <p>Erro ao carregar dados</p>
  return (
    <DashboardWrapper>
      <h2>Total de Fazendas: {data.totalFazendas}</h2>
      <h2>Total de Hectares: {data.totalHectares}</h2>
      <h3>Uso do Solo:</h3>
      <ul>
        <li>Agricultável: {data.usoSolo.areaAgricultavel}</li>
        <li>Vegetação: {data.usoSolo.areaVegetacao}</li>
      </ul>
    </DashboardWrapper>
  )
}
