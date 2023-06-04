import { IChatContent } from '@/interfaces'
import { useStore } from '@/store'
import { useEffect } from 'react'
import io from 'socket.io-client'

const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL as string)

export const useIoChat = () => {
  const { setDataChat } = useStore()

  useEffect(() => {
    socket.on('CHAT', (message: IChatContent) => {
      setDataChat(message)
    })

    return () => {
      socket.disconnect()
    }
  }, [])
}
