import { useRouter } from 'next/router'
import { Box, Text } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { memo, useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'

import {
  CODE_ERROR,
  ERROR_DATA,
  MODAL_TYPE,
  PATH_NAME,
  TYPE_FILE_SUPPORT,
} from '@/constants'
import { useStore } from '@/store'
import { CloseIcon, DeleteIcon } from '@/icons'
import { schemaCreateCategory } from '@/schema'
import { ButtonPrimary, HeadingTitle } from '@/components'
import { IDataCreateCategory, IDataPostCreateCategory } from '@/interfaces'
import { handleGetUrlImage as saveImage } from '@/utils'
import { createCategory, getDetailCategory } from '@/services'

import noImage from '/public/noImage.png'

const EditCreateCategory = () => {
  const { push, back, query } = useRouter()
  const { setLoading, setDataModal, closeModal } = useStore()
  const [avatarPewview, setAvatarPewview] = useState<File | string>()
  const [backgroudPewview, setBackgroudPewview] = useState<File | string>()

  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    resetField,
    watch,
    control,
    formState: { errors },
  } = useForm<IDataCreateCategory>({
    resolver: yupResolver(schemaCreateCategory),
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

      if (res.errorCode === CODE_ERROR.SUCCESS) {
        setDataModal({
          messageModal: 'Create category ' + ERROR_DATA[res.errorCode],
          modalKey: MODAL_TYPE.commonSuccess,
        })

        setTimeout(() => {
          closeModal()
          push(PATH_NAME.categorys)
        }, 3000)
      } else {
        setDataModal({
          messageModal: 'Category ' + ERROR_DATA[res.errorCode],
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

  const getCategory = async (id: string) => {
    setLoading(true)
    const res = await getDetailCategory(id)

    if (res) {
      setBackgroudPewview(res.background)
      setAvatarPewview(res.avatar)
      setValue('title', res.title)
      setValue('description', res.description)
      setValue('attribute', res.attribute)
    } else {
      setDataModal({
        messageModal: 'Category not found',
        modalKey: MODAL_TYPE.commonError,
      })
    }
    setTimeout(() => {
      setLoading(null)
    }, 600)
  }

  const handleShowImagePiewView = (data: undefined | File | string) => {
    switch (typeof data) {
      case 'string':
        return data
      case 'undefined':
        return noImage.src
      default:
        return URL.createObjectURL(data)
    }
  }

  useEffect(() => {
    const file = getValues('avatar')?.item(0)
    if (file) {
      setAvatarPewview(file)
    }
  }, [watch('avatar')])

  useEffect(() => {
    const file = getValues('background')?.item(0)
    if (file) {
      setBackgroudPewview(file)
    }
  }, [watch('background')])

  useEffect(() => {
    if (!query?.id) return
    getCategory(query.id as string)
  }, [query?.id])

  return (
    <form className="m-auto" onSubmit={handleSubmit(onSubmit)}>
      <HeadingTitle title="Update Category" />
      <Box className="flex flex-col mt-4">
        <Text>
          Title
          <Text as="span" color="colorFieldRequired" className="-mt-1">
            *
          </Text>
        </Text>
        <input
          type="text"
          {...register('title')}
          className="input-base"
          placeholder="Enter title"
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
          {...register('description')}
          className="input-base !h-auto"
          placeholder="Enter description"
        />
        <Text as="span" color="desColor">
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

          <Box className="w-full flexItem">
            <input
              multiple={false}
              type="file"
              accept={TYPE_FILE_SUPPORT.toString()}
              {...register('avatar')}
            />
            {avatarPewview && (
              <DeleteIcon
                width="30"
                onClick={() => handleClearValueImage('AVATAR')}
                className="pl-1 cursor-pointer opacity-60 hover:-translate-y-1 hover:text-primaryColor hover:opacity-100"
              />
            )}
          </Box>
          <Box
            borderColor="borderInputBase"
            className="mt-3 w-full pt-[100%] bg-cover cursor-pointer overflow-hidden border relative rounded-md"
            style={{
              backgroundImage:
                'url(' + handleShowImagePiewView(avatarPewview) + ')',
              backgroundPosition: 'center',
            }}
          ></Box>

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
              {...register('background')}
              accept={TYPE_FILE_SUPPORT.toString()}
            />
            {backgroudPewview && (
              <DeleteIcon
                onClick={() => handleClearValueImage('BACKGROUND')}
                width="30"
                className="pl-1 cursor-pointer opacity-60 hover:-translate-y-1 hover:text-primaryColor hover:opacity-100"
              />
            )}
          </Box>

          <Box
            borderColor="borderInputBase"
            className="mt-3 w-full h-full bg-cover cursor-pointer overflow-hidden border relative rounded-md"
            style={{
              backgroundImage:
                'url(' + handleShowImagePiewView(backgroudPewview) + ')',
              backgroundPosition: 'center',
            }}
          ></Box>

          <Text as="span" color="colorMessageError">
            {errors.background?.message}
          </Text>
        </Box>
      </Box>

      <Box className="mt-6">
        <Text className="">Attribute</Text>
        <Text as="span" color="desColor">
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
                placeholder="Enter key"
                className="input-base w-full"
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
                  color="var(--primary-color)"
                  className="rotate-90 w-12 mr-2 cursor-pointer ml-2 max-sm:w-6 max-sm:mt-0 transition-all ease-in hover:cursor-pointer hover:scale-110 "
                />
              </Box>
              <Text as="span" color="colorMessageError">
                {errors.attribute?.[i]?.value?.message}
              </Text>
            </Box>
          </Box>
        ))}

        <ButtonPrimary
          type="button"
          onClick={appendAttribute}
          title="+ Add new attribute"
          className="!rounded-md mt-6 m-auto"
        />
      </Box>

      <Box className="flex gap-4 mt-3">
        <ButtonPrimary
          type="submit"
          title="Update"
          className="!rounded-md mt-6"
        />

        <ButtonPrimary
          title="Back"
          type="button"
          onClick={back}
          buttonType="close"
          className="!rounded-md mt-6"
        />
      </Box>
    </form>
  )
}

export default memo(EditCreateCategory)
