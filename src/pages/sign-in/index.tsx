import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Cookies from 'js-cookie'

import {
  DAY_SAVE_COOKIE,
  KEY_DATA_USERS_COOKIE,
  KEY_TOKEN_COOKIE,
  PATH_NAME,
  ROLE,
  ROLE_APP,
} from '@/constants'
import { schemaSignIn } from '@/schema'
import { IDataUserSignIn, ISignInData } from '@/interfaces'
import { ButtonPrimary, FooterForm } from '@/components'
import { signIn } from '@/services'
import { useStore } from '@/store'

const SignUp = () => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<ISignInData>({
    resolver: yupResolver(schemaSignIn),
  })
  const { push } = useRouter()
  const [disabled, setDisabled] = useState(true)
  const { setLoading } = useStore()

  const onSubmit = async (data: ISignInData) => {
    setLoading(true)
    const res = (await signIn(data)) as IDataUserSignIn

    if (res?.token) {
      Cookies.set(ROLE, res?.data?.role, { expires: DAY_SAVE_COOKIE })
      Cookies.set(KEY_TOKEN_COOKIE, res.token, { expires: DAY_SAVE_COOKIE })
      Cookies.set(KEY_DATA_USERS_COOKIE, JSON.stringify(res.data), {
        expires: DAY_SAVE_COOKIE,
      })

      handleNextPage(res?.data?.role)
    } else {
      setError('password', { message: 'Incorrect Account Information' })
    }

    setTimeout(() => {
      setLoading(false)
    }, 300)
  }

  const handleNextPage = (role: string) => {
    switch (role) {
      case ROLE_APP.ADMIN:
        return push(PATH_NAME.admin)
      default:
        return push(PATH_NAME.home)
    }
  }

  useEffect(() => {
    if (watch('email') && watch('password') && disabled) {
      setDisabled(false)
    } else {
      if (!disabled) return
      setDisabled(true)
    }
  }, [watch('email'), watch('password')])

  return (
    <div className="main-content flex justify-center items-center h-screen overflow-hidden">
      <form className="w-96 m-auto " onSubmit={handleSubmit(onSubmit)}>
        <p className="text-5xl sm:hidden text-[var(--primary-color)]">
          Sign In
        </p>

        <div className="flex flex-col mt-4">
          <p>
            E-mail
            <span className="text-[var(--color-field-required)] -mt-1">*</span>
          </p>
          <input
            placeholder="Enter email"
            className="input-base"
            type="text"
            {...register('email')}
          />
          <span className="text-[var(--color-message-error)]">
            {errors.email?.message}
          </span>
        </div>

        <div className="flex flex-col mt-4">
          <p>
            Password
            <span className="text-[var(--color-field-required)] -mt-1">*</span>
          </p>
          <input
            placeholder="Enter password"
            className="input-base"
            type="text"
            {...register('password')}
          />
          <span className="text-[var(--color-message-error)]">
            {errors.password?.message}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ButtonPrimary
            disabled={disabled}
            className="!rounded-md mt-6"
            type="submit"
            title="Sign In"
          />

          <ButtonPrimary
            onClick={() => push(PATH_NAME.home)}
            className="!rounded-md mt-6"
            type="button"
            title="Back"
            buttonType="close"
          />
        </div>
        <FooterForm />
      </form>
    </div>
  )
}

export default SignUp
