import styled from '@emotion/styled'

export const AppShellHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  height: 100%;

  h3 {
    color: ${(props) => props.theme.colors.white};
    font-size: ${(props) => props.theme.fonts.medium};
  }
`
