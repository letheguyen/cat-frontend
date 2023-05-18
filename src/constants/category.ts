export const STATUS_CATEGORY = {
  start: 0,
  pause: -1,
} as const

export const FLAG_STATUS_CATEGORY = {
  [STATUS_CATEGORY.pause]: {
    title: 'Pause',
    style: { backgroundColor: '#d55858' },
  },
  [STATUS_CATEGORY.start]: {
    title: 'Start',
    style: { backgroundColor: '#138582f1' },
  },
} as const
