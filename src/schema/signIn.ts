import * as yup from 'yup'

export const schemaSignIn = yup.object().shape({
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
})
