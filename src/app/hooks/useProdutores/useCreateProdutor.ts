import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ProdutorType } from '../../../../types/interfaces/produtores'

export function useCreateProdutor() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (novoProdutor: ProdutorType) => {
      const res = await fetch('/api/produtores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoProdutor),
      })

      if (!res.ok) {
        const erro = await res.json()
        throw new Error(erro?.error || 'Erro ao criar produtor')
      }

      return res.json()
    },

    // ✅ Revalida os dados após criar
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['produtores'] })
    },
  })
}
