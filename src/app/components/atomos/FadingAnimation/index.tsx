'use-client'

import { ReactNode, useEffect, useState } from 'react'
import * as S from './styles'

export interface FadingComponentProps {
  duration: number
  children: ReactNode
}

export const FadingComponent = ({
  duration,
  children,
}: FadingComponentProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])
  return (
    <S.FadeAnimationWrapper
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
      }}
    >
      {children}
    </S.FadeAnimationWrapper>
  )
}
