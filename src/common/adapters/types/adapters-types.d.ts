import { AxiosRequestConfig } from 'axios'

export interface MethodsAxiosInterface {
  GET: (url: string, config?: AxiosRequestConfig) => Promise<T>
  POST: (url: string, data?: T, config?: AxiosRequestConfig) => Promise<T>
  PATCH: (url: string, data?: T, config?: AxiosRequestConfig) => Promise<T>
  PUT: (url: string, data?: T, config?: AxiosRequestConfig) => Promise<T>
  DELETE: (url: string, config?: AxiosRequestConfig) => Promise<T>
}
