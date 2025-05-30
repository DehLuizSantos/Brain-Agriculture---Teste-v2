import styled from '@emotion/styled'

export const Container = styled.div`
   background-color: ${props => props.theme.colors.dark};
   height: 100vh;
`

export const Title = styled.h1`
   color: ${props => props.theme.colors.white};
   font-size: ${props => props.theme.fonts.large};
`