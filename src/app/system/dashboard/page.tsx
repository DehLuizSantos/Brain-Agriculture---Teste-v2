'use client'

import { useDashboardData } from '@/app/hooks/useDashboard'
import { DashboardWrapper } from './styles'
import { DashboardCards } from '@/app/components/moleculas/DashboardCard'
import { DashboardCharts } from '@/app/components/moleculas/DashboardCharts'
import { FadingComponent } from '@/app/components/atomos/FadingAnimation'

export default function Dashboard() {
  const { data, isLoading, error } = useDashboardData()

  if (isLoading) return <p>Carregando...</p>
  if (error || !data) return <p>Erro ao carregar dados</p>
  return (
    <FadingComponent duration={50}>
      <DashboardWrapper>
        <DashboardCards />
        <DashboardCharts />
      </DashboardWrapper>
    </FadingComponent>
  )
}
