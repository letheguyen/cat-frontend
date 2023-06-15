import { Box, Text } from '@chakra-ui/react'
import React, { memo, useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useFieldArray } from 'react-hook-form'

import {
  CODE_ERROR,
  RESPONSE_DATA,
  MODAL_TYPE,
  TYPE_FILE_SUPPORT,
} from '@/constants'
import { useStore } from '@/store'
import { CloseIcon, DeleteIcon } from '@/icons'
import { schemaShopInformation } from '@/schema'
import { IDataShopInformation } from '@/interfaces'
import { handleGetUrlImage as saveImage } from '@/utils'
import { getInformation, updateInformation } from '@/services'
import { ButtonPrimary, FitlImage, HeadingTitle } from '@/components'

const ShopInformation = () => {
  const { setDataModal, setLoading, dataShop, setDataShopInfo } = useStore()
  const [avatarPewview, setAvatarPewview] = useState<File | string | null>()

  const {
    watch,
    control,
    setValue,
    register,
    getValues,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<IDataShopInformation>({
    resolver: yupResolver(schemaShopInformation),
    defaultValues: {
      attribute: [
        {
          key: '',
          value: '',
        },
      ],
      ...dataShop,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'attribute',
  })

  const onSubmit = async (data: IDataShopInformation) => {
    setLoading(true)
    const { isError, imageURl } = await saveImage(data.avatar[0])

    if (isError) {
      handleUploadFailure()
    } else {
      const newData = {
        ...data,
        avatar: imageURl ? imageURl : data.avatar,
      }

      const res = await updateInformation(newData)
      const dataShop = await getInformation()

      if (res?.errorCode === CODE_ERROR.SUCCESS && dataShop?.[0]) {
        setDataShopInfo(dataShop[0])

        setDataModal({
          messageModal: 'Update information ' + RESPONSE_DATA[res?.errorCode],
          modalKey: MODAL_TYPE.commonSuccess,
        })
      } else {
        setDataModal({
          messageModal: 'Category ' + RESPONSE_DATA[res?.errorCode],
          modalKey: MODAL_TYPE.commonError,
        })
      }
    }
    setLoading(false)
  }

  const appendAttribute = () => {
    append({
      key: '',
      value: '',
    })
  }

  const handleUploadFailure = () => {
    setDataModal({
      messageModal: 'Upload image failure',
      modalKey: MODAL_TYPE.commonError,
    })
  }

  const handleGetDataShopInfo = async () => {
    const dataShop = await getInformation()
    if (dataShop?.[0]) {
      setValue('avatar', dataShop[0].avatar)
      setValue('name', dataShop[0].name)
      setValue('description', dataShop[0].description)
      setValue('phone', dataShop[0].phone)
      setValue('facebook', dataShop[0].facebook)
      setValue('zalo', dataShop[0].zalo)
      setValue('website', dataShop[0].website)
      setValue('attribute', dataShop[0].attribute)
      setDataShopInfo(dataShop[0])
    }
  }

  useEffect(() => {
    const file = getValues('avatar')
    if (file instanceof FileList) {
      setAvatarPewview(file?.item(0))
    } else {
      setAvatarPewview(file)
    }
    // eslint-disable-next-line
  }, [watch('avatar')])

  useEffect(() => {
    if (dataShop) return
    handleGetDataShopInfo()
  }, [])

  return (
    <form className="h-full pb-20" onSubmit={handleSubmit(onSubmit)}>
      <HeadingTitle title="Shop Information" />

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
              className="transition-all ease-in"
              accept={TYPE_FILE_SUPPORT.toString()}
              {...register('avatar')}
            />
            {avatarPewview && (
              <DeleteIcon
                width="30"
                className="pl-1 cursor-pointer opacity-60 hover:-translate-y-1 hover:text-colorPrimary hover:opacity-100"
                onClick={() => {
                  setAvatarPewview(undefined)
                  resetField('avatar')
                }}
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
      </Box>

      <Box className="flex flex-col mt-4">
        <Text>
          Shop name
          <Text as="span" color="colorFieldRequired" className="-mt-1">
            *
          </Text>
        </Text>
        <input
          placeholder="Enter title"
          className="input-base"
          type="text"
          {...register('name')}
        />
        <Text as="span" color="colorMessageError">
          {errors.name?.message}
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

        <Text as="span" color="colorMessageError">
          {errors.description?.message}
        </Text>
      </Box>

      <Box className="flex flex-col mt-4">
        <Text>
          Phone Number
          <Text as="span" color="colorFieldRequired" className="-mt-1">
            *
          </Text>
        </Text>
        <input
          placeholder="Enter title"
          className="input-base"
          type="text"
          {...register('phone')}
        />
        <Text as="span" color="colorMessageError">
          {errors.phone?.message}
        </Text>
      </Box>

      <Box className="flex flex-col mt-4">
        <Text>
          Zalo
          <Text as="span" color="colorFieldRequired" className="-mt-1">
            *
          </Text>
        </Text>
        <input
          placeholder="Enter title"
          className="input-base"
          type="text"
          {...register('zalo')}
        />
        <Text as="span" color="colorMessageError">
          {errors.zalo?.message}
        </Text>
      </Box>

      <Box className="flex flex-col mt-4">
        <Text>
          Facebook
          <Text as="span" color="colorFieldRequired" className="-mt-1">
            *
          </Text>
        </Text>
        <input
          placeholder="Enter title"
          className="input-base"
          type="text"
          {...register('facebook')}
        />
        <Text as="span" color="colorMessageError">
          {errors.facebook?.message}
        </Text>
      </Box>

      <Box className="flex flex-col mt-4">
        <Text>
          Website
          <Text as="span" color="colorFieldRequired" className="-mt-1">
            *
          </Text>
        </Text>
        <input
          placeholder="Enter title"
          className="input-base"
          type="text"
          {...register('website')}
        />
        <Text as="span" color="colorMessageError">
          {errors.website?.message}
        </Text>
      </Box>

      <Box className="flex flex-col mt-10">
        <Text>Attribute</Text>
        {fields.map((field, i) => (
          <Box key={field.id} className="flex gap-4 mt-3">
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
          className="!rounded-md mt-6 mr-auto"
          type="button"
          buttonType="dotted"
          title="+ Add new attribute"
        />
      </Box>

      <Box className="flex gap-4 mt-3">
        <ButtonPrimary
          className="!rounded-md mt-6"
          type="submit"
          title="Update Information"
        />
      </Box>
    </form>
  )
}

export default memo(ShopInformation)
