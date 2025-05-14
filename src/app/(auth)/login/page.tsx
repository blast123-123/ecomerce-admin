import LoginPage from '@/modules/login/pages/login-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
}

const Login = () => {
  return (
    <>
      <LoginPage />
    </>
  )
}

export default Login
