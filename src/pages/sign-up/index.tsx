import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Box, Text } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'

import {
  CODE_ERROR,
  ERROR_DATA,
  MODAL_TYPE,
  PATH_NAME,
  TYPE_FILE_SUPPORT,
} from '@/constants'
import { useStore } from '@/store'
import { signUp } from '@/services'
import { DeleteIcon } from '@/icons'
import { schemaSignUp } from '@/schema'
import { handleGetUrlImage as saveImage } from '@/utils'
import { TypeFormSignUp } from '@/interfaces'
import { ButtonPrimary, FitlImage, FooterForm } from '@/components'

const SignUp = () => {
  const {
    watch,
    setValue,
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeFormSignUp>({
    resolver: yupResolver(schemaSignUp),
  })
  const { push } = useRouter()
  const [avatarPewview, setAvatarPewview] = useState<File>()
  const { setLoading, setDataModal, closeModal } = useStore()
  const [backgroudPewview, setBackgroudPewview] = useState<File>()

  const onSubmit = async (data: TypeFormSignUp) => {
    setLoading(true)

    const { isError, imageURl } = await saveImage(data.background?.[0])
    const { isError: isErr, imageURl: url } = await saveImage(data.avatar?.[0])

    let dataSignUp: any = {
      ...data,
      avatar: url,
      background: imageURl
    }

    if (isErr || isError) {
      handleUploadFailure()
      dataSignUp = {}
    }

    const newDataSignup: any = Object.keys(dataSignUp).reduce((data, field) => {
      if (!dataSignUp[field]) return data
      return { ...data, [field]: dataSignUp[field] }
    }, {})

    if (Object.keys(newDataSignup).length) {
      const res = await signUp(newDataSignup)
      if (res?.errorCode === CODE_ERROR.SUCCESS) {
        setDataModal({
          messageModal: 'Sign up ' + ERROR_DATA[res.errorCode],
          modalKey: MODAL_TYPE.commonSuccess,
        })

        setTimeout(() => {
          closeModal()
          push(PATH_NAME.signIn)
        }, 2000)
      } else {
        setDataModal({
          messageModal: 'Sign up ' + ERROR_DATA[res.errorCode],
          modalKey: MODAL_TYPE.commonError,
        })
      }
    }

    setTimeout(() => {
      setLoading(false)
    }, 300)
  }

  const handleUploadFailure = () => {
    setDataModal({
      messageModal: 'Upload image failure',
      modalKey: MODAL_TYPE.commonError,
    })
  }

  const handleClearValueImage = (type: string) => {
    if (type === 'AVATAR') {
      setAvatarPewview(undefined)
      setValue('avatar', undefined)
    } else {
      setBackgroudPewview(undefined)
      setValue('background', undefined)
    }
  }

  useEffect(() => {
    const file = getValues('avatar')?.item(0)
    if (!file) return
    setAvatarPewview(file)
  }, [watch('avatar')])

  useEffect(() => {
    const file = getValues('background')?.item(0)
    if (!file) return
    setBackgroudPewview(file)
  }, [watch('background')])

  return (
    <Box className="pt-4 flexItem-center min-h-screen">
      <form className="max-w-xl m-auto" onSubmit={handleSubmit(onSubmit)}>
        <Text className="text-5xl sm:hidden text-colorFieldRequired">Sign Up</Text>
        <Box className="grid w-full gap-4 grid-cols-2 flex-wrap">
          <Box className="flex flex-col mt-4">
            <Text>
              User name
              <Text as='span' className="text-colorFieldRequired -mt-1">*</Text>
            </Text>
            <input
              placeholder="Enter user name"
              className="input-base"
              type="text"
              {...register('userName')}
            />
            <Text as='span' className="text-colorFieldRequired">
              {errors.userName?.message}
            </Text>
          </Box>

          <Box className="flex flex-col mt-4">
            <Text>
              Phone number
              <Text as='span' className="text-colorFieldRequired -mt-1">*</Text>
            </Text>
            <input
              placeholder="Phone number"
              className="input-base"
              type="text"
              {...register('phone')}
            />
            <Text as='span' className="text-colorFieldRequired">
              {errors.phone?.message}
            </Text>
          </Box>
        </Box>

        <Box className="flex flex-col mt-4">
          <Text>
            E-mail
            <Text as='span' className="text-colorFieldRequired -mt-1">*</Text>
          </Text>
          <input
            placeholder="Enter email"
            className="input-base"
            type="text"
            {...register('email')}
          />
          <Text as='span' className="text-colorFieldRequired">
            {errors.email?.message}
          </Text>
        </Box>

        <Box className="grid w-full gap-4 grid-cols-2 flex-wrap">
          <Box className="flex flex-col mt-4">
            <Text>
              Password
              <Text as='span' className="text-colorFieldRequired -mt-1">*</Text>
            </Text>
            <input
              placeholder="Enter password"
              className="input-base"
              type="text"
              {...register('password')}
            />
            <Text as='span' className="text-colorFieldRequired">
              {errors.password?.message}
            </Text>
          </Box>

          <Box className="flex flex-col mt-4">
            <Text>
              Age
              <Text as='span' className="text-colorFieldRequired -mt-1">*</Text>
            </Text>
            <input
              placeholder="Enter age"
              className="input-base"
              type="number"
              {...register('age')}
            />
            <Text as='span' className="text-colorFieldRequired">
              {errors.age?.message}
            </Text>
          </Box>
        </Box>

        <Box className="grid w-full gap-4 grid-cols-2 flex-wrap max-sm:grid-cols-1">
          <Box className="flex flex-col mt-4">
            <Text as='span'>Avatar</Text>

            <Box className="w-full flexItem">
              <input
                type="file"
                accept={TYPE_FILE_SUPPORT.toString()}
                {...register('avatar')}
              />
              {avatarPewview && (
                <DeleteIcon
                  onClick={() => handleClearValueImage('AVATAR')}
                  width="30"
                  className="pl-1 cursor-pointer opacity-60 hover:-translate-y-1 hover:text-colorPrimary hover:opacity-100"
                />
              )}
            </Box>
          
            <FitlImage
              height="140px"
              width='140px'
              url={avatarPewview}
              className="rounded-md border border-borderItemColor mt-3"
            />
            <Text as='span' className="text-colorFieldRequired">
              {errors.avatar?.message}
            </Text>
          </Box>

          <Box className="flex flex-col mt-4">
            <Text>Backgroud</Text>
            <Box className="w-full flexItem">
              <input
                type="file"
                accept={TYPE_FILE_SUPPORT.toString()}
                {...register('background')}
              />
              {backgroudPewview && (
                <DeleteIcon
                  onClick={() => handleClearValueImage('BACKGROUND')}
                  width="30"
                  className="pl-1 cursor-pointer opacity-60 hover:-translate-y-1 hover:text-colorPrimary hover:opacity-100"
                />
              )}
            </Box>

            <FitlImage
              height="140px"
              url={backgroudPewview}
              className="rounded-md border border-borderItemColor mt-3"
            />
            <Text as='span' className="text-colorFieldRequired">
              {errors.background?.message}
            </Text>
          </Box>
        </Box>

        <Box className="flexItem-center gap-4 mt-3">
          <ButtonPrimary
            className="!rounded-md mt-6"
            type="submit"
            title="Sign Up"
          />

          <ButtonPrimary
            onClick={() => push(PATH_NAME.home)}
            className="!rounded-md mt-6"
            type="button"
            title="Back"
            buttonType="close"
          />
        </Box>
        <FooterForm />
      </form>
    </Box>
  )
}

export default SignUp
