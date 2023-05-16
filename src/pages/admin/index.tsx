import React, { memo } from 'react'

import { Box } from '@chakra-ui/react'
import { HeadingTitle } from '@/components'

const Dashboard = () => {
  return (
    <Box className="h-full">
      <HeadingTitle title="Dashboard" />
    </Box>
  )
}

export default memo(Dashboard)
