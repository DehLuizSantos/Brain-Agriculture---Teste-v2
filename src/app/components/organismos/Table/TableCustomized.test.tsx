import { render, screen, fireEvent } from '../../../../../test-utils'
import TableCustomized, { Header } from '.'

type TestRow = {
  id: number
  nome: string
  culturas: string[]
}

const headers: Header<TestRow>[] = [
  { key: 'id', label: 'ID' },
  { key: 'nome', label: 'Nome' },
  { key: 'culturas', label: 'Culturas' },
]

const rows: TestRow[] = [
  { id: 1, nome: 'Fazenda A', culturas: ['Soja', 'Milho'] },
  { id: 2, nome: 'Fazenda B', culturas: ['Café'] },
  { id: 3, nome: 'Fazenda C', culturas: [] },
]

describe('TableCustomized', () => {
  it('deve renderizar os dados da tabela corretamente', () => {
    render(
      <TableCustomized
        headers={headers}
        rows={rows}
        totalData={rows.length}
        paginationValue={1}
        setPaginationValue={() => {}}
      />
    )

    expect(screen.getByText('Fazenda A')).toBeDefined()
    expect(screen.getByText('Fazenda B')).toBeDefined()
    expect(screen.getByText('Fazenda C')).toBeDefined()
    expect(screen.getByText('Soja, Milho')).toBeDefined()
    expect(screen.getByText('Café')).toBeDefined()
  })

  it('deve chamar onEdit e onDelete ao clicar nos ícones', () => {
    const onEdit = jest.fn()
    const onDelete = jest.fn()

    render(
      <TableCustomized
        headers={headers}
        rows={[rows[0]]}
        totalData={1}
        paginationValue={1}
        setPaginationValue={() => {}}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    )

    const editButton = screen.getByRole('button', { name: /editar/i })
    const deleteButton = screen.getByRole('button', { name: /deletar/i })

    fireEvent.click(editButton)
    fireEvent.click(deleteButton)

    expect(onEdit).toHaveBeenCalledWith(rows[0])
    expect(onDelete).toHaveBeenCalledWith(rows[0])
  })

  it('deve exibir o número correto de páginas na paginação', () => {
    render(
      <TableCustomized
        headers={headers}
        rows={rows}
        totalData={12}
        paginationValue={1}
        setPaginationValue={() => {}}
      />
    )

    // TotalData = 12, PAGE_SIZE = 5 => totalPages = 3
    expect(screen.getAllByText('3')).toHaveLength(2)
  })
})
