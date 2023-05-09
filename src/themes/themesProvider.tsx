import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import { themeChakarUi } from './theme'
import { IThemesProvider } from '@/interfaces'

const ThemesProvider: React.FC<IThemesProvider> = (props) => {
  return <ChakraProvider theme={themeChakarUi}>{props.children}</ChakraProvider>
}

export default ThemesProvider
