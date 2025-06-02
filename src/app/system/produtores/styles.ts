import styled from '@emotion/styled'

export const ProdutoresWrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.dark};
  overflow-x: hidden;
  text-align: center;

  .no-data-table-wrapper {
    border-radius: 5px;
    p {
      font-size: ${(props) => props.theme.fonts.xlarge};
    }
  }
`
