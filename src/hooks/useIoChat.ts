import { io } from 'socket.io-client'
import { useEffect, useRef } from 'react'

import { useStore } from '@/store'
import { getAllRoomAdmin } from '@/services'
import { LIMIT_ROOMS, ROLE_APP } from '@/constants'
import { IAllRoomDetail, IDataMessge, IRoomDetail } from '@/interfaces'

export const useIoChat = () => {
  // State
  const chatOld = useRef<IDataMessge>()

  // Store
  const {
    role,
    token,
    fetchRooms,
    allRoomAdmin,
    dataRoomUser,
    setDataChat,
    setRoomUser,
    setRoomAdmin,
    refetchRooms,
    setDataUserOnline,
  } = useStore()

  // Socket
  const ws = io(process.env.NEXT_PUBLIC_API_BASE_URL as string, {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  })

  // Get rooms data
  const handleGetRooms = async () => {
    if (token && role === ROLE_APP.ADMIN) {
      const allRoomsAdmin: IAllRoomDetail | null = await getAllRoomAdmin({
        page: 1,
        limit: LIMIT_ROOMS,
      })
      refetchRooms(null)
      setRoomAdmin(allRoomsAdmin)
    }

    if (token && role === ROLE_APP.USER) {
      const roomUser: IRoomDetail | null = await getAllRoomAdmin()
      setRoomUser(roomUser ? roomUser : null)
      refetchRooms(null)
    }
  }

  useEffect(() => {
    if (token) {
      handleGetRooms()
      ws.emit('LOGIN', token)
      ws.on('ACCOUNT_ONLINE', (arrayAccount: string[]) => {
        console.log(arrayAccount)
        setDataUserOnline(arrayAccount)
      })
    }
  }, [token])

  // Refetch rooms
  useEffect(() => {
    if (fetchRooms) {
      handleGetRooms()
    }
  }, [fetchRooms])

  // Event ws
  useEffect(() => {
    if (token && dataRoomUser) {
      ws.on(dataRoomUser._id, (chat: IDataMessge) => {
        setDataChat([chat])
      })
    }
  }, [dataRoomUser])

  // Event ws
  useEffect(() => {
    if (allRoomAdmin) {
      const { data } = allRoomAdmin
      data?.map((room) => {
        ws.on(room._id, (chat: IDataMessge) => {
          setDataChat([chat])
          chatOld.current = chat
        })
      })
    }
  }, [allRoomAdmin])
}
