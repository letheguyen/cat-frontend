import React, { memo } from 'react'
import { ILayoutApp } from '@/interfaces'
import { Box } from '@chakra-ui/react'

const LayoutUserSite: React.FC<ILayoutApp> = ({ children }) => {
  return <Box className="px-3">{children}</Box>
}

export default memo(LayoutUserSite)
