import styled from '@emotion/styled'
import { Table } from '@mantine/core'

export const TableWrapper = styled.div`
  overflow-x: auto;
`

export const TableContainer = styled(Table)`
  color: ${(props) => props.theme.colors.grey['300']};
  overflow-x: auto;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  border-radius: 8px;

  .mantine-Table-th {
    color: ${(props) => props.theme.colors.white};
    font-size: ${(props) => props.theme.fonts.small};
    text-align: left;
  }
  tr {
    background-color: ${(props) => props.theme.colors.dark};

    &:hover {
      opacity: 0.9;
    }
  }
`
export const TableTd = styled.div`
  display: flex;
  gap: 5px;
`
