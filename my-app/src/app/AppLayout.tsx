import { Outlet } from '@tanstack/react-router'
import { Toaster } from 'react-hot-toast'
import { CurrencyProvider } from '../contexts/CurrencyContext'

const AppLayout = () => {
  return (
    <CurrencyProvider>
      <Toaster />
      <Outlet />
    </CurrencyProvider>
  )
}

export default AppLayout
