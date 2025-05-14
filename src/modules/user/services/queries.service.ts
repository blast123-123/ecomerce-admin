import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getAllRoles, getAllUsers, getProfile } from './api.service'

export const useGetProfile = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(),
    gcTime: 86400000, // 24 horas
    staleTime: 86400000, // 24 horas
  })

export const useGetAllRoles = () =>
  useQuery({
    queryKey: ['roles'],
    queryFn: () => getAllRoles(),
    gcTime: 86400000, // 24 horas
    staleTime: 86400000, // 24 horas
  })

export const useGetAllUsers = (page: number, size: number) =>
  useQuery({
    queryKey: ['users', page, size],
    queryFn: () => getAllUsers(page, size),
    gcTime: 3600000, // 1 hora
    staleTime: 3600000, // 1 hora
    placeholderData: keepPreviousData,
  })
