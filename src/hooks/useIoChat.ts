import { IChatContent } from '@/interfaces'
import { useStore } from '@/store'
import { useEffect } from 'react'
import io from 'socket.io-client'

const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL as string)

export const useIoChat = () => {
  const { setDataChat, dataAccount, usersOnline, setDataUserOnline } =
    useStore()

  const handleCheckAccountOnline = () => {
    if (dataAccount?._id) {
      socket.emit('ACOUNT_ONELINE', dataAccount?._id)
    }
  }

  useEffect(() => {
    socket.on('CHAT', (message: IChatContent) => {
      setDataChat(message)
    })

    socket.on('ACOUNT_ONELINE', (id: string) => {
      if (usersOnline.includes(id)) return
      setDataUserOnline(id)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (dataAccount) {
      socket.connect()
      handleCheckAccountOnline()
    } else {
      socket.disconnect()
    }
  }, [dataAccount])
}
