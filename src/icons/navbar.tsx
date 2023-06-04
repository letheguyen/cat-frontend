import { IIcon } from '@/interfaces'
import clsx from 'clsx'

export const MessagerIcon = ({
  color,
  onClick,
  className = '',
  width = '25px',
  height = '25px',
}: IIcon) => (
  <svg
    fill="none"
    width={width}
    strokeWidth="1.2"
    height={height}
    onClick={onClick}
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    stroke={color ? color : 'currentColor'}
    className={clsx('ai ai-ChatDots', className)}
  >
    <path d="M14 19c3.771 0 5.657 0 6.828-1.172C22 16.657 22 14.771 22 11c0-3.771 0-5.657-1.172-6.828C19.657 3 17.771 3 14 3h-4C6.229 3 4.343 3 3.172 4.172 2 5.343 2 7.229 2 11c0 3.771 0 5.657 1.172 6.828.653.654 1.528.943 2.828 1.07" />
    <path d="M12 11v.01" />
    <path d="M8 11v.01" />
    <path d="M16 11v.01" />
    <path d="M14 19c-1.236 0-2.598.5-3.841 1.145-1.998 1.037-2.997 1.556-3.489 1.225-.492-.33-.399-1.355-.212-3.404L6.5 17.5" />
  </svg>
)
