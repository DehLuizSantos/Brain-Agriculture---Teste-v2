import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { name, email } = await request.json();
  const id = parseInt(params.id);

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ message: `Erro ao atualizar usuário ${error}` }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  try {
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: `Erro ao deletar usuário ${error}` }, { status: 500 });
  }
}
