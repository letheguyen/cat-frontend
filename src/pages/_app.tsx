import clsx from 'clsx'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'

import {
  LayoutUserSite,
  Loading,
  RootModal,
  LayoutAdminSite,
} from '@/components'
import {
  ADMIN_PATH,
  SIGN_IN_UP,
  KEY_DATA_USERS_COOKIE,
  KEY_TOKEN_COOKIE,
  ROLE_APP,
} from '@/constants'
import { useStore } from '@/store'
import { useIoChat } from '@/hooks'
import { IDataUser } from '@/interfaces'
import { convertObjectToArray } from '@/utils'
import ThemesProvider from '@/themes/themesProvider'

import '@/styles/main.scss'
import { getInformation } from '@/services'

const App = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter()
  const { loading, role, token, setDataAccount, setDataShopInfo, dataChat } =
    useStore()

  // Custom hook
  useIoChat()

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
    const signInOrSignUpUrls = convertObjectToArray(SIGN_IN_UP)

    if (adminUrls.includes(clsx('/' + pathname.split('/')[1]))) {
      if (role === ROLE_APP.ADMIN && token) {
        Layout = LayoutAdminSite
      }
    }

    if (signInOrSignUpUrls.includes(pathname)) {
      return <div className="px-3">{page}</div>
    }

    return <Layout>{page}</Layout>
  }

  const handleGetDataShopInfo = async () => {
    if (pathname === ADMIN_PATH.shopInformation) return
    const dataShop = await getInformation()
    dataShop && setDataShopInfo(dataShop[0])
  }

  useEffect(() => {
    handleSaveDataUser()
    handleGetDataShopInfo()
    // eslint-disable-next-line
  }, [])

  return (
    <ThemesProvider>
      <Box bg="backgroundBodyColor">
        <RootModal />
        <Loading loading={!!loading} />
        {getLayout(<Component {...pageProps} />)}
      </Box>
    </ThemesProvider>
  )
}

export default App
