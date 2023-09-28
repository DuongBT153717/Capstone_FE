import { ThemeProvider } from '@mui/material'
import './App.css'
import { theme } from './themes/theme'

import { ProSidebarProvider } from 'react-pro-sidebar'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './contexts/AuthContext'
import Router from './router/routes'

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <ProSidebarProvider>
            <Router />
          </ProSidebarProvider>
        </AuthProvider>
        <ToastContainer />
      </ThemeProvider>
    </>
  )
}

export default App
