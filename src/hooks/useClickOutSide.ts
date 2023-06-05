import { useEffect, RefObject } from 'react'

type Event = MouseEvent | TouchEvent

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: () => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      if (ref.current?.contains(event?.target as Node)) return
      handler()
    }
    document.addEventListener('mouseup', listener)

    return () => {
      document.removeEventListener('mouseup', listener)
    }
  }, [ref, handler])
}
