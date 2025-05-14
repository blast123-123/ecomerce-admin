'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { LoaderIcon } from 'lucide-react'
import { useNewProductImg } from '../services/mutation.service'
import { ImageUpload } from './image-upload'
import { formSchemaNewImg } from './schemas/schema'

const ProductNewImg = ({
  id,
  handleClose,
}: {
  id: string
  handleClose: () => void
}) => {
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const { mutate: newProductImg, isPending: isLoadingNewImg } =
    useNewProductImg()

  const form = useForm<{ images: string[] }>({
    resolver: zodResolver(formSchemaNewImg),
    defaultValues: {
      images: [],
    },
  })

  const onSubmit = () => {
    const formData = new FormData()
    formData.append('image', imageFiles[0])
    newProductImg(
      {
        data: formData,
        id,
      },
      {
        onSuccess: () => {
          form.reset()
          setImageFiles([])
          handleClose()
        },
      }
    )
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Imágenes</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={(urls, files) => {
                      field.onChange(urls)
                      setImageFiles(files)
                    }}
                    maxFiles={1}
                  />
                </FormControl>
                <FormDescription className="text-xs text-neutral-500">
                  Sube 1 imágen del producto. Arrastra y suelta o haz clic para
                  seleccionar.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isLoadingNewImg}
            type="submit"
            className="mt-4 w-full "
          >
            {isLoadingNewImg && <LoaderIcon className="mt-2 animate-spin" />}
            Subir
          </Button>
        </form>
      </Form>
    </>
  )
}

export default ProductNewImg
