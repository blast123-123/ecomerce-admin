import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const getTokenExpiration = (req: NextRequest) => {
  const token = req.cookies.get('auth')?.value
  const expString = req.cookies.get('auth_exp')?.value
  const exp = expString ? Number(expString) : null

  return { token, exp }
}

export async function middleware(req: NextRequest) {
  const { exp, token } = getTokenExpiration(req)
  const { pathname } = req.nextUrl
  const now = Math.floor(Date.now() / 1000)

  if (pathname === '/') return NextResponse.redirect(new URL('/login', req.url))

  if (!token && pathname !== '/login')
    return NextResponse.redirect(new URL('/login', req.url))

  if (exp !== null && exp < now) {
    const response = NextResponse.redirect(new URL('/login', req.url))
    response.cookies.delete('auth')
    response.cookies.delete('auth_exp')
    return response
  }

  if (token && pathname === '/login')
    return NextResponse.redirect(new URL('/product', req.url))

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/product', '/login'],
}
