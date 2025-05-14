export interface User {
  id: string
  username: string
  firstName: string
  lastName: string
  createdAt: string
  updatedAt: string
  password: string
  role: {
    id: string
    name: string
    createdAt: string
    updatedAt: string
  }
}

export type GetAllUser = {
  data: User[]
  status: number
  count: number
}

export type Profile = User

export type CreateUser = Pick<
  User,
  'username' | 'firstName' | 'lastName' | 'password'
> & {
  id_role: string
}

export type UpdateUser = Partial<CreateUser> & {
  id?: string
}

export type Role = {
  data: {
    id: string
    name: string
    createdAt: string
    updatedAt: string
  }[]
  status: number
  count: number
}
