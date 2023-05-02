export const API_URL = {
  users: '/users',
  signUp: '/sign-up',
  signIn: '/sign-in',
  upload: '/upload',
  provinces: '/provinces/getAll?limit=-1',
  districts: '/districts/getByProvince',
  wards: '/wards/getByDistrict',
  createCategory: '/create-category'
} as const