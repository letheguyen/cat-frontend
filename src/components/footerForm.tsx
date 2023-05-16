import React, { memo } from 'react'
import { useRouter } from 'next/router'
import { Text } from '@chakra-ui/react'

import { APP_NAME, PATH_NAME } from '@/constants'

const FooterForm = () => {
  const { push, pathname } = useRouter()

  return (
    <>
      <Text
        as="span"
        color="colorTextDescribe"
        className="mt-12 text-center inline-block w-full"
      >
        {`Let's explore`}
        <Text
          color="colorPrimary"
          onClick={() => push(PATH_NAME.home)}
          className="underline cursor-pointer inline"
        >
          {' '}
          {APP_NAME}{' '}
        </Text>
        now.
        <Text
          color="colorPrimary"
          onClick={() => push(PATH_NAME.home)}
          className="ml-1 underline cursor-pointer inline"
        >
          Home
        </Text>
      </Text>

      {pathname === PATH_NAME.signIn ? (
        <Text
          as="span"
          color="colorTextDescribe"
          className="text-center inline-block w-full"
        >
          {`You don't have an account`}
          <Text
            color="colorPrimary"
            onClick={() => push(PATH_NAME.signUp)}
            className="ml-1 underline cursor-pointer inline"
          >
            Sign up
          </Text>
        </Text>
      ) : (
        <Text
          as="span"
          color="colorTextDescribe"
          className="text-center inline-block w-full"
        >
          Do you already have an account
          <Text
            color="colorPrimary"
            onClick={() => push(PATH_NAME.signIn)}
            className="ml-1 underline cursor-pointer inline"
          >
            Sign in
          </Text>
        </Text>
      )}
    </>
  )
}

export default memo(FooterForm)
