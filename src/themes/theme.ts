import { extendTheme } from '@chakra-ui/react'

export const themeChakarUi = extendTheme({
  fonts: {
    heading: 'Fredoka',
    body: 'Fredoka',
  },
  colors: {
    //  Color
    colorTextApp: '#1d1d1d',
    colorPrimary: '#138582f1',
    colorScrollApp: '#666666',
    colorShadowItem: '#1385812c',
    colorTextDescribe: '#727272',
    colorMessageError: '#ec0000cc',
    colorFieldRequired: '#ff2222f1',

    // Background
    backgroundModal: '#f7f7f7',
    backgroundReject: '#5757578f',
    backgroundMenuApp: '#13858121',
    backgroundColorError: '#d55858',
    backgroundBodyColor: '#d2e4df42',

    // Border
    borderItemColor: '#5f5f5f31',
  },
  fontSizes: {
    headingTitle: '28px',
  },
})

export const extendTailwind = {
  colors: {
    //  Color
    colorTextApp: '#1d1d1d',
    colorPrimary: '#138582f1',
    colorScrollApp: '#666666',
    colorShadowItem: '#1385812c',
    colorTextDescribe: '#727272',
    colorMessageError: '#ec0000cc',
    colorFieldRequired: '#ff2222f1',

    // Background
    backgroundModal: '#f7f7f7',
    backgroundReject: '#5757578f',
    backgroundMenuApp: '#13858121',
    backgroundColorError: '#d55858',
    backgroundBodyColor: '#d2e4df42',

    // Border
    borderItemColor: '#5f5f5f31',
  },
  minWidth: {
    btn: '120px',
  },
}
