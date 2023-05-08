import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import { IThemesProvider } from '@/interfaces'
import { theme } from './themes'

const ThemesProvider: React.FC<IThemesProvider> = (props) => {
  return <ChakraProvider theme={theme}>{props.children}</ChakraProvider>
}

export default ThemesProvider
