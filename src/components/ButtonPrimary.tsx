import clsx from 'clsx'
import React from 'react'
import { Box } from '@chakra-ui/react'

import { ButtonsType } from '@/constants'
import { IPropsButtons } from '@/interfaces'

export const ButtonPrimary: React.FC<IPropsButtons> = ({
  title,
  onClick,
  className,
  type = 'button',
  disabled = false,
  buttonType = 'primary',
  styleText = 'text-lg leading-9',
}) => {
  const styleButton = {
    [ButtonsType.error as string]: 'btn-error',
    [ButtonsType.close as string]: 'btn-close',
    [ButtonsType.primary as string]: 'btn-primary',
    [ButtonsType.dotted as string]: 'btn-dotted',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(styleButton[buttonType], className)}
    >
      <Box
        className={clsx(
          'text-white -mt-2px drop-shadow-lg shadow-colorShadowItem',
          styleText
        )}
      >
        {title}
      </Box>
    </button>
  )
}
