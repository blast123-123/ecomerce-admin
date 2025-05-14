import * as z from 'zod'
export const clientFormSchema = z.object({
  dni: z
    .string()
    .min(8, {
      message: 'El dni debe 8 caracteres.',
    })
    .max(8, {
      message: 'El dni no puede tener mas de 8 caracteres',
    }),
  phone: z
    .string()
    .min(9, {
      message: 'El telefono debe tener 9 caracteres.',
    })
    .max(9, {
      message: 'El telefono debe tener de 9 caracteres',
    }),

  details_service: z.string().min(5, {
    message: 'el detalle debe tener al menos 5 caracteres.',
  }),

  stado: z.string().min(1, {
    message: 'Por favor selecciona un estado.',
  }),
})
