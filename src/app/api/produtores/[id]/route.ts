import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma' // ajuste o caminho se necessário

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id)
    if (isNaN(id))
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 })

    // Remove as fazendas relacionadas
    await prisma.fazenda.deleteMany({
      where: {
        produtorId: id,
      },
    })

    await prisma.produtor.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Produtor deletado com sucesso' })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Erro ao deletar produtor' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id)
    if (isNaN(id))
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 })

    const body = await request.json()

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
    } = body

    // Atualiza produtor
    await prisma.produtor.update({
      where: { id },
      data: {
        nome: nomeProdutor,
        documento,
        fazendas: {
          deleteMany: {}, // apaga a fazenda antiga
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
    })

    return NextResponse.json({ message: 'Produtor atualizado com sucesso' })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Erro ao atualizar produtor' },
      { status: 500 }
    )
  }
}
