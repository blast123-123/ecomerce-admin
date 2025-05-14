import { methodsAxios } from '@/common/adapters/adapters-axios'
import { ApiResponse } from '@/utils/api.response'
import { CLIENTS } from '@/common/path-services'
import { CreateClient, GetAllClient, UpdateClient } from '../types/client-type'

export const creatClient = async (data: CreateClient) =>
  await methodsAxios.POST<ApiResponse<CreateClient>, CreateClient>(
    `${CLIENTS}`,
    data
  )

export const updateClient = async (data: UpdateClient) =>
  await methodsAxios.PATCH<ApiResponse<UpdateClient>, UpdateClient>(
    `${CLIENTS}/${data.id}`,
    data
  )

export const deleteClient = async (id: string) =>
  await methodsAxios.DELETE<ApiResponse>(`${CLIENTS}/${id}`)

export const getAllClients = async (page = 1, size = 50) =>
  await methodsAxios.GET<GetAllClient>(`${CLIENTS}?page=${page}&size=${size}`)
