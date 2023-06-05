import React, { memo } from 'react'

import { Messenger } from '@/components'
import { useStore } from '@/store'

const Navbar = () => {
  const { dataAccount } = useStore()

  return (
    <div className="fixed top-0 left-0 w-full bg-white flexItem-end h-16 border-b border-b-colorPrimary px-4 z-30">
      {dataAccount && <Messenger />}
    </div>
  )
}

export default memo(Navbar)
