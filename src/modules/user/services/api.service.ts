import { methodsAxios } from '@/common/adapters/adapters-axios'
import { PROFILE, ROLES, USER } from '@/common/path-services'
import {
  CreateUser,
  GetAllUser,
  Profile,
  Role,
  UpdateUser,
} from '../types/user-type'
import { ApiResponse } from '@/utils/api.response'

export const getAllRoles = async () => await methodsAxios.GET<Role>(`${ROLES}`)

export const getProfile = async () => await methodsAxios.GET<Profile>(PROFILE)

export const createUser = async (data: CreateUser) =>
  await methodsAxios.POST<ApiResponse<CreateUser>, CreateUser>(
    `${USER}/create`,
    data
  )

export const updateUser = async (data: UpdateUser) => {
  delete data.password
  return await methodsAxios.PATCH<ApiResponse<UpdateUser>, UpdateUser>(
    `${USER}/update/${data.id}`,
    data
  )
}

export const deleteUser = async (id: string) =>
  await methodsAxios.DELETE<ApiResponse>(`${USER}/${id}`)

export const getAllUsers = async (page = 1, size = 10) =>
  await methodsAxios.GET<GetAllUser>(`${USER}/list?page=${page}&size=${size}`)
