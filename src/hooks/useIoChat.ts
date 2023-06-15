import { io } from 'socket.io-client'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'

import { useStore } from '@/store'
import { getAllRooms } from '@/services'
import { LIMIT_ROOMS, ROLE_APP } from '@/constants'
import { IAllRoomDetail, IDataMessge, IRoomDetail } from '@/interfaces'

export const useIoChat = () => {
  // State
  const chatOld = useRef<IDataMessge>()
  const timmerId = useRef<null | NodeJS.Timeout>(null)
  const [dataWaiting, setDataWaiting] = useState<string>()
  const { query } = useRouter()
  const { userId } = query

  // Store
  const {
    role,
    token,
    fetchRooms,
    dataChat,
    dataRoomUser,
    waitingLine,
    usersOnline,
    allRoomAdmin,
    setDataChat,
    setRoomUser,
    setRoomAdmin,
    refetchRooms,
    setWaitingLine,
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
      const allRoomsAdmin: IAllRoomDetail | null = await getAllRooms({
        page: 1,
        limit: LIMIT_ROOMS,
      })
      refetchRooms(null)
      setRoomAdmin(allRoomsAdmin)
    }

    if (token && role === ROLE_APP.USER) {
      const roomUser: IRoomDetail | null = await getAllRooms()
      setRoomUser(roomUser ? roomUser : null)
      refetchRooms(null)
    }
  }

  // Get account online other page
  const handleCheckNewChat = (id: string) => {
    if (timmerId.current) {
      clearTimeout(timmerId.current)
    }

    const isOnLine = allRoomAdmin?.data?.find((rooms) => rooms.userId === id)
    if (!isOnLine || !usersOnline.includes(id)) return

    timmerId.current = setTimeout(() => {
      refetchRooms(true)
    }, 2000)
  }

  useEffect(() => {
    const chatEnd = dataChat?.[dataChat.length - 1]
    if (chatEnd?.idRoom && usersOnline) {
      handleCheckNewChat(chatEnd?.from)
    }
  }, [dataChat, usersOnline])

  // Event ws
  useEffect(() => {
    if (token) {
      handleGetRooms()
      ws.emit('LOGIN', token)
      ws.on('ACCOUNT_ONLINE', (arrayAccount: string[]) => {
        setDataUserOnline(arrayAccount)
      })
    }
  }, [token])

  // Event ws
  useEffect(() => {
    if (userId && waitingLine) {
      if (!waitingLine.includes(userId as string)) return
      const newIdAcc = waitingLine.filter((accId) => accId !== userId)
      newIdAcc && setWaitingLine(newIdAcc)
    }
  }, [userId, waitingLine])

  // Event ws
  useEffect(() => {
    if (dataWaiting) {
      const newAccId = waitingLine
        ? [...waitingLine, dataWaiting]
        : [dataWaiting]
      setWaitingLine(newAccId)
    }
  }, [dataWaiting])

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
    if (role === ROLE_APP.ADMIN) {
      ws.on('ADMIN_CHAT', (chat: IDataMessge) => {
        if (chatOld.current?.created === chat.created) return
        setDataChat([chat])
        setDataWaiting(chat.from)
        chatOld.current = chat
      })
    }
  }, [role, usersOnline])
}
