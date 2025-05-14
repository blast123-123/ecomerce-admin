import { methodsAxios } from '@/common/adapters/adapters-axios'
import { PRODUCT } from '@/common/path-services'
import { FindOneProduct, GetAllProducts, UpdateProduct } from '../types/types'
import { ApiResponse } from '@/utils/api.response'

export const createProduct = async (data: FormData) =>
  await methodsAxios.POST<ApiResponse, FormData>(`${PRODUCT}`, data)

export const updateProduct = async (data: UpdateProduct) =>
  await methodsAxios.PATCH<ApiResponse<UpdateProduct>, UpdateProduct>(
    `${PRODUCT}/update/${data.id}`,
    data
  )

export const getAllProducts = async (page = 1, size = 20) =>
  await methodsAxios.GET<GetAllProducts>(`${PRODUCT}?page=${page}&size=${size}`)

export const getOneProduct = async (id: string) =>
  await methodsAxios.GET<FindOneProduct>(`${PRODUCT}/${id}`)

export const deleteProduct = async (id: string) =>
  await methodsAxios.DELETE<ApiResponse>(`${PRODUCT}/delete/${id}`)

export const deleteProductImg = async (id: string) =>
  await methodsAxios.DELETE<ApiResponse>(`${PRODUCT}/delete-img/${id}`)

export const newProductImg = async (data: FormData, id: string) =>
  await methodsAxios.POST<ApiResponse, FormData>(
    `${PRODUCT}/upload-img/${id}`,
    data
  )
