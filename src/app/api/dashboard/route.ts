import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const fazendas = await prisma.fazenda.findMany()

    if (!fazendas || fazendas.length === 0) {
      return NextResponse.json(
        {
          totalFazendas: 0,
          totalHectares: 0,
          porEstado: [],
          porCultura: [],
          usoSolo: [
            { name: 'Agricultável', value: 0 },
            { name: 'Vegetação', value: 0 },
          ],
        },
        { status: 200 }
      )
    }

    const totalFazendas = fazendas.length
    const totalHectares = fazendas.reduce(
      (acc, curr) => acc + (curr.totalHectares ?? 0),
      0
    )

    const estadoMap = new Map<string, number>()
    const culturaMap = new Map<string, number>()
    let areaAgricultavel = 0
    let areaVegetacao = 0

    for (const fazenda of fazendas) {
      // Estado
      if (fazenda.estado) {
        estadoMap.set(fazenda.estado, (estadoMap.get(fazenda.estado) ?? 0) + 1)
      }

      // Uso do Solo
      areaAgricultavel += fazenda.areaAgricultavel ?? 0
      areaVegetacao += fazenda.areaVegetacao ?? 0

      // Culturas
      if (fazenda.culturas) {
        let culturas: string[] = []

        try {
          if (typeof fazenda.culturas === 'string') {
            culturas = JSON.parse(fazenda.culturas)
          } else if (Array.isArray(fazenda.culturas)) {
            culturas = fazenda.culturas
          }
        } catch (err) {
          console.error('Erro ao parsear culturas da fazenda:', fazenda.id, err)
        }

        for (const cultura of culturas) {
          if (typeof cultura === 'string') {
            culturaMap.set(cultura, (culturaMap.get(cultura) ?? 0) + 1)
          }
        }
      }
    }

    const porEstado = Array.from(estadoMap.entries()).map(([name, value]) => ({
      name,
      value,
    }))

    const porCultura = Array.from(culturaMap.entries()).map(
      ([name, value]) => ({
        name,
        value,
      })
    )

    const usoSolo = [
      { name: 'Agricultável', value: areaAgricultavel },
      { name: 'Vegetação', value: areaVegetacao },
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
