import { z } from 'zod'
import { formSchema } from '../components/form/schema/schema'
import { ApiResponse } from '@/utils/api.response'

export type Login = z.infer<typeof formSchema>
export type ResponseLogin = Pick<
  ApiResponse<never>,
  'statusCode' | 'message'
> & {
  auth: string
  exp: number
}
