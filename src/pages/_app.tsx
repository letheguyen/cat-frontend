import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { LayoutUserSite, Loading, RootModal } from '@/components'
import Cookies from 'js-cookie'

import '@/styles/main.scss'
import { useStore } from '@/store'
import { useEffect } from 'react'
import { KEY_DATA_USERS_COOKIE } from '@/constants'
import { IDataUser, IDataUserSignIn } from '@/interfaces'

export default function App({ Component, pageProps }: AppProps) {
  const { loading, setDataAccount } = useStore()



  // customize your theme here
  const theme = extendTheme({
    fonts: {
      heading: 'Fredoka',
      body: 'Fredoka',
    },
    colors: {},
  })

  const handleSaveDataUser = () => {
    const userData = Cookies.get(KEY_DATA_USERS_COOKIE)
    if (userData) {
      const dataUser: IDataUser = JSON.parse(userData)
      setDataAccount(dataUser)
    }
  }

  useEffect(() => {
    handleSaveDataUser()
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <RootModal />
      <Loading loading={!!loading} />
      <LayoutUserSite>
        <Component {...pageProps} />
      </LayoutUserSite>
    </ChakraProvider>
  )
}
