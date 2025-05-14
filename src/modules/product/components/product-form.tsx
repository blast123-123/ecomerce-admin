'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useCreateProduct } from '../services/mutation.service'
import type { ProductFormValues } from '../types/types'
import { formatedFormData } from '../utils/formated-form-data'
import { ImageUpload } from './image-upload'
import { formSchema } from './schemas/schema'
import { LoaderIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function ProductForm() {
  const { mutate: createProduct, isPending: isLoadingCreate } =
    useCreateProduct()
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const router = useRouter()
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      id: '',
      images: [],
      name: '',
      price: 0,
    },
  })
  const disabledBtn = isLoadingCreate
  const onSubmit = (values: ProductFormValues) => {
    const data = formatedFormData(JSON.stringify(values), imageFiles)
    createProduct(data, {
      onSuccess: () => {
        form.reset()
        console.log({
          imageFiles,
        })
        
        setImageFiles([])
        router.refresh()
      },
    })
  }

  return (
    <Card className="border  w-full shadow-sm">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-medium mb-6 text-center">
          Nuevo Producto
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Nombre
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nombre del producto"
                          {...field}
                          className="border-neutral-200 focus-visible:ring-neutral-400"
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-neutral-500">
                        Ingresa un nombre descriptivo para el producto.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Precio
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
                            S/
                          </span>
                          <Input
                            {...field}
                            value={field.value || ''}
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            className="pl-7 border-neutral-200 focus-visible:ring-neutral-400"
                            onChange={(e) =>
                              field.onChange(Number.parseFloat(e.target.value))
                            }
                          />
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs text-neutral-500">
                        Ingresa el precio del producto.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Descripción
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Descripción detallada del producto"
                          className="min-h-[120px] resize-none border-neutral-200 focus-visible:ring-neutral-400"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-neutral-500">
                        Describe las características y beneficios del producto.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="type_camera"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Tipo de Camara
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Descripción detallada del producto"
                          className="min-h-[120px] resize-none border-neutral-200 focus-visible:ring-neutral-400"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-neutral-500">
                        Describe las características y beneficios del producto.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Imágenes
                      </FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value}
                          onChange={(urls, files) => {
                            field.onChange(urls)
                            setImageFiles(files)
                          }}
                          maxFiles={2}
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-neutral-500">
                        Sube hasta 2 imágenes del producto. Arrastra y suelta o
                        haz clic para seleccionar.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button
                type="submit"
                disabled={disabledBtn}
                className="px-8 py-2 bg-neutral-900 w-[300px] hover:bg-neutral-800 text-white"
              >
                {disabledBtn && (
                  <LoaderIcon className="animate-spin mr-2 h-4 w-4" />
                )}
                Crear Producto
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
