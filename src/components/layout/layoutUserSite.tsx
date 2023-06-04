import React, { memo } from 'react'
import { ILayoutApp } from '@/interfaces'
import { Box } from '@chakra-ui/react'
import Navbar from './navbar'

const LayoutUserSite: React.FC<ILayoutApp> = ({ children }) => {
  return (
    <>
      <Box className="px-3">
        <Navbar />
        <Box className='mt-16'>{children}</Box>
      </Box>
    </>
  )
}

export default memo(LayoutUserSite)
