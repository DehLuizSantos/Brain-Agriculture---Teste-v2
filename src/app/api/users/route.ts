import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');

  try {
    const users = await prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const totalUsers = await prisma.user.count();

    return NextResponse.json({
      data: users,
      total: totalUsers,
      page,
      pageSize,
      totalPages: Math.ceil(totalUsers / pageSize),
    });
  } catch (error) {
    return NextResponse.json({ message: `Erro ao buscar usuários ${error}` }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { name, email } = await request.json();

  try {
    const newUser = await prisma.user.create({
      data: { name, email },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: `Erro ao criar usuário ${error}` }, { status: 500 });
  }
}