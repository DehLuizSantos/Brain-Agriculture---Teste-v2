import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // total de fazendas
    const totalFazendas = await prisma.fazenda.count()

    if (totalFazendas === 0) {
      return NextResponse.json({
        totalFazendas: 0,
        totalHectares: 0,
        porEstado: [],
        porCultura: [],
        usoSolo: [
          { name: 'Agricultável', value: 0 },
          { name: 'Vegetação', value: 0 },
        ],
      })
    }

    // total de hectares somados
    const totalHectaresAggregate = await prisma.fazenda.aggregate({
      _sum: {
        totalHectares: true,
        areaAgricultavel: true,
        areaVegetacao: true,
      },
    })

    const totalHectares = totalHectaresAggregate._sum.totalHectares ?? 0
    const totalAreaAgricultavel =
      totalHectaresAggregate._sum.areaAgricultavel ?? 0
    const totalAreaVegetacao = totalHectaresAggregate._sum.areaVegetacao ?? 0

    // Fazendas por estado (count grouped by estado)
    const porEstadoRaw = await prisma.fazenda.groupBy({
      by: ['estado'],
      _count: { estado: true },
    })

    const porEstado = porEstadoRaw.map(({ estado, _count }) => ({
      name: estado ?? 'Desconhecido',
      value: _count.estado,
    }))

    // Para culturas, precisamos puxar as culturas e agregar aqui
    // Pois são armazenadas como JSON em string

    const fazendasCulturas = await prisma.fazenda.findMany({
      select: { culturas: true },
      where: { culturas: { not: null } },
    })

    const culturaMap = new Map<string, number>()

    for (const { culturas } of fazendasCulturas) {
      let culturasArray: string[] = []
      try {
        culturasArray =
          typeof culturas === 'string' ? JSON.parse(culturas) : culturas || []
      } catch {
        // Ignorar erros de parse
      }
      for (const c of culturasArray) {
        if (typeof c === 'string') {
          culturaMap.set(c, (culturaMap.get(c) ?? 0) + 1)
        }
      }
    }

    const porCultura = Array.from(culturaMap.entries()).map(
      ([name, value]) => ({
        name,
        value,
      })
    )

    const usoSolo = [
      { name: 'Agricultável', value: totalAreaAgricultavel },
      { name: 'Vegetação', value: totalAreaVegetacao },
    ]

    return NextResponse.json({
      totalFazendas,
      totalHectares,
      porEstado,
      porCultura,
      usoSolo,
    })
  } catch (error) {
    console.error('Erro no dashboard:', error)
    return NextResponse.json(
      { error: 'Erro ao gerar dados do dashboard' },
      { status: 500 }
    )
  }
}
