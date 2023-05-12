import * as yup from 'yup'

export const schemaCreateCategory = yup.object().shape({
  title: yup
    .string()
    .trim()
    .max(100, 'Title cannot be longer than 100 characters')
    .required('Title must be required'),
  description: yup
    .string()
    .trim()
    .max(1000, 'Description cannot be longer than 1000 characters')
    .required('Description must be required'),
  avatar: yup
    .mixed()
    .test('required', 'Avatar must be required', (value: any) => {
      console.log(value)
      const fileChange: FileList = value
      if (fileChange?.[0]) return true
      return false
    })
    .test('fileSize', 'Maximum file size of 5MB', (value: any) => {
      console.log(value)
      const fileChange: FileList = value
      if (fileChange?.[0]) {
        return fileChange?.[0].size < 5000000
      }
      return true
    }),
  background: yup
    .mixed()
    .test('required', 'Background must be required', (value: any) => {
      const fileChange: FileList = value
      if (fileChange?.[0]) return true
      return false
    })
    .test('fileSize', 'Maximum file size of 5MB', (value: any) => {
      const fileChange: FileList = value
      if (fileChange?.[0]) {
        return fileChange?.[0].size < 5000000
      }
      return true
    }),
  attribute: yup.array().of(
    yup.object().shape({
      key: yup
        .string()
        .trim()
        .max(50, 'Key cannot be longer than 50 characters')
        .required('Key must be required'),
      value: yup
        .string()
        .trim()
        .max(350, 'Key cannot be longer than 350 characters')
        .required('Value must be required'),
    })
  ),
})

export const schemaEditCategory = yup.object().shape({
  title: yup
    .string()
    .trim()
    .max(100, 'Title cannot be longer than 100 characters')
    .required('Title must be required'),
  description: yup
    .string()
    .trim()
    .max(1000, 'Description cannot be longer than 1000 characters')
    .required('Description must be required'),
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
        return fileChange?.[0].size < 5000000
      }
      return true
    }),
  background: yup
    .mixed()
    .test('required', 'Background must be required', (value) => {
      if (typeof value === 'string') {
        return true
      } else {
        if (typeof value === 'string') {
          return true
        } else {
          if (value instanceof FileList) {
            return Boolean(value?.item(0))
          }
        }
      }
    })
    .test('fileSize', 'Maximum file size of 5MB', (value: any) => {
      const fileChange: FileList = value
      if (fileChange?.[0] && fileChange?.[0] instanceof File) {
        return fileChange?.[0].size < 5000000
      }
      return true
    }),
  attribute: yup.array().of(
    yup.object().shape({
      key: yup
        .string()
        .trim()
        .max(50, 'Key cannot be longer than 50 characters')
        .required('Key must be required'),
      value: yup
        .string()
        .trim()
        .max(350, 'Key cannot be longer than 350 characters')
        .required('Value must be required'),
    })
  ),
})
