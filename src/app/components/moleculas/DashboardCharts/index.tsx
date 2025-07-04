'use client'
import { SimpleGrid } from '@mantine/core'
import { useDashboardData } from '@/app/hooks/useDashboard'
import { DashboardPieChart } from '../../atomos/DashboardPieChart'

export function DashboardCharts() {
  const { data } = useDashboardData()

  const colors = ['indigo.6', 'yellow.6', 'teal.6', 'gray.6']

  const porEstado = data?.porEstado.map((estado, index) => {
    return {
      ...estado,
      color: colors[index],
    }
  })

  const porCultura = data?.porCultura.map((cultura, index) => {
    return {
      ...cultura,
      color: colors[index],
    }
  })

  const porSolo = data?.usoSolo.map((solo, index) => {
    return {
      ...solo,
      color: colors[index],
    }
  })

  const dashboardPies = [
    {
      title: 'Por Estado',
      data: porEstado,
    },
    {
      title: 'Por Cultura Plantada',
      data: porCultura,
    },
    {
      title: 'Uso do Solo',
      data: porSolo,
    },
  ]

  return (
    <SimpleGrid cols={{ base: 1, md: 3 }} spacing='md'>
      {dashboardPies.map((pie) => (
        <DashboardPieChart data={pie.data} title={pie.title} key={pie.title} />
      ))}
    </SimpleGrid>
  )
}
