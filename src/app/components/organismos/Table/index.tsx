import { Table, ActionIcon, Tooltip, Pagination } from '@mantine/core'
import { TableContainer, TableTd, TableWrapper } from './styles'
import Image from 'next/image'

export type Header<T> = {
  key: keyof T
  label: string
}

type Props<T> = {
  headers: Header<T>[]
  rows: T[]
  totalData: number
  paginationValue: number
  setPaginationValue: ((value: number) => void) | undefined
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
}
const PAGE_SIZE = 5 // define o número de registros por página fixo

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TableCustomized<T extends { [key: string]: any }>({
  headers,
  rows,
  totalData,
  setPaginationValue,
  paginationValue,
  onEdit,
  onDelete,
}: Props<T>) {
  const totalPages = Math.ceil(totalData / PAGE_SIZE)

  return (
    <TableWrapper>
      {rows!.length === 0 ? (
        <div className='no-data-table-wrapper'>
          <p>Não há dados disponíveis</p>
        </div>
      ) : (
        <TableContainer striped highlightOnHover withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              {(onEdit || onDelete) && <Table.Th>Ações</Table.Th>}
              {headers.map((header) => (
                <Table.Th key={String(header.key)}>{header.label}</Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {rows.map((row, rowIndex) => (
              <Table.Tr key={rowIndex}>
                {(onEdit || onDelete) && (
                  <Table.Td>
                    <TableTd>
                      {onEdit && (
                        <Tooltip label='Editar' color='dark'>
                          <ActionIcon color='green' onClick={() => onEdit(row)}>
                            <Image
                              src='/icons/pencil.svg'
                              alt='Editar'
                              width={20}
                              height={20}
                              priority
                            />
                          </ActionIcon>
                        </Tooltip>
                      )}
                      {onDelete && (
                        <Tooltip label='Deletar' color='dark'>
                          <ActionIcon color='red' onClick={() => onDelete(row)}>
                            <Image
                              src='/icons/delete-alert.svg'
                              alt='Deletar'
                              width={20}
                              height={20}
                              priority
                            />
                          </ActionIcon>
                        </Tooltip>
                      )}
                    </TableTd>
                  </Table.Td>
                )}
                {headers.map((header) => (
                  <Table.Td key={String(header.key)}>
                    {Array.isArray(row[header.key])
                      ? row[header.key].join(', ')
                      : row[header.key]}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </TableContainer>
      )}
      <Pagination
        total={totalPages} // páginas, não total de registros
        value={paginationValue}
        onChange={setPaginationValue}
        p={20}
        mt='sm'
        color={'green'}
      />
    </TableWrapper>
  )
}
