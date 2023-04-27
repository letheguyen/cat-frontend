import clsx from 'clsx'
import React from 'react'

import { IPropsButtons } from '@/interfaces'

export const ButtonPrimary: React.FC<IPropsButtons> = ({
  className,
  type = 'button',
  title,
  textColor,
  onClick
}) => {
  return (
    <button
      type={type}
      className={clsx('btn-primary flex justify-center', className)}
      onClick={onClick}
    >
      <div
        className={clsx(
          'py-1.5 px-3 text-lg text-white -translate-y-[2px] drop-shadow-lg shadow-black',
          textColor
        )}
      >
        {title}
      </div>
    </button>
  )
}
