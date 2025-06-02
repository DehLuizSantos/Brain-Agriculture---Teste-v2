import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { Culturas, ProdutorType } from '../../../../types/interfaces/produtores'
import { Prisma } from '@prisma/client'

// Schema para validação do POST
const produtorSchema = z.object({
  nomeProdutor: z.string(),
  documento: z.string(),
  nomeFazenda: z.string(),
  totalHectares: z.number(),
  areaAgricultavel: z.number(),
  areaVegetacao: z.number(),
  culturasPlantadas: z.array(z.string()),
  estado: z.string(),
  cidade: z.string(),
})

// Função para validar e parsear culturas com Zod
function parseCulturas(raw: unknown): Culturas[] {
  try {
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
    return z
      .array(z.enum(['Soja', 'Milho', 'Algodão', 'Café', 'Cana de Açucar']))
      .parse(parsed)
  } catch {
    return []
  }
}

// POST: criação de produtor + fazenda
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      nomeProdutor,
      documento,
      nomeFazenda,
      totalHectares,
      areaAgricultavel,
      areaVegetacao,
      culturasPlantadas,
      estado,
      cidade,
    } = produtorSchema.parse(body)

    if (areaAgricultavel + areaVegetacao > totalHectares) {
      return NextResponse.json(
        {
          error:
            'A soma das áreas agricultável e vegetação excede o total de hectares.',
        },
        { status: 400 }
      )
    }

    // Upsert: tenta atualizar produtor pelo documento, ou cria
    const produtor = await prisma.produtor.upsert({
      where: { documento },
      update: {
        fazendas: {
          create: {
            nome: nomeFazenda,
            totalHectares,
            areaAgricultavel,
            areaVegetacao,
            culturas: JSON.stringify(culturasPlantadas),
            estado,
            cidade,
          },
        },
      },
      create: {
        nome: nomeProdutor,
        documento,
        fazendas: {
          create: {
            nome: nomeFazenda,
            totalHectares,
            areaAgricultavel,
            areaVegetacao,
            culturas: JSON.stringify(culturasPlantadas),
            estado,
            cidade,
          },
        },
      },
      include: { fazendas: true },
    })

    return NextResponse.json(produtor)
  } catch (error) {
    console.error('Erro ao criar produtor:', error)
    return NextResponse.json(
      { error: 'Erro ao criar produtor ou fazenda' },
      { status: 400 }
    )
  }
}

// GET: listagem com paginação e busca otimizada
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = Math.max(Number(searchParams.get('page') || '1'), 1)
    const limit = Math.min(Number(searchParams.get('limit') || '10'), 100)
    const search = searchParams.get('search')?.toLowerCase() || ''

    const where = search
      ? {
          nome: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        }
      : {}

    const total = await prisma.produtor.count({ where })

    const produtoresDb = await prisma.produtor.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: { fazendas: true },
      orderBy: { nome: 'asc' },
    })

    const produtores: ProdutorType[] = []

    for (const produtor of produtoresDb) {
      for (const fazenda of produtor.fazendas) {
        produtores.push({
          id: produtor.id,
          nomeProdutor: produtor.nome,
          documento: produtor.documento,
          nomeFazenda: fazenda.nome,
          totalHectares: fazenda.totalHectares,
          areaAgricultavel: fazenda.areaAgricultavel,
          areaVegetacao: fazenda.areaVegetacao,
          culturasPlantadas: parseCulturas(fazenda.culturas),
          estado: fazenda.estado,
          cidade: fazenda.cidade,
        })
      }
    }

    return NextResponse.json({ data: produtores, total })
  } catch (error) {
    console.error('Erro ao buscar produtores:', error)
    return NextResponse.json(
      { error: 'Erro interno ao buscar produtores' },
      { status: 500 }
    )
  }
}
