import { API } from '@/common/path-services'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const axiosAdapter: AxiosInstance = axios.create({
  baseURL: API,
  withCredentials: true,
})

export const methodsAxios = {
  async DELETE<T>(url: string, config?: AxiosRequestConfig) {
    const { data } = await axiosAdapter.delete<T>(url, config)
    return data
  },

  async PATCH<T, D>(url: string, dataPATCH?: D, config?: AxiosRequestConfig) {
    const { data } = await axiosAdapter.patch<T>(url, dataPATCH, config)
    return data
  },

  async GET<T>(url: string, config?: AxiosRequestConfig) {
    const { data } = await axiosAdapter.get<T>(url, config)
    return data
  },

  async POST<T, D>(url: string, dataPOST?: D, config?: AxiosRequestConfig) {
    const { data } = await axiosAdapter.post<T>(url, dataPOST, config)
    return data
  },

  async PUT<T>(url: string, dataPUT?: T, config?: AxiosRequestConfig) {
    const { data } = await axiosAdapter.put<T>(url, dataPUT, config)
    return data
  },
}
