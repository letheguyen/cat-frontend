import { MAX_FILE_SIZE } from '@/constants'
import * as yup from 'yup'

export const schemaShopInformation = yup.object().shape({
  avatar: yup
    .mixed()
    .test('required', 'Avatar must be required', (value) => {
      if (typeof value === 'string') {
        return true
      } else {
        if (value instanceof FileList) {
          return Boolean(value?.item(0))
        }
      }
    })
    .test('fileSize', 'Maximum file size of 5MB', (value: any) => {
      const fileChange: FileList = value
      if (fileChange?.[0] && fileChange?.[0] instanceof File) {
        return fileChange?.[0].size < MAX_FILE_SIZE
      }
      return true
    }),
  name: yup
    .string()
    .trim()
    .max(100, 'Shop name cannot be longer than 100 characters')
    .required('Shop name must be required'),
  description: yup
    .string()
    .trim()
    .max(1000, 'Description cannot be longer than 1000 characters')
    .required('Description must be required'),
  phone: yup.string().trim().required('Phone number must be required'),
  zalo: yup.string().trim().required('Zalo must be required'),
  facebook: yup.string().trim().required('Facebook must be required'),
  website: yup.string().trim().required('Website must be required'),
  attribute: yup.array().of(
    yup.object().shape({
      key: yup
        .string()
        .trim()
        .max(100, 'Key cannot be longer than 100 characters')
        .required('Key must be required'),
      value: yup
        .string()
        .trim()
        .max(500, 'Value cannot be longer than 500 characters')
        .required('Value must be required'),
    })
  ),
})
