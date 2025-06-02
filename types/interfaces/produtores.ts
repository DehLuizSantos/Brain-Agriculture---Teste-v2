import z from 'zod'

type Culturas = 'Soja' | 'Milho' | 'Algodão' | 'Café' | 'Cana de Açucar'

export const produtoresInitialValues = {
  nomeProdutor: '',
  nomeFazenda: '',
  documento: '',
  totalHectares: 0,
  areaAgricultavel: 0,
  areaVegetacao: 0,
  culturasPlantadas: [] as Culturas[],
  estado: 'SP',
  id: undefined,
  cidade: 'São Paulo',
}

export const produtoresSchema = z
  .object({
    id: z.number().optional(),
    nomeProdutor: z.string(),
    documento: z
      .string()
      .min(1, { message: 'O documento é obrigatório' })
      .regex(/^\d{11}$|^\d{14}$/, {
        message: 'Documento invalido',
      }),
    nomeFazenda: z.string(),
    totalHectares: z
      .number()
      .min(1, { message: 'Total de hectares deve ser maior que 0' }),
    areaAgricultavel: z
      .number()
      .min(0, { message: 'Área agricultável deve ser maior ou igual a 0' }),
    areaVegetacao: z
      .number()
      .min(0, { message: 'Área de vegetação deve ser maior ou igual a 0' }),
    culturasPlantadas: z.array(
      z.enum(['Soja', 'Milho', 'Algodão', 'Café', 'Cana de Açucar'])
    ),
    estado: z.string(),
    cidade: z.string(),
  })
  .refine(
    (data) => data.areaAgricultavel + data.areaVegetacao <= data.totalHectares,
    {
      message:
        'A soma da área agricultável e vegetação não pode exceder o total de hectares',
      path: ['areaAgricultavel'], // ou qualquer um dos campos relacionados
    }
  )

export type ProdutorType = z.infer<typeof produtoresSchema>
