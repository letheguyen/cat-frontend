import clsx from 'clsx'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
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
  KEY_DATA_USERS_COOKIE,
  KEY_TOKEN_COOKIE,
  ROLE_APP,
} from '@/constants'
import { useStore } from '@/store'
import { IDataUser } from '@/interfaces'
import { convertObjectToArray } from '@/utils'
import ThemesProvider from '@/themes/themesProvider'

import '@/styles/main.scss'

const App = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter()
  const { loading, role, token, setDataAccount } = useStore()

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

    if (adminUrls.includes(clsx('/' + pathname.split('/')[1]))) {
      if (role === ROLE_APP.ADMIN && token) {
        Layout = LayoutAdminSite
      }
    }
    return <Layout>{page}</Layout>
  }

  useEffect(() => {
    handleSaveDataUser()
  }, [])

  return (
    <ThemesProvider>
      <>
        <RootModal />
        <Loading loading={!!loading} />
        {getLayout(<Component {...pageProps} />)}
      </>
    </ThemesProvider>
  )
}

export default App
