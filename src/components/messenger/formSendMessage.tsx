import clsx from 'clsx'
import React, { memo, useRef, useState } from 'react'

import { SendIcon } from '@/icons'
import { IPropsFormSend } from '@/interfaces'

const FormSendMessage: React.FC<IPropsFormSend> = ({ onSubmit }) => {
  const [rows, setRows] = useState(1)
  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (value: string) => {
    const lineBreakCount = value.split('\n').length
    if (lineBreakCount < rows) {
      setRows(lineBreakCount)
    }
    setMessage(value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.code !== 'Enter' || rows >= 4) return
    setRows(rows + 1)
  }

  const handleSend = () => {
    if (message.trim().length === 0) return
    onSubmit(message)
    setMessage('')
    setRows(1)
    inputRef.current?.focus()
  }

  return (
    <>
      <div className="flexItem-center align-top">
        <textarea
          cols={50}
          rows={1}
          value={message}
          ref={inputRef}
          placeholder="Enter messenger..."
          style={{ height: rows * 36 + 'px' }}
          className={clsx(
            'flex-1 min-h-[36px] border rounded-sm px-2 py-0 outline-none leading-8 resize overflow-auto focus:border-black/10 focus:shadow-none'
          )}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />

        <div
          className={clsx(
            ' hover:bg-colorPrimary/5 transition-all ease-in',
            message.trim().length > 0
              ? 'text-colorPrimary'
              : 'text-colorPrimary/50'
          )}
        >
          <SendIcon
            onClick={handleSend}
            width="50px"
            height="36px"
            className="px-3 cursor-pointer"
          />
        </div>
      </div>
    </>
  )
}

export default memo(FormSendMessage)
