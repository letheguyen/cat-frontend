import clsx from 'clsx'
import { memo } from 'react'

import { LoadingIcon } from '@/icons'
import { IPropsIconLoading } from '@/interfaces'

const LoadingItem = ({
  width = '48px',
  height = '48px',
  className = '',
}: IPropsIconLoading) => (
  <LoadingIcon
    width={width}
    height={height}
    className={clsx('animate-spin text-colorPrimary/70', className)}
  />
)

export default memo(LoadingItem)
