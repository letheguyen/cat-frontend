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
import { schemaEditCategory } from '@/schema'
import { IDataPostCreateCategory } from '@/interfaces'
import { handleGetUrlImage as saveImage } from '@/utils'
import { getDetailCategory, updateCategorys } from '@/services'
import { ButtonPrimary, HeadingTitle, FitlImage } from '@/components'

import noImage from '/public/noImage.png'

const EditCreateCategory = () => {
  const { push, back, query } = useRouter()
  const { setLoading, setDataModal, closeModal } = useStore()
  const [avatarPewview, setAvatarPewview] = useState<File | string | null>()
  const [backgroudView, setBackgroudView] = useState<File | string | null>()

  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    resetField,
    watch,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<IDataPostCreateCategory>({
    resolver: yupResolver(schemaEditCategory),
  })

  // Array atrribute
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'attribute',
  })

  // handle edit file
  const onSubmit = async (data: IDataPostCreateCategory) => {
    setLoading(true)

    // upload file
    const { isError: isErr, imageURl: url } = await saveImage(data.avatar?.[0])
    const { isError, imageURl } = await saveImage(data.background?.[0])

    // Upload file error
    if (isErr || isError) {
      setLoading(false)
      handleUploadFailure()
    }

    // Upload success
    if (!isErr && !isError) {
      // Data edit category
      const dataCreateCategory: IDataPostCreateCategory = {
        ...data,
        avatar: url ? url : (avatarPewview as string),
        background: imageURl ? imageURl : (backgroudView as string),
      }

      // Call API update
      const res = await updateCategorys(query.id as string, dataCreateCategory)

      if (res.errorCode === CODE_ERROR.SUCCESS) {
        setDataModal({
          messageModal: 'Create category ' + ERROR_DATA[res.errorCode],
          modalKey: MODAL_TYPE.commonSuccess,
        })
        push(PATH_NAME.categorys)
        setTimeout(() => {
          closeModal()
        }, 3000)
      } else {
        setDataModal({
          messageModal: 'Category ' + ERROR_DATA[res.errorCode],
          modalKey: MODAL_TYPE.commonError,
        })
      }
    }
    setLoading(false)
  }

  // Clear imgae
  const handleClearValueImage = (type: string) => {
    if (type === 'AVATAR') {
      setAvatarPewview(undefined)
      resetField('avatar')
    } else {
      setBackgroudView(undefined)
      resetField('background')
    }
  }

  // Show modal upload error
  const handleUploadFailure = () => {
    setDataModal({
      messageModal: 'Upload image failure',
      modalKey: MODAL_TYPE.commonError,
    })
  }

  // add new atrribute
  const appendAttribute = () => append({ key: '', value: '' })

  // Get data detail category
  const getCategory = async (id: string) => {
    setLoading(true)
    const res = await getDetailCategory(id)
    if (res) {
      setValue('title', res.title)
      setValue('avatar', res.avatar)
      setValue('background', res.background)
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

  const handleShowImagePiewView = (data: undefined | null | File | string) => {
    switch (typeof data) {
      case 'string':
        return data
      case 'undefined':
        return noImage.src
      default:
        if (data) {
          return URL.createObjectURL(data)
        }
    }
  }

  useEffect(() => {
    const file = getValues('avatar')
    if (file instanceof FileList) {
      setAvatarPewview(file?.item(0))
    } else {
      setAvatarPewview(file)
    }
  }, [watch('avatar')])

  useEffect(() => {
    const file = getValues('background')
    if (file instanceof FileList) {
      setBackgroudView(file?.item(0))
    } else {
      setBackgroudView(file)
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

        <Box className="flex flex-col mt-4 w-full">
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
            {backgroudView && (
              <DeleteIcon
                onClick={() => handleClearValueImage('BACKGROUND')}
                width="30"
                className="pl-1 cursor-pointer opacity-60 hover:-translate-y-1 hover:text-colorPrimary hover:opacity-100"
              />
            )}
          </Box>

          <FitlImage
            height="34%"
            url={backgroudView}
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
                  className="text-colorPrimary rotate-90 w-12 mr-2 cursor-pointer ml-2 max-sm:w-6 max-sm:mt-0 transition-all ease-in hover:cursor-pointer hover:scale-110 "
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
