import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

const COOKIE = 'atlantis-access';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Rutas exentas siempre ──────────────────────────────────────────────────
  if (
    pathname.startsWith('/acceso') ||
    pathname.startsWith('/api/auth/access') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon')
  ) {
    return await updateSession(request);
  }

  // ── Si no hay contraseña configurada, dejar pasar a todos ─────────────────
  const password = process.env.PREVIEW_PASSWORD;
  if (!password) {
    return await updateSession(request);
  }

  // ── Comprobar cookie ───────────────────────────────────────────────────────
  const cookie = request.cookies.get(COOKIE);
  if (cookie?.value === password) {
    return await updateSession(request);
  }

  // ── Redirigir a la página de acceso ───────────────────────────────────────
  const url = request.nextUrl.clone();
  url.pathname = '/acceso';
  url.searchParams.set('next', pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
