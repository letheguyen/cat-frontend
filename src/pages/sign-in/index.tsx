import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  ROLE,
  ROLE_APP,
  PATH_NAME,
  DAY_SAVE_COOKIE,
  KEY_TOKEN_COOKIE,
  KEY_DATA_USERS_COOKIE,
} from '@/constants'
import { useStore } from '@/store'
import { signIn } from '@/services'
import { schemaSignIn } from '@/schema'
import { Box, Text } from '@chakra-ui/react'
import { ButtonPrimary, FooterForm, SignSns } from '@/components'
import { IDataUserSignIn, ISignInData } from '@/interfaces'

const SignUp = () => {
  const {
    watch,
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInData>({
    resolver: yupResolver(schemaSignIn),
  })
  const { push } = useRouter()
  const [disabled, setDisabled] = useState(true)
  const { setLoading, setDataAccount } = useStore()

  const onSubmit = async (data: ISignInData) => {
    setLoading(true)
    const res = (await signIn(data)) as IDataUserSignIn

    if (res?.token) {
      addDataAccountToCookies(res)
    } else {
      setError('password', { message: 'Incorrect Account Information' })
    }

    setTimeout(() => {
      setLoading(false)
    }, 300)
  }

  const addDataAccountToCookies = (res: IDataUserSignIn) => {
    Cookies.set(ROLE, res?.data?.role, { expires: DAY_SAVE_COOKIE })
    Cookies.set(KEY_TOKEN_COOKIE, res.token, { expires: DAY_SAVE_COOKIE })
    Cookies.set(KEY_DATA_USERS_COOKIE, JSON.stringify(res.data), {
      expires: DAY_SAVE_COOKIE,
    })
    setDataAccount(res.data, res.token)
    handleNextPage(res?.data?.role)
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
    // eslint-disable-next-line
  }, [watch('email'), watch('password')])

  return (
    <Box className="flex justify-center items-center h-screen">
      <form className="w-96 m-auto " onSubmit={handleSubmit(onSubmit)}>
        <Text className="text-5xl sm:hidden text-colorFieldRequired">
          Sign In
        </Text>

        <Box className="flex flex-col mt-4">
          <Text>
            E-mail
            <Text as="span" className="text-colorFieldRequired -mt-1">
              *
            </Text>
          </Text>
          <input
            placeholder="Enter email"
            className="input-base"
            type="text"
            {...register('email')}
          />
          <Text as="span" className="text-colorFieldRequired">
            {errors.email?.message}
          </Text>
        </Box>

        <Box className="flex flex-col mt-4">
          <Text>
            Password
            <Text as="span" className="text-colorFieldRequired -mt-1">
              *
            </Text>
          </Text>
          <input
            placeholder="Enter password"
            className="input-base"
            type="text"
            {...register('password')}
          />
          <Text as="span" className="text-colorFieldRequired">
            {errors.password?.message}
          </Text>
        </Box>

        <Box className="grid grid-cols-2 gap-4">
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
        </Box>

        <SignSns loginSuccessHandle={addDataAccountToCookies} />

        <FooterForm />
      </form>
    </Box>
  )
}

export default SignUp
