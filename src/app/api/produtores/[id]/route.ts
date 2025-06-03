// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */
import { NextResponse } from 'next/server'
import { handleDELETE, handlePUT } from './route-handlers'

export async function DELETE(request: Request, { params }: any) {
  try {
    const id = Number(params.id)
    if (isNaN(id))
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 })

    const result = await handleDELETE(id)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Erro ao deletar',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request, { params }: any) {
  try {
    const id = Number(params.id)
    if (isNaN(id))
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 })

    const body = await request.json()
    const result = await handlePUT(id, body)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Erro ao atualizar',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
