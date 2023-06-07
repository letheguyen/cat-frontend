import clsx from 'clsx'
import React, { memo, useEffect, useRef } from 'react'

import { useStore } from '@/store'

const MessengerBody = ({
  isSearch,
  getChat,
}: {
  isSearch?: boolean
  getChat: () => void
}) => {
  const scrollEl = useRef<HTMLDivElement>(null)
  const { dataChat, dataAccount } = useStore()

  useEffect(() => {
    if (scrollEl.current && isSearch) {
      scrollEl.current.scrollTop = scrollEl.current.scrollHeight
    }
  }, [dataChat, isSearch])

  useEffect(() => {
    const onScroll = () => {
      if (scrollEl.current) {
        if (scrollEl.current.scrollTop === 0) {
          getChat()
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

  return (
    <div
      ref={scrollEl}
      className="h-full w-full overflow-x-hidden overflow-y-auto flex flex-col gap-2 bg-white pb-3 pr-1"
    >
      {dataAccount &&
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
    </div>
  )
}

export default memo(MessengerBody)
