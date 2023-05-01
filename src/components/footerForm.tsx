import React, { memo } from 'react'
import { useRouter } from 'next/router'
import { APP_NAME, PATH_NAME } from '@/constants'

const FooterForm = () => {
  const { push, pathname } = useRouter()

  console.log(pathname)

  return (
    <>
      <p className="text-[var(--des-color)] mt-12 text-center">
        Let's explore
        <span
          onClick={() => push(PATH_NAME.home)}
          className="text-[var(--primary-color)] underline cursor-pointer"
        >
          {' '}
          {APP_NAME}{' '}
        </span>
        now.
        <span
          onClick={() => push(PATH_NAME.home)}
          className="ml-1 text-[var(--primary-color)] underline cursor-pointer"
        >
          Home
        </span>
      </p>

      {pathname === PATH_NAME.signIn ? (
        <p className="text-[var(--des-color)] text-center">
          You don't have an account
          <span
            onClick={() => push(PATH_NAME.signUp)}
            className="ml-1 text-[var(--primary-color)] underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      ) : (
        <p className="text-[var(--des-color)] text-center">
          Do you already have an account
          <span
            onClick={() => push(PATH_NAME.signIn)}
            className="ml-1 text-[var(--primary-color)] underline cursor-pointer"
          >
            Sign in
          </span>
        </p>
      )}
    </>
  )
}

export default memo(FooterForm)
