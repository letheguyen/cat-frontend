import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { LayoutUserSite, RootModal } from '@/components'

import '@/styles/main.scss'

export default function App({ Component, pageProps }: AppProps) {

  // customize your theme here
  const theme = extendTheme({
    fonts: {
      heading: 'Fredoka',
      body: 'Fredoka',
    },
    colors: {
      
    },
  })

  return (
    <ChakraProvider theme={theme}>
      <LayoutUserSite>
        <>
          <RootModal />
          <Component {...pageProps} />
        </>
      </LayoutUserSite>
    </ChakraProvider>
  )
}
