import React, { memo } from 'react'
import { useRouter } from 'next/router'
import { Text } from '@chakra-ui/react'

import { APP_NAME, PATH_NAME } from '@/constants'

const FooterForm = () => {
  const { push, pathname } = useRouter()

  return (
    <>
      <Text color="colorTextDescribe" className="mt-12 text-center">
        Let's explore
        <Text
          as="span"
          color="colorPrimary"
          onClick={() => push(PATH_NAME.home)}
          className="underline cursor-pointer"
        >
          {' '}
          {APP_NAME}{' '}
        </Text>
        now.
        <Text
          as="span"
          color="colorPrimary"
          onClick={() => push(PATH_NAME.home)}
          className="ml-1 underline cursor-pointer"
        >
          Home
        </Text>
      </Text>

      {pathname === PATH_NAME.signIn ? (
        <Text color="colorTextDescribe" className="text-center">
          You don't have an account
          <Text
            as="span"
            color="colorPrimary"
            onClick={() => push(PATH_NAME.signUp)}
            className="ml-1 underline cursor-pointer"
          >
            Sign up
          </Text>
        </Text>
      ) : (
        <Text color="colorTextDescribe" className="text-center">
          Do you already have an account
          <Text
            as="span"
            color="colorPrimary"
            onClick={() => push(PATH_NAME.signIn)}
            className="ml-1 underline cursor-pointer"
          >
            Sign in
          </Text>
        </Text>
      )}
    </>
  )
}

export default memo(FooterForm)
