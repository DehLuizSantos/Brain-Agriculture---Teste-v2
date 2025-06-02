import { create } from 'zustand'

type ProdutoresStore = {
  openForm: boolean
  setOpenForm: (value: boolean) => void

  openModalDelete: boolean
  setOpenModalDelete: (value: boolean) => void

  activePage: number
  setActivePage: (page: number) => void

  search: string
  setSearch: (query: string) => void
}

export const useProdutoresStore = create<ProdutoresStore>((set) => ({
  openForm: false,
  setOpenForm: (value) => set({ openForm: value }),

  openModalDelete: false,
  setOpenModalDelete: (value) => set({ openModalDelete: value }),

  activePage: 1,
  setActivePage: (page) => set({ activePage: page }),

  search: '',
  setSearch: (query) => set({ search: query }),
}))
