import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getAllProducts, getOneProduct } from './api.service'

export const useGetAllProducts = (page: number, size: number) =>
  useQuery({
    queryKey: ['products', page, size],
    queryFn: () => getAllProducts(page, size),
    gcTime: 1800000, // 30 minutos en milisegundos
    staleTime: 1800000, // 30 minutos en milisegundos
    placeholderData: keepPreviousData,
  })

export const useGetOneProduct = (id: string) =>
  useQuery({
    queryKey: ['products', id],
    queryFn: () => getOneProduct(id),
    gcTime: 1800000, // 30 minutos en milisegundos
    staleTime: 1800000, // 30 minutos en milisegundos
    placeholderData: keepPreviousData,
    enabled: !!id,
  })
