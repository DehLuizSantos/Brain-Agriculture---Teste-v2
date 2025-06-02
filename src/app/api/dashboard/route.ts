import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const fazendas = await prisma.fazenda.findMany()

    // Se não houver fazendas, já retorna um objeto padrão
    if (!fazendas) {
      return NextResponse.json(
        {
          totalFazendas: 0,
          totalHectares: 0,
          porEstado: {},
          porCultura: {},
          usoSolo: {
            areaAgricultavel: 0,
            areaVegetacao: 0,
          },
        },
        { status: 200 }
      )
    }

    const totalFazendas = fazendas.length
    const totalHectares = fazendas.reduce(
      (acc, curr) => acc + (curr.totalHectares ?? 0),
      0
    )

    const porEstado: Record<string, number> = {}
    const porCultura: Record<string, number> = {}
    let areaAgricultavel = 0
    let areaVegetacao = 0

    for (const fazenda of fazendas) {
      // Estado
      if (fazenda.estado) {
        porEstado[fazenda.estado] = (porEstado[fazenda.estado] || 0) + 1
      }

      // Áreas
      areaAgricultavel += fazenda.areaAgricultavel ?? 0
      areaVegetacao += fazenda.areaVegetacao ?? 0

      // Culturas
      if (fazenda.culturas) {
        try {
          const culturas: string[] =
            typeof fazenda.culturas === 'string'
              ? JSON.parse(fazenda.culturas)
              : fazenda.culturas

          if (Array.isArray(culturas)) {
            for (const cultura of culturas) {
              porCultura[cultura] = (porCultura[cultura] || 0) + 1
            }
          }
        } catch (error) {
          console.error(
            'Erro ao processar culturas na fazenda',
            fazenda.id,
            error
          )
        }
      }
    }

    return NextResponse.json({
      totalFazendas,
      totalHectares,
      porEstado,
      porCultura,
      usoSolo: {
        areaAgricultavel,
        areaVegetacao,
      },
    })
  } catch (error) {
    console.error('Erro no dashboard:', error)
    return NextResponse.json(
      { error: 'Erro ao gerar dados do dashboard' },
      { status: 500 }
    )
  }
}
