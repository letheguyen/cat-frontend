import { IIcon } from '@/interfaces'
import clsx from 'clsx'

export const TruckIcon = ({
  color,
  onClick,
  className = '',
  width = '36px',
  height = '36px',
}: IIcon) => (
  <svg
    fill="none"
    width={width}
    strokeWidth="2"
    height={height}
    onClick={onClick}
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    stroke={color ? color : 'currentColor'}
    className={clsx('ai ai-Truck', className)}
  >
    <path d="M10 17h6V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a1 1 0 0 0 1 1h1" />
    <path d="M22 16v-4a4 4 0 0 0-4-4h-2v9h5a1 1 0 0 0 1-1z" />
    <path d="M15 17a3 3 0 1 0 6 0h-6z" />
    <path d="M22 14h-2" />
    <circle cx="7" cy="17" r="3" />
  </svg>
)
