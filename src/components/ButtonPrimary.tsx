import clsx from 'clsx'
import React from 'react'

import { IPropsButtons } from '@/interfaces'
import { ButtonsType } from '@/constants'

export const ButtonPrimary: React.FC<IPropsButtons> = ({
  className,
  type = 'button',
  title,
  textColor,
  onClick,
  buttonType = 'primary',
  disabled = false,
}) => {
  const styleButton = {
    [ButtonsType.primary as string]: 'btn-primary',
    [ButtonsType.close as string]: 'btn-close',
  }

  return (
    <button
      disabled={disabled}
      type={type}
      className={clsx(
        'flex justify-center',
        styleButton[buttonType],
        className
      )}
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
