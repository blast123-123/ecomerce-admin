import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createProduct,
  deleteProduct,
  deleteProductImg,
  newProductImg,
  updateProduct,
} from './api.service'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { UpdateProduct } from '../types/types'

export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['create-product'],
    mutationFn: (data: FormData) => createProduct(data),
    onSuccess: async (newData) => {
      const { message: description } = newData
      await queryClient.invalidateQueries({ queryKey: ['products'] })
      toast(description, {
        id: 'create-product',
        position: 'top-center',
        duration: 3000,
        richColors: true,
        icon: '👏',
      })
    },
    onError: (error: AxiosError) => {
      const { message: description } = error.response?.data as {
        message: string
      }
      toast(description, {
        id: 'create-product-error',
        position: 'top-center',
        duration: 3000,
        richColors: true,
        icon: '👏',
      })
    },
  })
}
export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['delete-product'],
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: async (newData) => {
      const { message: description } = newData
      await queryClient.invalidateQueries({ queryKey: ['products'] })
      toast(description, {
        id: 'delete-product',
        position: 'top-center',
        duration: 3000,
        richColors: true,
        icon: '👏',
      })
    },
    onError: (error: AxiosError) => {
      const { message: description } = error.response?.data as {
        message: string
      }
      toast(description, {
        id: 'delete-product-error',
        position: 'top-center',
        duration: 3000,
        richColors: true,
        icon: '👏',
      })
    },
  })
}
export const useDeleteImgProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['delete-product-img'],
    mutationFn: (id: string) => deleteProductImg(id),
    onSuccess: async (newData) => {
      const { message: description } = newData
      await queryClient.invalidateQueries({ queryKey: ['products'] })
      toast(description, {
        id: 'delete-product-img',
        position: 'top-center',
        duration: 3000,
        richColors: true,
        icon: '👏',
      })
    },
    onError: (error: AxiosError) => {
      const { message: description } = error.response?.data as {
        message: string
      }
      toast(description, {
        id: 'delete-product-error-img',
        position: 'top-center',
        duration: 3000,
        richColors: true,
        icon: '👏',
      })
    },
  })
}
export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['update-product'],
    mutationFn: (data: UpdateProduct) => updateProduct(data),
    onSuccess: async (newData) => {
      const { message: description } = newData
      await queryClient.invalidateQueries({ queryKey: ['products'] })
      toast(description, {
        id: 'update-product',
        position: 'top-center',
        duration: 3000,
        richColors: true,
        icon: '👏',
      })
    },
    onError: (error: AxiosError) => {
      const { message: description } = error.response?.data as {
        message: string
      }

      toast(description || 'Error', {
        id: 'update-product-error',
        position: 'top-center',
        duration: 3000,
        richColors: true,
        icon: '👏',
      })
    },
  })
}
export const useNewProductImg = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['update-product-new-img'],
    mutationFn: ({ data, id }: { data: FormData; id: string }) =>
      newProductImg(data, id),
    onSuccess: async (newData) => {
      const { message: description } = newData
      await queryClient.invalidateQueries({ queryKey: ['products'] })
      toast(description, {
        id: 'update-product-new-img',
        position: 'top-center',
        duration: 3000,
        richColors: true,
        icon: '👏',
      })
    },
    onError: (error: AxiosError) => {
      const { message: description } = error.response?.data as {
        message: string
      }
      toast(description, {
        id: 'update-product-error-new-img',
        position: 'top-center',
        duration: 3000,
        richColors: true,
        icon: '👏',
      })
    },
  })
}
