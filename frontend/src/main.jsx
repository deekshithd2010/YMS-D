import App from './App'
import { extendTheme,} from '@chakra-ui/react'
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'

const breakpoints = {
  base:'0px',
  sm: '500px',
  md: '821px',
  lg: '1200px',
  xl: '1560px',
  '2xl': '1600px',
}

const theme = extendTheme({ breakpoints })


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider  theme={theme}>
    <App />
    </ChakraProvider>
  </React.StrictMode>,
)
