import * as z from 'zod'

export const formSchema = z.object({
  username: z.string().min(1, {
    message: 'El usuario es requerido',
  }),
  password: z.string().min(1, {
    message: 'La contraseña es requerida',
  }),
})
