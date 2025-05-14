export interface Client {
  id: string
  dni: string
  phone: string
  stado: string
  details_service: string
  createdAt: string
  updatedAt: string
}

export type GetAllClient = {
  data: Client[]
  status: number
  count: number
}

export type CreateClient = Pick<
  Client,
  'dni' | 'phone' | 'stado' | 'details_service'
>

export type UpdateClient = Partial<CreateClient> & {
  id?: string
}
