import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { Culturas, ProdutorType } from '../../../../types/interfaces/produtores'

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

// ✅ POST: Criação de produtor e fazenda
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = produtorSchema.parse(body) // o seu schema já validado

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
    } = parsed

    // Validar soma das áreas (redundante, mas ok)
    if (areaAgricultavel + areaVegetacao > totalHectares) {
      return NextResponse.json(
        {
          error:
            'A soma das áreas agricultável e vegetação excede o total de hectares.',
        },
        { status: 400 }
      )
    }

    const produtorExistente = await prisma.produtor.findUnique({
      where: { documento },
      include: { fazendas: true },
    })

    let produtor

    if (!produtorExistente) {
      produtor = await prisma.produtor.create({
        data: {
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
        include: {
          fazendas: true,
        },
      })
    } else {
      const novaFazenda = await prisma.fazenda.create({
        data: {
          nome: nomeFazenda,
          totalHectares,
          areaAgricultavel,
          areaVegetacao,
          culturas: JSON.stringify(culturasPlantadas),
          estado,
          cidade,
          produtorId: produtorExistente.id,
        },
      })

      produtor = {
        ...produtorExistente,
        fazendas: [...produtorExistente.fazendas, novaFazenda],
      }
    }

    return NextResponse.json(produtor)
  } catch (error) {
    console.error('Erro ao criar produtor:', error)
    return NextResponse.json(
      { error: 'Erro ao criar produtor ou fazenda' },
      { status: 400 }
    )
  }
}

// ✅ GET: Listagem com paginação e busca opcional
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = Number(searchParams.get('page') || '1')
    const limit = Number(searchParams.get('limit') || '10')
    const search = searchParams.get('search')?.toLowerCase() || ''

    const where = search
      ? {
          nome: {
            contains: search,
          },
        }
      : {}

    const total = await prisma.produtor.count({ where })

    const produtoresDb = await prisma.produtor.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        fazendas: true,
      },
    })

    // Função para validar e parsear culturas
    function parseCulturas(raw: unknown): Culturas[] {
      try {
        // Faz parse do JSON
        const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw

        // Usa o Zod para validar o array
        const culturas = z
          .array(z.enum(['Soja', 'Milho', 'Algodão', 'Café', 'Cana de Açucar']))
          .parse(parsed)

        return culturas
      } catch {
        return []
      }
    }

    const produtores: ProdutorType[] = produtoresDb.flatMap((produtor) =>
      produtor.fazendas.map((fazenda) => ({
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
      }))
    )

    return NextResponse.json({ data: produtores, total })
  } catch (error) {
    console.error('Erro ao buscar produtores:', error)
    return NextResponse.json(
      { error: 'Erro interno ao buscar produtores' },
      { status: 500 }
    )
  }
}
