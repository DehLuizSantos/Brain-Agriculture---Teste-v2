import { Card, Text } from '@mantine/core'
import { DashboardCardContainer } from './styles'

type DashboardCardProps = {
  total?: number
  title: string
  icon: string
}

export function DashboardCard({ title, total, icon }: DashboardCardProps) {
  return (
    <DashboardCardContainer>
      <Card shadow='sm' padding='lg' radius='md' withBorder>
        <Text size='xl' fw={700}>
          {icon} {total}
        </Text>
        <Text c='dimmed'>{title}</Text>
      </Card>
    </DashboardCardContainer>
  )
}
