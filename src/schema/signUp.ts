import * as yup from 'yup'

export const schemaSignUp = yup.object().shape({
  userName: yup
    .string()
    .trim()
    .max(50, 'User name cannot be longer than 50 characters')
    .required('User name must be required'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email')
    .required('Email must be required'),
  password: yup
    .string()
    .trim()
    .max(50, 'Password cannot be longer than 50 characters')
    .required('Password must be required'),
  age: yup
    .number()
    .typeError('Age must be number')
    .required('Age must be required'),
  address: yup
    .string()
    .trim()
    .max(500, 'Address cannot be longer than 500 characters'),
  avatar: yup
    .mixed()
    .test('fileSize', 'Maximum file size of 5MB is allowed', (value: any) => {
      const fileChange: FileList = value
      if (fileChange[0]) {
        console.log(fileChange[0].size < 5000000)
        return fileChange[0].size < 5000000
      }
      return true
    }),
  background: yup
    .mixed()
    .test('fileSize', 'Maximum file size of 5MB is allowed', (value: any) => {
      const fileChange: FileList = value
      if (fileChange[0]) {
        console.log(fileChange[0].size < 5000000)
        return fileChange[0].size < 5000000
      }
      return true
    }),
})
