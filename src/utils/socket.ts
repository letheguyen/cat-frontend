import io from 'socket.io-client'
import Cookies from 'js-cookie'
import { KEY_TOKEN_COOKIE } from '@/constants'

export const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL as string, {
  extraHeaders: {
    Authorization: Cookies.get(KEY_TOKEN_COOKIE)
      ? (Cookies.get(KEY_TOKEN_COOKIE) as string)
      : '',
  },
})
