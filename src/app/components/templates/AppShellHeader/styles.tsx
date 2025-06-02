import styled from '@emotion/styled'

export const AppShellHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  height: 100%;
  background-color: ${(props) => props.theme.colors.dark};

  h3 {
    display: none;
    color: ${(props) => props.theme.colors.white};
    font-size: ${(props) => props.theme.fonts.medium};

    @media (min-width: 480px) {
      display: block;
    }
  }
`
