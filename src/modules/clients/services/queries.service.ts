import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getAllClients } from './api.service'

export const useGetAllClients = (page: number, size: number) =>
  useQuery({
    queryKey: ['clients', page, size],
    queryFn: () => getAllClients(page, size),
    gcTime: 3600000, // 1 hora
    staleTime: 3600000, // 1 hora
    placeholderData: keepPreviousData,
  })
