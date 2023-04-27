import { IIcon } from '@/interfaces'
import clsx from 'clsx'

export const CloseIcon = ({
  width = '25px',
  height = '25px',
  color,
  className = '',
  onClick,
}: IIcon) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color ? color : 'currentColor'}
    strokeWidth="5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={clsx('ai ai-Cross', className)}
  >
    <path d="M20 20L4 4m16 0L4 20" />
  </svg>
)
