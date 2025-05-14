import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUser, deleteUser, updateUser } from './api.service'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export const useCreateUser = () => {
  const useClient = useQueryClient()
  return useMutation({
    mutationKey: ['create-user'],
    mutationFn: createUser,
    onSuccess: async (newData) => {
      await useClient.invalidateQueries({ queryKey: ['users'] })
      const { message } = newData
      toast(message, {
        id: 'create-user',
        position: 'top-center',
        duration: 3000,
        richColors: true,
        icon: '👏',
        className: 'bg-green-500',
      })
    },
    onError: (error: AxiosError) => {
      const { message } = error.response?.data as { message: string }
      toast(message, {
        id: 'create-user-error',
        position: 'top-center',
        duration: 3000,
        richColors: true,
      })
    },
  })
}

export const useUpdateUser = (id_user_in_system?: boolean) => {
  const useClient = useQueryClient()

  return useMutation({
    mutationKey: ['update-user'],
    mutationFn: updateUser,
    onSuccess: async (newData) => {
      await useClient.invalidateQueries({ queryKey: ['users'] })
      if (id_user_in_system)
        await useClient.invalidateQueries({ queryKey: ['profile'] })

      const { message } = newData
      toast(message, {
        id: 'update-user',
        position: 'top-center',
        duration: 3000,
        richColors: true,
        icon: '👏',
        style: {
          background: '#',
          color: '#fff',
        },
      })
    },
    onError: (error: AxiosError) => {
      const { message } = error.response?.data as { message: string }
      toast(message, {
        id: 'update-user-error',
        position: 'top-center',
        duration: 3000,
        richColors: true,
      })
    },
  })
}
export const useDeleteUser = () => {
  const useClient = useQueryClient()
  return useMutation({
    mutationKey: ['delete-user'],
    mutationFn: deleteUser,
    onSuccess: async (newData) => {
      await useClient.invalidateQueries({ queryKey: ['users'] })
      const { message } = newData
      toast(message, {
        id: 'delete-user',
        position: 'top-center',
        duration: 3000,
        richColors: true,
      })
    },
    onError: (error: AxiosError) => {
      const { message } = error.response?.data as { message: string }
      toast(message, {
        id: 'delete-user-error',
        position: 'top-center',
        duration: 3000,
        richColors: true,
      })
    },
  })
}
