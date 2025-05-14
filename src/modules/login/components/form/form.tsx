import NetworkLogo from '@/components/logo/logo'
import LoginForm from './login'
import Portada from './login.ilustraitor'

const FormLogin = () => {
  return (
    <>
      <main className="flex min-h-screen w-full bg-gray-200">
        <div className="flex w-full flex-col md:flex-row rounded-3xl overflow-hidden max-w-6xl mx-auto my-auto shadow-lg bg-white">
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
            <div className="mb-8">
              <NetworkLogo />
            </div>
            <LoginForm />
          </div>
          <div className="w-full md:w-1/2 bg-gray-100 p-8 md:p-0 flex items-center justify-center">
            <Portada />
          </div>
        </div>
      </main>
    </>
  )
}

export default FormLogin
