import React, { memo } from 'react'
import {
  auth,
  providerGoogle,
  signInWithPopup,
  providerGithup,
  providerTwitter,
} from './config'

import iconGoogle from '/public/iconGoogle.png'
import iconTwitter from '/public/twitter.png'
import iconGithup from '/public/Githup.png'
import FitlImage from '../fitlImage'
import { UserCredential } from 'firebase/auth'
import { signSNS } from '@/services'
import { useStore } from '@/store'
import { IDataUserSignIn } from '@/interfaces'
import { MODAL_TYPE } from '@/constants'

const SignSns = ({
  loginSuccessHandle,
}: {
  loginSuccessHandle: (data: IDataUserSignIn) => void
}) => {
  const { setLoading, setDataModal } = useStore()

  const handleSignSns = async (dataSign: UserCredential, appName: string) => {
    setLoading(true)
    const dataAccount = {
      userName: dataSign.user.displayName,
      avatar: dataSign.user.photoURL,
      email: dataSign.user.email,
      phone: dataSign.user.phoneNumber,
      age: 18,
      uid: dataSign.user.uid,
    }
    const res = (await signSNS(dataAccount)) as IDataUserSignIn

    console.log(res)
    if (res?.token) {
      loginSuccessHandle(res)
    } else {
      setDataModal({
        messageModal: 'Login ' + appName + ' error',
        modalKey: MODAL_TYPE.commonError,
      })
    }
    setLoading(false)
  }

  const handleSign = async (type: string) => {
    try {
      switch (type) {
        case 'Google':
          return await signInWithPopup(auth, providerGoogle).then((data) => {
            handleSignSns(data, 'Google')
          })

        case 'Twitter':
          return await signInWithPopup(auth, providerTwitter).then((data) => {
            handleSignSns(data, 'Twitter')
          })

        case 'Githup':
          return await signInWithPopup(auth, providerGithup).then((data) => {
            console.log(data)
            handleSignSns(data, 'Githup')
          })
      }
    } catch (error) {
      return
    }
  }

  return (
    <div className="gap-2 flex-col flex mt-6">
      <button
        className="h-9 w-full border rounded-md flexItem-center gap-2 hover:text-colorPrimary hover:border-colorPrimary transition-all ease-in"
        type="button"
        onClick={() => handleSign('Google')}
      >
        <FitlImage url={iconGoogle.src} height="20px" width="20px" />
        Sign With Google
      </button>

      <button
        className="h-9 w-full border rounded-md flexItem-center gap-2 hover:text-colorPrimary hover:border-colorPrimary transition-all ease-in"
        type="button"
        onClick={() => handleSign('Twitter')}
      >
        <FitlImage url={iconTwitter.src} height="20px" width="20px" />
        Sign With Twitter
      </button>

      <button
        className="h-9 w-full border rounded-md flexItem-center gap-2 hover:text-colorPrimary hover:border-colorPrimary transition-all ease-in"
        type="button"
        onClick={() => handleSign('Githup')}
      >
        <FitlImage url={iconGithup.src} height="20px" width="20px" />
        Sign With Githup
      </button>
    </div>
  )
}

export default memo(SignSns)
