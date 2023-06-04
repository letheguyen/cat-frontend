import { Messenger } from '@/components'
import React, { memo } from 'react'

const Navbar = () => {
  return (
    <div className='fixed top-0 left-0 w-full bg-white flexItem-end h-16 border-b px-4'>
      <Messenger />
    </div>
  )
}

export default memo(Navbar)