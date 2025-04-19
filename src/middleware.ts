import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Önbelleğe alınacak rotalar
const CACHE_ROUTES = [
  '/',
  '/stats',
  '/calendar',
  '/manifest.json',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Service worker, manifest.json ve HTML sayfaları için önbellek başlıklarını düzenle
  if (
    pathname.endsWith('.html') || 
    pathname === '/service-worker.js' || 
    pathname === '/manifest.json' || 
    CACHE_ROUTES.includes(pathname)
  ) {
    // Önbellek başlıklarını ayarla
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'public, max-age=3600');
    return response;
  }
  
  // Statik dosyalar için
  if (
    pathname.includes('/icons/') || 
    pathname.includes('/images/') || 
    pathname.includes('/_next/static/')
  ) {
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'public, max-age=86400'); // 24 saat
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/service-worker.js',
    '/manifest.json',
  ],
}; 