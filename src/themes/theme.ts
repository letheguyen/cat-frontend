import { extendTheme } from '@chakra-ui/react'

// Config theme chakar Ui
export const themeChakarUi = extendTheme({
  fonts: {
    // Fonts style
    heading: 'Twinkle Star',
    body: 'Tilt Neon',
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
    backgroundCategory: '#fff',
    backgroundReject: '#5757578f',
    backgroundMenuApp: '#13858121',
    backgroundColorError: '#d55858',
    backgroundBodyColor: '#d2e4df42',
    backgroundColorScrollApp: '#afafaf',

    // Border
    borderItemColor: '#5f5f5f31',
  },
  fontSizes: {
    // Font size
    headingTitle: '28px',
    messageTitle: '20px',
    sizeMenuAdmin: '22px',
  },
  sizes: {
    // Size layout
    maxLayoutAdmin: '1380px',
  },
  radii: {
    // radius
    category: '6px',
  },
})

// Config theme Tailwind
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
    backgroundCategory: '#fff',
    backgroundReject: '#5757578f',
    backgroundMenuApp: '#13858121',
    backgroundColorError: '#d55858',
    backgroundBodyColor: '#d2e4df42',
    backgroundColorScrollApp: '#afafaf',

    // Border
    borderItemColor: '#5f5f5f31',
  },
  fontFamily: {
    // Font style
    heading: ['Twinkle Star', 'cursive'],
    body: [ 'Tilt Neon', 'cursive'],
  },
  borderRadius: {
    // Border radius
    category: '6px',
  },
  fontSize: {
    sizeMenuAdmin: '22px',
  },
  minWidth: {
    // Width min
    btn: '120px',
  },
  height: {
    heightDescribeCategory: '70px'
  },
  boxShadow: {
    'fourDirections': '0 0 6px rgba(0, 0, 0, 0.3)',
  },
  margin: {
    // margin
    '2px': '2px',
  },
}
