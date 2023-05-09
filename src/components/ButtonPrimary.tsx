import clsx from 'clsx'
import React from 'react'
import { Box } from '@chakra-ui/react'

import { IPropsButtons } from '@/interfaces'
import { ButtonsType } from '@/constants'

export const ButtonPrimary: React.FC<IPropsButtons> = ({
  title,
  onClick,
  className,
  type = 'button',
  disabled = false,
  buttonType = 'primary',
  textColor = 'text-white',
}) => {

  const styleButton = {
    [ButtonsType.primary as string]: 'btn-primary',
    [ButtonsType.close as string]: 'btn-close',
    [ButtonsType.error as string]: 'btn-error',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(styleButton[buttonType], className)}
    >
      <Box className={clsx('text-lg drop-shadow-lg shadow-colorShadowItem', textColor)}>
        {title}
      </Box>
    </button>
  )
}
