import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { password, next } = await request.json();
  const expected = process.env.PREVIEW_PASSWORD;

  if (!expected || password !== expected) {
    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set('atlantis-access', expected, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 días
  });

  return response;
}
