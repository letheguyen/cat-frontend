import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import {
  LayoutUserSite,
  Loading,
  RootModal,
  LayoutAdminSite,
} from '@/components'
import {
  ADMIN_PATH,
  KEY_DATA_USERS_COOKIE,
  KEY_TOKEN_COOKIE,
  ROLE_APP,
} from '@/constants'
import { useStore } from '@/store'
import { useEffect } from 'react'
import { IDataUser } from '@/interfaces'
import { convertObjectToArray } from '@/utils'

import '@/styles/main.scss'

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()
  const { loading, role, token, setDataAccount } = useStore()

  // customize your theme here
  const theme = extendTheme({
    fonts: {
      heading: 'Fredoka',
      body: 'Fredoka',
    },
    colors: {
      dsgs: '#ccc'
    },
  })

  const handleSaveDataUser = () => {
    const userData = Cookies.get(KEY_DATA_USERS_COOKIE)
    const token = Cookies.get(KEY_TOKEN_COOKIE)

    if (userData && token) {
      const tokenData: string = token
      const dataUser: IDataUser = JSON.parse(userData)
      setDataAccount(dataUser, tokenData)
    }
  }

  const getLayout = (page: React.ReactElement) => {
    let Layout = LayoutUserSite
    const adminUrls = convertObjectToArray(ADMIN_PATH)

    if (adminUrls.includes(pathname) && role === ROLE_APP.ADMIN && token) {
      Layout = LayoutAdminSite
    }
    return <Layout>{page}</Layout>
  }

  useEffect(() => {
    handleSaveDataUser()
  }, [pathname])

  return (
    <ChakraProvider theme={theme}>
      <RootModal />
      <Loading loading={!!loading} />
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  )
}
