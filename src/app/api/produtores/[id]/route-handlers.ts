// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */
import { prisma } from '@/lib/prisma'
// @ts-ignore
export async function handleDELETE(id: number) {
  await prisma.fazenda.deleteMany({ where: { produtorId: id } })
  await prisma.produtor.delete({ where: { id } })
  return { success: true, message: 'Produtor deletado' }
}

// @ts-ignore - Ignora apenas o próximo erro
export async function handlePUT(id: number, body: any) {
  const updated = await prisma.produtor.update({
    where: { id },
    data: {
      nome: body.nomeProdutor,
      documento: body.documento,
      fazendas: {
        deleteMany: {},
        create: {
          nome: body.nomeFazenda,
          totalHectares: body.totalHectares,
          areaAgricultavel: body.areaAgricultavel,
          areaVegetacao: body.areaVegetacao,
          culturas: JSON.stringify(body.culturasPlantadas),
          estado: body.estado,
          cidade: body.cidade,
        },
      },
    },
  })
  return { success: true, data: updated }
}
