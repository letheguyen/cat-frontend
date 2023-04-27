import type { AppProps } from 'next/app'
import { LayoutUserSite, RootModal } from '@/components'

import '@/styles/main.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LayoutUserSite>
      <>
        <RootModal />
        <Component {...pageProps} />
      </>
    </LayoutUserSite>
  )
}
