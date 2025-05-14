import { z } from 'zod'

export const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres.',
  }),
  description: z
    .string()
    .min(1, {
      message: 'La descripción debe tener al menos 10 caracteres.',
    })
    .optional(),
  type_camera: z.string().min(1, {
    message: 'La descripción debe tener al menos 1 caracteres.',
  }),
  price: z.coerce.number().positive({
    message: 'El precio debe ser un número positivo.',
  }),
  images: z
    .array(z.string())
    .min(1, {
      message: 'Debes subir al menos una imagen.',
    })
    .max(2, {
      message: 'No puedes subir más de 2 imágenes.',
    }),
})
export const formSchemaNewImg = z.object({
  images: z
    .array(z.string())
    .min(1, {
      message: 'Debes subir al menos una imagen.',
    })
    .max(1, {
      message: 'No puedes subir más de 2 imágenes.',
    }),
})

export const formSchemaUpdate = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres.',
  }),
  description: z
    .string()
    .min(1, {
      message: 'La descripción debe tener al menos 10 caracteres.',
    })
    .optional(),
  type_camera: z
    .string()
    .min(1, {
      message: 'La descripción debe tener al menos 10 caracteres.',
    })
    .optional(),
  price: z.coerce.number().positive({
    message: 'El precio debe ser un número positivo.',
  }),
})
