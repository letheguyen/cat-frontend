import { IIcon } from '@/interfaces'
import clsx from 'clsx'

export const CloseIcon = ({
  color,
  onClick,
  className = '',
  width = '25px',
  height = '25px',
}: IIcon) => (
  <svg
    fill="none"
    width={width}
    strokeWidth="5"
    height={height}
    onClick={onClick}
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    stroke={color ? color : 'currentColor'}
    className={clsx('ai ai-Cross', className)}
  >
    <path d="M20 20L4 4m16 0L4 20" />
  </svg>
)
