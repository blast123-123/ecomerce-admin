import { z } from 'zod'
import { formSchema, formSchemaUpdate } from '../components/schemas/schema'

export type ProductFormValues = z.infer<typeof formSchema>

export interface ProductFormProps {
  product?: ProductFormValues
}
export type CreateProduct = ProductFormValues

export interface GetAllProducts {
  message: string
  status: number
  count: number
  data: {
    id: string
    name: string
    description: string
    type_camera: string
    price: number
    ProductsImgs: {
      id: string
      key_url_unique: string
      url: string
    }[]
  }[]
}

export interface FindOneProduct {
  data: {
    id: string
    name: string
    description: string
    price: number
    type_camera: string
    ProductsImgs: {
      id: string
      key_url_unique: string
      url: string
    }[]
  }
  status: number
  count: number
}
export type UpdateProduct = z.infer<typeof formSchemaUpdate>