import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useMemo, useState } from 'react'

import {
  CODE_ERROR,
  ERROR_DATA,
  MODAL_TYPE,
  PATH_NAME,
  TYPE_FILE_SUPPORT,
} from '@/constants'
import { schemaSignUp } from '@/schema'
import { IProvinces, TypeFormSignUp } from '@/interfaces'
import { ButtonPrimary, FooterForm } from '@/components'
import { getProvinces, signUp, getDistricts, getWards } from '@/services'
import { useStore } from '@/store'
import { handleGetUrlImage as saveImage } from '@/utils'
import { DeleteIcon } from '@/icons'

import noImage from '/public/noImage.png'

const SignUp = () => {
  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<TypeFormSignUp>({
    resolver: yupResolver(schemaSignUp),
  })
  const { push } = useRouter()
  const { setLoading, setDataModal, closeModal } = useStore()
  const [provinces, setProvinces] = useState<IProvinces[] | null>(null)
  const [districts, setDistricts] = useState<IProvinces[] | null>(null)
  const [wards, setWards] = useState<IProvinces[] | null>(null)
  const [defaultDistricts, setDefaultDistricts] = useState('No data')
  const [defaultWards, setDefaultWards] = useState('No data')
  const [avatarPewview, setAvatarPewview] = useState<File>()
  const [backgroudPewview, setBackgroudPewview] = useState<File>()

  const onSubmit = async (data: TypeFormSignUp) => {
    setLoading(true)
    const wards = handleGetDataAddress(data?.wards)
    const provinces = handleGetDataAddress(data?.provinces)
    const districts = handleGetDataAddress(data?.districts)

    const { isError: isErr, imageURl: url } = await saveImage(data.avatar?.[0])
    const { isError, imageURl } = await saveImage(data.background?.[0])

    let dataSignUp: any = {
      ...data,
      avatar: url,
      background: imageURl,
      provinces,
      districts,
      wards,
    }

    if (isErr || isError) {
      handleUploadFailure()
      dataSignUp = {}
    }

    const newDataSignup: any = Object.keys(dataSignUp).reduce((data, field) => {
      if (!dataSignUp[field]) return data
      return { ...data, [field]: dataSignUp[field] }
    }, {})

    if (newDataSignup) {
      const res = await signUp(newDataSignup)

      if (res.errorCode === CODE_ERROR.SUCCESS) {
        setDataModal({
          messageModal: 'Sign up ' + ERROR_DATA[res.errorCode],
          showModal: true,
          modalKey: MODAL_TYPE.commonSuccess,
        })

        setTimeout(() => {
          closeModal()
          push(PATH_NAME.signIn)
        }, 2000)
      } else {
        setDataModal({
          messageModal: 'Sign up ' + ERROR_DATA[res.errorCode],
          showModal: true,
          modalKey: MODAL_TYPE.commonError,
        })
      }
    }

    setTimeout(() => {
      setLoading(false)
    }, 300)
  }

  const handleGetDataAddress = (data: string | undefined) => {
    if (!data) return undefined
    const showData: IProvinces = JSON.parse(data)
    return showData?.name
  }

  const handleUploadFailure = () => {
    setDataModal({
      messageModal: 'Upload image failure',
      showModal: true,
      modalKey: MODAL_TYPE.commonError,
    })
  }

  const handleGetDataDistricts = async () => {
    const valueProvinces = getValues('provinces')
    if (valueProvinces) {
      setValue('districts', undefined)
      setValue('wards', undefined)
      setDefaultDistricts('Loading...')
      const dataProvinces: IProvinces = JSON.parse(valueProvinces)
      const districts: IProvinces[] | null = await getDistricts(
        dataProvinces.code
      )
      setWards(null)
      setDistricts(districts)
      setDefaultDistricts('No data')
    }
  }

  const handleGetDataWards = async () => {
    const valueDistricts = getValues('districts')
    if (valueDistricts) {
      setValue('wards', undefined)
      setDefaultWards('Loading...')
      const dataDistricts: IProvinces = JSON.parse(valueDistricts)
      const wards: IProvinces[] | null = await getWards(dataDistricts.code)
      setWards(wards)
      setDefaultWards('No data')
    }
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
    handleGetDataDistricts()
  }, [watch('provinces')])

  useEffect(() => {
    handleGetDataWards()
  }, [watch('districts')])

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

  useMemo(async () => {
    const provincesData: IProvinces[] | null = await getProvinces()
    setProvinces(provincesData)
  }, [])

  return (
    <div className="main-content pt-4 mb-12">
      <form className="max-w-xl m-auto" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-5xl sm:hidden text-[var(--primary-color)]">
          Sign Up
        </p>
        <div className="grid w-full gap-4 grid-cols-2 flex-wrap">
          <div className="flex flex-col mt-4">
            <p>
              User name
              <span className="text-[var(--color-field-required)] -mt-1">
                *
              </span>
            </p>
            <input
              placeholder="Enter user name"
              className="input-base"
              type="text"
              {...register('userName')}
            />
            <span className="text-[var(--color-message-error)]">
              {errors.userName?.message}
            </span>
          </div>

          <div className="flex flex-col mt-4">
            <p>
              Phone number
              <span className="text-[var(--color-field-required)] -mt-1">
                *
              </span>
            </p>
            <input
              placeholder="Phone number"
              className="input-base"
              type="text"
              {...register('phone')}
            />
            <span className="text-[var(--color-message-error)]">
              {errors.phone?.message}
            </span>
          </div>
        </div>

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

        <div className="grid w-full gap-4 grid-cols-2 flex-wrap">
          <div className="flex flex-col mt-4">
            <p>
              Password
              <span className="text-[var(--color-field-required)] -mt-1">
                *
              </span>
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

          <div className="flex flex-col mt-4">
            <p>
              Age
              <span className="text-[var(--color-field-required)] -mt-1">
                *
              </span>
            </p>
            <input
              placeholder="Enter age"
              className="input-base"
              type="number"
              {...register('age')}
            />
            <span className="text-[var(--color-message-error)]">
              {errors.age?.message}
            </span>
          </div>
        </div>

        <div className="grid w-full gap-4 grid-cols-2 flex-wrap">
          <div className="flex flex-col mt-4 w-full">
            <p>Provinces</p>

            <div className="w-full max-w-xs relative">
              <select
                disabled={!provinces}
                className={clsx('input-base w-full')}
                {...register('provinces')}
              >
                {provinces &&
                  provinces?.length > 0 &&
                  provinces?.map((province) => (
                    <option
                      key={province.code}
                      value={JSON.stringify(province)}
                    >
                      {province.name}
                    </option>
                  ))}
              </select>
              {!provinces && (
                <div className="affter-no-data input-base">No data</div>
              )}
            </div>

            <span className="text-[var(--color-message-error)]">
              {errors.provinces?.message}
            </span>
          </div>

          <div className="flex flex-col mt-4 w-full">
            <p>Districts</p>

            <div className="w-full max-w-xs relative">
              <select
                disabled={!districts}
                className={clsx('input-base w-full')}
                {...register('districts')}
              >
                {districts &&
                  districts?.length > 0 &&
                  districts?.map((district) => (
                    <option
                      key={district.code}
                      value={JSON.stringify(district)}
                    >
                      {district.name}
                    </option>
                  ))}
              </select>
              {!districts && (
                <div className="affter-no-data input-base">
                  {defaultDistricts}
                </div>
              )}
            </div>

            <span className="text-[var(--color-message-error)]">
              {errors.districts?.message}
            </span>
          </div>

          <div className="flex flex-col">
            <p>Wards</p>

            <div className="w-full max-w-xs relative">
              <select
                disabled={!wards}
                className={clsx('input-base w-full')}
                {...register('wards')}
              >
                {wards &&
                  wards?.length > 0 &&
                  wards?.map((ward) => (
                    <option key={ward.code} value={JSON.stringify(ward)}>
                      {ward.name}
                    </option>
                  ))}
              </select>
              {!wards && (
                <div className="affter-no-data input-base">{defaultWards}</div>
              )}
            </div>

            <span className="text-[var(--color-message-error)]">
              {errors.wards?.message}
            </span>
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <p>Address details</p>
          <textarea
            rows={4}
            cols={50}
            placeholder="Enter address detail"
            className="input-base !h-auto"
            {...register('addressDetail')}
          />
          <span className="text-[var(--des-color)]">
            Enter your address details here.
          </span>
          <span className="text-[var(--color-message-error)]">
            {errors.addressDetail?.message}
          </span>
        </div>

        <div className="grid w-full gap-4 grid-cols-2 flex-wrap max-sm:grid-cols-1">
          <div className="flex flex-col mt-4">
            <p>Avatar</p>

            <div className="w-full flex items-center">
              <input
                type="file"
                accept={TYPE_FILE_SUPPORT.toString()}
                {...register('avatar')}
              />
              {avatarPewview && (
                <DeleteIcon
                  onClick={() => handleClearValueImage('AVATAR')}
                  width="30"
                  className="pl-1 cursor-pointer opacity-60 hover:-translate-y-[2px] hover:text-[var(--primary-color)] hover:opacity-100"
                />
              )}
            </div>
            <div
              className="mt-3 w-40 h-40 bg-cover cursor-pointer overflow-hidden border border-[var(--border-input-base)] relative rounded-md"
              style={{
                backgroundImage: avatarPewview
                  ? 'url(' + URL.createObjectURL(avatarPewview) + ')'
                  : 'url(' + noImage.src + ')',
                backgroundPosition: 'center',
              }}
            ></div>
            <span className="text-[var(--color-message-error)]">
              {errors.avatar?.message}
            </span>
          </div>

          <div className="flex flex-col mt-4">
            <p>Backgroud</p>
            <div className="w-full flex items-center">
              <input
                type="file"
                accept={TYPE_FILE_SUPPORT.toString()}
                {...register('background')}
              />
              {backgroudPewview && (
                <DeleteIcon
                  onClick={() => handleClearValueImage('BACKGROUND')}
                  width="30"
                  className="pl-1 cursor-pointer opacity-60 hover:-translate-y-[2px] hover:text-[var(--primary-color)] hover:opacity-100"
                />
              )}
            </div>
            <div
              className="mt-3 w-full h-40  bg-cover cursor-pointer overflow-hidden border border-[var(--border-input-base)] relative rounded-md"
              style={{
                backgroundImage: backgroudPewview
                  ? 'url(' + URL.createObjectURL(backgroudPewview) + ')'
                  : 'url(' + noImage.src + ')',
                backgroundPosition: 'center',
              }}
            ></div>
            <span className="text-[var(--color-message-error)]">
              {errors.background?.message}
            </span>
          </div>
        </div>

        <div className="flex gap-4 mt-3">
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
        </div>
        <FooterForm />
      </form>
    </div>
  )
}

export default SignUp
