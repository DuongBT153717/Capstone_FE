import { ThemeProvider } from '@mui/material'
import './App.css'
import { theme } from './themes/theme'

import { ProSidebarProvider } from 'react-pro-sidebar'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Router from './router/routes'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ProSidebarProvider>
            <Router />
          </ProSidebarProvider>
          <ToastContainer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
