import { ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'

import { Providers } from '@/app/providers'

const AllProviders = ({ children }: { children: ReactNode }) => {
  return <Providers>{children}</Providers>
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
