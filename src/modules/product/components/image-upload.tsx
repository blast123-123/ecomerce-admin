'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { X, Upload, ImageIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ImageUploadProps {
  value: string[]
  onChange: (value: string[], files: File[]) => void
  maxFiles?: number
}

export function ImageUpload({
  value = [],
  onChange,
  maxFiles = 2,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  useEffect(() => {
    if (value.length === 0 && files.length > 0) {
      setFiles([])
    }
  }, [value, files])

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (value.length + acceptedFiles.length > maxFiles) return

      setIsUploading(true)

      try {
        const newImageUrls = acceptedFiles.map((file) =>
          URL.createObjectURL(file)
        )

        const newFiles = [...files, ...acceptedFiles]
        setFiles(newFiles)
        onChange([...value, ...newImageUrls], newFiles)
      } catch (error) {
        console.error('Error al procesar imágenes:', error)
      } finally {
        setIsUploading(false)
      }
    },
    [value, onChange, maxFiles, files]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.avif'],
    },
    maxFiles: maxFiles - value.length,
    disabled: isUploading || value.length >= maxFiles,
  })

  const removeImage = (index: number) => {
    const newImages = [...value]
    newImages.splice(index, 1)

    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)

    onChange(newImages, newFiles)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 max-lg:grid-cols-2 gap-4">
        {value.map((url, index) => (
          <div
            key={index}
            className="max-w-sm rounded-md aspect-square relative border"
          >
            <div className="absolute top-2 right-2 z-10">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="h-7 w-7 rounded-full"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              src={url || '/placeholder.svg'}
              alt={`Imagen ${index + 1}`}
              className="object-cover w"
            />
          </div>
        ))}

        {value.length < maxFiles && (
          <div
            {...getRootProps()}
            className={cn(
              'border-2 border-dashed max-w-sm rounded-md aspect-square flex flex-col items-center justify-center cursor-pointer transition-colors',
              isDragActive
                ? 'border-primary bg-primary/10'
                : 'border-muted-foreground/20 hover:border-primary/50',
              isUploading && 'opacity-50 cursor-not-allowed'
            )}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col h-[20vh] items-center justify-center text-center p-4 space-y-2">
              {isUploading ? (
                <div className="animate-pulse">Subiendo...</div>
              ) : (
                <>
                  <div className="p-2 bg-muted rounded-full">
                    {isDragActive ? (
                      <Upload className="h-6 w-6 text-primary" />
                    ) : (
                      <ImageIcon className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {isDragActive ? (
                      <p>Suelta la imagen aquí</p>
                    ) : (
                      <p>Arrastra y suelta o haz clic para seleccionar</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {value.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {value.length} de {maxFiles} imágenes
        </p>
      )}
    </div>
  )
}
