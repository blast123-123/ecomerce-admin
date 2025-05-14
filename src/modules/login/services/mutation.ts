import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { authLogin, logout } from './apis'
import { setAuthTokenAction } from './setCookie'
import { toast } from 'sonner'
export const useAuthLogin = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: authLogin,
    onSuccess: async (data) => {
      const { auth, message, exp } = data
      await setAuthTokenAction(auth, exp)
      toast(message, {
        id: 'login-success',
        position: 'bottom-center',
        duration: 3000,
        richColors: true,
      })
      router.push('/product', {
        scroll: false,
      })
    },
    onError(error: AxiosError<{ message: string }>) {
      const message = error.response?.data.message

      toast.warning(message || 'Error inesperado', {
        id: 'login-error',
      })
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: logout,
    async onSuccess(data) {
      const { message } = data
      await queryClient.cancelQueries()
      queryClient.clear()
      router.push('/login', {
        scroll: false,
      })
      toast(message, {
        id: 'logout-success',
        position: 'bottom-center',
        duration: 2000,
        richColors: true,
      })
    },
    onError(error: AxiosError) {
      toast(error.message)
    },
  })
}
