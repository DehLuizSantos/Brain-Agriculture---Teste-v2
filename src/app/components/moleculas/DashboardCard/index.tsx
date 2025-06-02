'use client'
import { useDashboardData } from '@/app/hooks/useDashboard'
import { DashboardCard } from '../../atomos/DashboardCard'
import { DashboardCardWrapper } from './styles'

export function DashboardCards() {
  const { data } = useDashboardData()

  const dashboardCards = [
    {
      title: 'Fazendas Cadastradas',
      total: data?.totalFazendas,
      icon: '🌾',
    },
    {
      title: 'Hectares registrados',
      total: data?.totalHectares,
      icon: '🧮',
    },
  ]

  return (
    <DashboardCardWrapper>
      {dashboardCards.map((card) => (
        <DashboardCard
          icon={card.icon}
          total={card.total}
          title={card.title}
          key={card.title}
        />
      ))}
    </DashboardCardWrapper>
  )
}
