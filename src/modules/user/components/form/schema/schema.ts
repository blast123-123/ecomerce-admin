import * as z from 'zod'
export const userFormSchema = z.object({
  username: z.string().min(1, {
    message: 'El nombre de usuario debe tener al menos 1 caracteres.',
  }),
  firstName: z.string().min(1, {
    message: 'El nombre debe tener al menos 1 caracteres.',
  }),
  lastName: z.string().min(1, {
    message: 'El apellido debe tener al menos 1 caracteres.',
  }),
  password: z.string().min(1, {
    message: 'La contraseña debe tener al menos 1 caracteres.',
  }),
  id_role: z.string().min(1, {
    message: 'Por favor selecciona un rol.',
  }),
})
