import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { creatClient, deleteClient, updateClient } from './api.service'

export const useCreateClient = () => {
  const useClient = useQueryClient()
  return useMutation({
    mutationKey: ['create-client'],
    mutationFn: creatClient,
    onSuccess: async (newData) => {
      await useClient.invalidateQueries({ queryKey: ['clients'] })
      const { message } = newData
      toast.success(message, {
        id: 'create-client',
        position: 'top-center',
        duration: 3000,
        richColors: true,
        icon: '👏',
        className: 'bg-green-500',
      })
    },
    onError: (error: AxiosError) => {
      const { message } = error.response?.data as { message: string }
      toast.warning(message || 'Error inesperado', {
        id: 'create-client-error',
        position: 'top-center',
        duration: 3000,
        richColors: true,
      })
    },
  })
}

export const useUpdateClient = () => {
  const useClient = useQueryClient()

  return useMutation({
    mutationKey: ['update-client'],
    mutationFn: updateClient,
    onSuccess: async (newData) => {
      await useClient.invalidateQueries({ queryKey: ['clients'] })

      const { message } = newData
      toast.success(message || 'Error inesperado', {
        id: 'update-client',
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
      toast(message || 'Error inesperado', {
        id: 'update-client-error',
        position: 'top-center',
        duration: 3000,
        richColors: true,
      })
    },
  })
}
export const useDeleteClient = () => {
  const useClient = useQueryClient()
  return useMutation({
    mutationKey: ['delete-client'],
    mutationFn: deleteClient,
    onSuccess: async (newData) => {
      await useClient.invalidateQueries({ queryKey: ['clients'] })
      const { message } = newData
      toast(message || 'Error inesperado', {
        id: 'delete-client',
        position: 'top-center',
        duration: 3000,
        richColors: true,
      })
    },
    onError: (error: AxiosError) => {
      const { message } = error.response?.data as { message: string }
      toast(message || 'Error inesperado', {
        id: 'delete-client-error',
        position: 'top-center',
        duration: 3000,
        richColors: true,
      })
    },
  })
}
