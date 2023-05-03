export const CODE_ERROR = {
  EXISTS: 1,
  SUCCESS: 2,
  SERVER: 9999,
  NO_DATA: 3
} as const

export const ERROR_DATA = {
  [CODE_ERROR.EXISTS]: 'already exists',
  [CODE_ERROR.SUCCESS]: 'success',
  [CODE_ERROR.SERVER]: 'Something went wrong',
  [CODE_ERROR.NO_DATA]: 'not found'
}