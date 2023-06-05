import { useRouter } from 'next/router'
import { Box, Text } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { memo, useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'

import {
  CODE_ERROR,
  RESPONSE_DATA,
  MODAL_TYPE,
  PATH_NAME,
  TIME_CLOSE_MODAL_SUCCESS,
  TYPE_FILE_SUPPORT,
} from '@/constants'
import { IDataCreateCategory, IDataPostCreateCategory } from '@/interfaces'
import { useStore } from '@/store'
import { createCategory } from '@/services'
import { CloseIcon, DeleteIcon } from '@/icons'
import { schemaCreateCategory } from '@/schema'
import { handleGetUrlImage as saveImage } from '@/utils'
import { ButtonPrimary, FitlImage, HeadingTitle } from '@/components'

const CreateCategory = () => {
  const { push } = useRouter()
  const { setLoading, setDataModal, closeModal } = useStore()
  const [avatarPewview, setAvatarPewview] = useState<File>()
  const [backgroudPewview, setBackgroudPewview] = useState<File>()

  const {
    register,
    getValues,
    handleSubmit,
    resetField,
    watch,
    control,
    formState: { errors },
  } = useForm<IDataCreateCategory>({
    resolver: yupResolver(schemaCreateCategory),
    defaultValues: {
      attribute: [
        {
          key: '',
          value: '',
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'attribute',
  })

  const onSubmit = async (data: IDataCreateCategory) => {
    setLoading(true)

    const { isError: isErr, imageURl: url } = await saveImage(data.avatar[0])
    const { isError, imageURl } = await saveImage(data.background[0])

    if (url && imageURl) {
      const dataCreateCategory: IDataPostCreateCategory = {
        ...data,
        avatar: url,
        background: imageURl,
      }
      const res = await createCategory(dataCreateCategory)
      setLoading(false)

      if (res?.errorCode === CODE_ERROR.SUCCESS) {
        setDataModal({
          messageModal: 'Create category ' + RESPONSE_DATA[res?.errorCode],
          modalKey: MODAL_TYPE.commonSuccess,
        })

        setTimeout(() => {
          closeModal()
          push({ pathname: PATH_NAME.categorys, query: { page: 1 } })
        }, TIME_CLOSE_MODAL_SUCCESS)
      } else {
        setDataModal({
          messageModal: 'Category ' + RESPONSE_DATA[res?.errorCode],
          modalKey: MODAL_TYPE.commonError,
        })
      }
    }

    if (isErr || isError) {
      setLoading(false)
      handleUploadFailure()
    }
  }

  const handleClearValueImage = (type: string) => {
    if (type === 'AVATAR') {
      setAvatarPewview(undefined)
      resetField('avatar')
    } else {
      setBackgroudPewview(undefined)
      resetField('background')
    }
  }

  const handleUploadFailure = () => {
    setDataModal({
      messageModal: 'Upload image failure',
      modalKey: MODAL_TYPE.commonError,
    })
  }

  const appendAttribute = () => {
    append({
      key: '',
      value: '',
    })
  }

  useEffect(() => {
    const file = getValues('avatar')?.item(0)
    if (file) {
      setAvatarPewview(file)
    }
    // eslint-disable-next-line
  }, [watch('avatar')])

  useEffect(() => {
    const file = getValues('background')?.item(0)
    if (file) {
      setBackgroudPewview(file)
    }
    // eslint-disable-next-line
  }, [watch('background')])

  return (
    <form className="m-auto" onSubmit={handleSubmit(onSubmit)}>
      <HeadingTitle title="Create Category" />
      <Box className="flex flex-col mt-4">
        <Text>
          Title
          <Text as="span" color="colorFieldRequired" className="-mt-1">
            *
          </Text>
        </Text>
        <input
          placeholder="Enter title"
          className="input-base"
          type="text"
          {...register('title')}
        />
        <Text as="span" color="colorMessageError">
          {errors.title?.message}
        </Text>
      </Box>

      <Box className="flex flex-col mt-4">
        <Text>
          Description
          <Text as="span" color="colorFieldRequired" className="-mt-1">
            *
          </Text>
        </Text>
        <textarea
          rows={8}
          cols={50}
          placeholder="Enter description"
          className="input-base !h-auto"
          {...register('description')}
        />
        <Text as="span" color="colorTextDescribe">
          Description of catalog information up to 1.000 characters.
        </Text>
        <Text as="span" color="colorMessageError">
          {errors.description?.message}
        </Text>
      </Box>

      <Box className="flex gap-4">
        <Box className="flex flex-col mt-4 w-1/4">
          <Text>
            Avatar
            <Text as="span" color="colorFieldRequired" className="-mt-1">
              *
            </Text>
          </Text>

          <Box className="w-full flex items-center">
            <input
              multiple={false}
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
            url={avatarPewview}
            className="rounded-md border border-borderItemColor mt-3"
          />

          <Text as="span" color="colorMessageError">
            {errors.avatar?.message}
          </Text>
        </Box>

        <Box className="flex flex-col mt-4 flex-1">
          <Text>
            Backgroud
            <Text as="span" color="colorFieldRequired" className="-mt-1">
              *
            </Text>
          </Text>

          <Box className="w-full flex items-center">
            <input
              type="file"
              multiple={false}
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
            height="34%"
            url={backgroudPewview}
            className="rounded-md border border-borderItemColor mt-3"
          />

          <Text as="span" color="colorMessageError">
            {errors.background?.message}
          </Text>
        </Box>
      </Box>

      <Box className="mt-6">
        <Text className="">Attribute</Text>
        <Text as="span" color="colorTextDescribe">
          Enter an additional description for the catalog of goods.
          <br /> Information includes 2 key and value values, a valid
          description is a description that includes all 2 specified information
          fields.
        </Text>
        {fields.map((_, i) => (
          <Box key={i} className="flex gap-4 mt-3">
            <Box className="w-96">
              <Text>Key</Text>
              <input
                className="input-base w-full"
                placeholder="Enter key"
                {...register(`attribute.${i}.key`)}
              />
              <Text as="span" color="colorMessageError">
                {errors.attribute?.[i]?.key?.message}
              </Text>
            </Box>

            <Box className="flex-1">
              <Text>Value</Text>
              <Box className="flex flex-1 items-center">
                <input
                  className="input-base w-full"
                  placeholder="Enter value"
                  {...register(`attribute.${i}.value`)}
                />
                <CloseIcon
                  width="24"
                  height="24"
                  onClick={() => remove(i)}
                  className="iconClose mr-2"
                />
              </Box>
              <Text as="span" color="colorMessageError">
                {errors.attribute?.[i]?.value?.message}
              </Text>
            </Box>
          </Box>
        ))}
        <ButtonPrimary
          onClick={appendAttribute}
          className="!rounded-md mt-6 m-auto"
          type="button"
          title="+ Add new attribute"
        />
      </Box>

      <Box className="flex gap-4 mt-3">
        <ButtonPrimary
          className="!rounded-md mt-6"
          type="submit"
          title="Create Category"
        />
      </Box>
    </form>
  )
}

export default memo(CreateCategory)
