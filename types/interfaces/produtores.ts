import z from 'zod';

type Culturas = 'Soja' | 'Milho' | 'Algodão' | 'Café' | 'Cana de Açucar';

export const produtoresInitialValues = {
  nomeProdutor: '',
  nomeFazenda: '',
  documento: '',
  totalHectares: 0,
  areaAgricultavel: 0,
  areaVegetacao: 0,
  culturasPlantadas: [] as Culturas[],
  estado: 'SP',
  cidade: 'São Paulo',
  id: null,
};

export const produtoresSchema = z.object({
  id: z.number().nullable(),
  nomeProdutor: z.string(),
  documento: z.string().min(1, { message: 'O documento é obrigatório' }),
  nomeFazenda: z.string(),
  totalHectares: z.number().min(1, { message: 'Total de hectares deve ser maior que 0' }),
  areaAgricultavel: z.number().min(0, { message: 'Área agricultável deve ser maior ou igual a 0' }),
  areaVegetacao: z.number().min(0, { message: 'Área de vegetação deve ser maior ou igual a 0' }),
  culturasPlantadas: z.array(z.enum(['Soja', 'Milho', 'Algodão', 'Café', 'Cana de Açucar'])),
  estado: z.string(),
  cidade: z.string(),
});

export type ProdutorType = z.infer<typeof produtoresSchema>;