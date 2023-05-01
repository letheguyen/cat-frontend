import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { KEY_TOKEN_COOKIE, PATH_NAME } from '@/constants'

export default function middleware(req: NextRequest) {
  const veryfi = req.cookies.get(KEY_TOKEN_COOKIE)
  const url = req.nextUrl.clone()



  url.pathname = '/login'
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next|api/auth).*)(.+)'],
}
