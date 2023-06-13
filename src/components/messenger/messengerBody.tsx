import clsx from 'clsx'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { memo, useEffect, useRef, useState } from 'react'

import { useStore } from '@/store'
import { COUNT_MESSAGE, ROLE_APP } from '@/constants'
import LoadingItem from '../loadingItem'
import { IDataMessge, IPagination } from '@/interfaces'
import { getDetailRoomChat } from '@/services'

const MessengerBody = () => {
  // State
  const [page, setPage] = useState(1)
  const [chatData, setChatData] = useState<IDataMessge[]>()
  const [loading, setLoading] = useState(false)
  const [dataPaginate, setDataPaginate] = useState<IPagination>()
  const scrollEl = useRef<HTMLDivElement>(null)
  const { query } = useRouter()

  // Store
  const {
    dataAccount,
    dataChat,
    allRoomAdmin,
    dataRoomUser,
    role,
    setDataChat,
    setWaitingLine,
  } = useStore()

  // Handle get message
  const handleGetMessage = async (roomId: string) => {
    const newData = await getDetailRoomChat(
      { page, limit: COUNT_MESSAGE },
      roomId
    )
    setTimeout(() => {
      setLoading(false)
    }, 500)

    if (dataChat && page === 1) return
    if (newData) {
      setDataChat(newData.data, true)
      setDataPaginate(newData.pagination)
    }
  }

  // Get message admin
  const getMessageAdmin = async () => {
    if (query.userId && page && role === ROLE_APP.ADMIN) {
      const room = allRoomAdmin?.data?.find(
        (room) => room.userId === query.userId
      )
      setLoading(true)
      if (room?._id) handleGetMessage(room?._id)
    }
  }

  // Get message user
  const getMessageUser = async () => {
    if (dataRoomUser && page && role === ROLE_APP.USER) {
      if (dataPaginate && dataPaginate.totalPage < page) return
      setLoading(true)
      handleGetMessage(dataRoomUser._id)
    }
  }

  // Effect
  useEffect(() => {
    const onScroll = () => {
      if (scrollEl.current) {
        if (scrollEl.current.scrollTop === 0) {
          setPage((state) => state + 1)
        }
      }
    }

    if (scrollEl.current) {
      scrollEl.current.addEventListener('scroll', onScroll)
    }

    return () => {
      if (scrollEl.current) {
        scrollEl.current.removeEventListener('scroll', onScroll)
      }
    }
  }, [])

  useEffect(() => {
    getMessageAdmin()
  }, [page, query])

  useEffect(() => {
    getMessageUser()
  }, [dataRoomUser, page])

  useEffect(() => {
    if (scrollEl.current && page === 1) {
      scrollEl.current.scrollTop = scrollEl.current.scrollHeight
    }
  }, [dataChat, chatData, page])

  useEffect(() => {
    if (query.userId && dataChat) {
      const newDataChat = dataChat.filter(
        (chat) => chat.idUserCreate === query.userId
      )
      setChatData(newDataChat)
    }
  }, [dataChat, page, query])

  return (
    <>
      {loading && (
        <Box className="absolute top-0 left-0 w-full h-screen max-h-contentMessenger flexItem-center bg-black/10">
          <LoadingItem width="30px" height="30px" className="m-auto z-40" />
        </Box>
      )}
      <div
        ref={scrollEl}
        className="h-full w-full overflow-x-hidden overflow-y-auto flex flex-col gap-2 bg-white pb-3 pr-1"
      >
        {dataAccount?.role === ROLE_APP.USER &&
          dataChat?.map((chat, index) => (
            <div
              key={index}
              className={clsx(
                'inline-block max-w-[80%] px-3 py-1 rounded',
                dataAccount._id === chat.from
                  ? 'bg-colorPrimary/20 ml-auto'
                  : 'bg-black/5 mr-auto'
              )}
            >
              {chat.message}
            </div>
          ))}

        {dataAccount?.role === ROLE_APP.ADMIN &&
          chatData?.map((chat, index) => (
            <div
              key={index}
              className={clsx(
                'inline-block max-w-[80%] px-3 py-1 rounded',
                dataAccount._id === chat.from
                  ? 'bg-colorPrimary/20 ml-auto'
                  : 'bg-black/5 mr-auto'
              )}
            >
              {chat.message}
            </div>
          ))}
      </div>
    </>
  )
}

export default memo(MessengerBody)
