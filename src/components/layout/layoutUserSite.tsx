import React, { memo } from 'react'
import { ILayoutApp } from '@/interfaces'

const LayoutUserSite: React.FC<ILayoutApp> = ({ children }) => {
  return <>{children}</>
}

export default memo(LayoutUserSite)
