import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from './services/AuthService';

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ['/login', '/signup'];

const roleBasedPrivateRoutes = {
  customer: [/^\/customer/, '/profile', '/update-profile', '/change-password'], // Correct regex
  provider: [/^\/provider/, '/profile', '/update-profile', '/change-password'], // Correct regex
  admin: [/^\/admin/, '/profile', '/update-profile', '/change-password'], // Correct regex
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = await getCurrentUser();

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `http://localhost:3000/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL('/', request.url));
};

export const config = {
  matcher: [
    '/login',
    '/signup',
    '/profile',
    '/update-profile',
    '/change-password',
    '/admin',
    '/admin/:path*',
    '/customer',
    '/customer/:path*',
    '/provider',
    '/provider/:path*',
  ],
};
