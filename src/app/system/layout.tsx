'use client'

import { ReactNode } from 'react'
import LayoutWithSidebar from '../components/templates/AppShell'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <LayoutWithSidebar>{children}</LayoutWithSidebar>
}
