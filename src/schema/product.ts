import { MAX_FILE_SIZE } from '@/constants'
import * as yup from 'yup'

export const schemaCreateProduct = yup.object().shape({
  category: yup.string().trim().required('Category must be required'),
  title: yup
    .string()
    .trim()
    .max(100, 'Title cannot be longer than 100 characters')
    .required('Title must be required'),
  description: yup
    .string()
    .trim()
    .max(16000, 'Description cannot be longer than 16000 characters')
    .required('Description must be required'),
  attribute: yup.array().of(
    yup.object().shape({
      key: yup
        .string()
        .trim()
        .max(50, 'Key cannot be longer than 50 characters'),
      value: yup
        .string()
        .trim()
        .max(350, 'Value cannot be longer than 350 characters'),
    })
  ),
  images: yup.array().of(
    yup.object().shape({
      image: yup
        .mixed()
        .test('required', 'Image must be required', (value: any) => {
          const fileChange: FileList = value
          if (fileChange?.[0]) return true
          return false
        })
        .test('fileSize', 'Maximum file size of 5MB', (value: any) => {
          const fileChange: FileList = value
          if (fileChange?.[0]) {
            return fileChange?.[0].size < MAX_FILE_SIZE
          }
          return true
        }),
      attribute: yup
        .string()
        .trim()
        .max(50, 'Attribute cannot be longer than 50 characters'),
      detailSizeType: yup.array().of(
        yup.object().shape({
          sizeAndType: yup
            .string()
            .trim()
            .max(30, 'Size and type cannot be longer than 30 characters')
            .required('Size and type must be required'),
          quantity: yup
            .number()
            .typeError('Quantity not must be number')
            .min(1, 'Quantity should not be less than 1')
            .required('Quantity must be required'),
          price: yup
            .number()
            .typeError('Price not must be number')
            .min(0.0001, 'Price should not be less than 0.0001 VNĐ')
            .required('Price must be required'),
        })
      ),
    })
  ),
  detailSizeType: yup.array().of(
    yup.object().shape({
      sizeAndType: yup
        .string()
        .trim()
        .max(30, 'Size and type cannot be longer than 30 characters')
        .required('Size and type must be required'),
      quantity: yup
        .number()
        .typeError('Quantity not must be number')
        .min(1, 'Quantity should not be less than 1')
        .required('Quantity must be required'),
    })
  ),
})
