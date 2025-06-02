import { PieChart } from '@mantine/charts'
import { Card, Title } from '@mantine/core'
import { DashboardPieWrapper } from './styles'

type DashboardPieChart = {
  data:
    | {
        color: string
        name: string
        value: number
      }[]
    | undefined
  title: string
}

export function DashboardPieChart({ data, title }: DashboardPieChart) {
  return (
    <DashboardPieWrapper>
      <Card w={'100%'} shadow='sm' padding='md' radius='md' withBorder>
        <Title order={4} mb='sm'>
          {title}
        </Title>
        <PieChart
          strokeWidth={1}
          tooltipDataSource='segment'
          w='100%'
          data={data!}
          withTooltip
        />
      </Card>
    </DashboardPieWrapper>
  )
}
