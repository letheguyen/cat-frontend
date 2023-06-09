import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { convertObjectToArray } from './utils'
import {
  ROLE,
  ROLE_APP,
  PATH_NAME,
  SIGN_IN_UP,
  ADMIN_PATH,
  PUBLIC_PATH,
  KEY_TOKEN_COOKIE,
} from '@/constants'

export default function middleware(req: NextRequest) {
  const veryfi = req.cookies.get(KEY_TOKEN_COOKIE)?.value
  const role = req.cookies.get(ROLE)?.value
  const url = req.nextUrl.clone()

  const adminUrls = convertObjectToArray(ADMIN_PATH)
  const signInUpUrls = convertObjectToArray(SIGN_IN_UP)
  const publicUrls = convertObjectToArray({ ...PUBLIC_PATH, ...SIGN_IN_UP })

  if (veryfi && role && signInUpUrls.includes(url.pathname)) {
    url.pathname = PATH_NAME.home
    return NextResponse.redirect(url)
  }

  if (!veryfi && !role && !publicUrls.includes(url.pathname)) {
    url.pathname = PATH_NAME.signIn
    return NextResponse.redirect(url)
  }

  if (veryfi && role !== ROLE_APP.ADMIN && adminUrls.includes(url.pathname)) {
    url.pathname = PATH_NAME.home
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: ['/((?!_next|api/auth).*)(.+)'],
}
