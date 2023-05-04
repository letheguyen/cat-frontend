export const ADMIN_PATH = {
  admin: '/admin',
  categorys: '/admin/categorys',
  categorysEdit: '/admin/categorys/edit',
  categoryCreate: '/admin/create-category',
} as const

export const SIGN_IN_UP = {
  signIn: '/sign-in',
  signUp: '/sign-up',
} as const

export const PUBLIC_PATH = {
  home: '/',
} as const

export const USER_PATH = {
  user: '/user/'
} as const

export const PATH_NAME = {
  ...PUBLIC_PATH,
  ...SIGN_IN_UP,
  ...ADMIN_PATH,
  ...USER_PATH
} as const
