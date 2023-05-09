import { extendTheme } from '@chakra-ui/react'

export const themeChakarUi = extendTheme({
  fonts: {
    heading: 'Fredoka',
    body: 'Fredoka',
  },
  colors: {
    colorScroll: '#666666',
    textDescribeColor: '#727272',
    backgroundBodyColor: '#d2e4df42',
    borderColorInput: '#5f5f5f31',
    
    bgMenuLayoutAdmin: '#13858121',
    shadowItem: '#1385812c',
    primaryColor: '#138582f1',
    bgColorRefuse: '#5757578f',
    bgModal: '#f7f7f7',
    colorMessageError: '#ec0000cc',
    colorFieldRequired: '#ff2222f1',
    bgDelete: '#d55858',
  },
  fontSizes: {
    headingTitle: '28px',
  },
})

export const extendTailwind = {
  colors: {
    primaryColor: '#138582f1',
    itemsShadow: '#1385812c',
    bgDelete: '#d55858',
  },
}
