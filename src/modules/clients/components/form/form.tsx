'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { LoaderIcon, Save, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  useCreateClient,
  useUpdateClient,
} from '../../services/mutation.service'
import { useClientStoreUpdate } from '../../store/useStoreUpdateClient'
import { CreateClient } from '../../types/client-type'
import { clientFormSchema } from './schema/schema'
import { Textarea } from '@/components/ui/textarea'

export function ClientForm() {
  const { mutate: createClient, isPending: isLoadingCreateClient } =
    useCreateClient()
  const { dataUpdateClient, updateClient: updateClientStore } =
    useClientStoreUpdate()
  const { mutate: updateClient, isPending: isLoadingUpdateClient } =
    useUpdateClient()

  const btnDisabled = isLoadingCreateClient || isLoadingUpdateClient
  const isEditing = !!dataUpdateClient?.id

  const defaultValues: CreateClient = {
    details_service: '',
    dni: '',
    stado: isEditing && dataUpdateClient.stado ? dataUpdateClient.stado : 'Pendiente',
    phone: '',
  }

  const form = useForm<CreateClient>({
    resolver: zodResolver(clientFormSchema),
    defaultValues,
  })

  useEffect(() => {
    if (dataUpdateClient.id) {
      const { details_service, dni, phone, stado } = dataUpdateClient
      form.reset({
        details_service: details_service,
        dni: dni,
        stado: stado,
        phone: phone,
      })
    }
  }, [dataUpdateClient, form])

  const handleSubmit = (data: CreateClient) => {
    if (dataUpdateClient?.id)
      return updateClient(
        { id: dataUpdateClient.id, ...data },
        {
          onSuccess: () => {
            onCancel()
          },
        }
      )

    createClient(data, {
      onSuccess: () => {
        onCancel()
      },
    })
  }

  const onCancel = () => {
    form.reset(defaultValues)
    updateClientStore(defaultValues)
  }

  const stados = [
    {
      id: 'Pendiente',
      name: 'Pendiente',
    },
    {
      id: 'Proceso',
      name: 'Proceso',
    },
    {
      id: 'Finalizado',
      name: 'Finalizado',
    },
  ]

  return (
    <Card className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 pb-4">
        <CardTitle className="text-xl mt-2 font-medium text-slate-800">
          {isEditing ? 'Editar Cliente' : 'Crear Cliente'}
        </CardTitle>
        <CardDescription className="text-slate-500">
          {isEditing
            ? 'Actualiza la información del cliente existente.'
            : 'Completa el formulario para crear un nuevo cliente.'}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-5 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
              <FormField
                control={form.control}
                name="stado"
                render={({ field }) => (
                  <FormItem className="text-start">
                    <FormLabel className="text-slate-700 font-medium">
                      Estado
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-slate-200 focus-visible:ring-slate-400">
                          <SelectValue placeholder="Selecciona un estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {stados.map((stado) => (
                          <SelectItem key={stado.id} value={stado.id}>
                            {stado.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-xs text-slate-500">
                      Determina el estado
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dni"
                render={({ field }) => (
                  <FormItem className="text-start">
                    <FormLabel className="text-slate-700 font-medium">
                      DNI
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="12345678"
                        {...field}
                        className="border-slate-200 focus-visible:ring-slate-400"
                        autoComplete="username"
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-slate-500">
                      Este será el identificador único del cliente
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="text-start">
                    <FormLabel className="text-slate-700 font-medium">
                      Celular
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123456789"
                        {...field}
                        className="border-slate-200 focus-visible:ring-slate-400"
                        autoComplete="given-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="details_service"
                render={({ field }) => (
                  <FormItem className="text-start">
                    <FormLabel className="text-slate-700 font-medium">
                      Detalles del servicio
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detalles del servicio"
                        {...field}
                        className="border-slate-200 h-[100px] focus-visible:ring-slate-400"
                        autoComplete="family-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-3 pt-2 py-2 px-6 bg-slate-50">
            {isEditing && (
              <Button
                variant="outline"
                type="button"
                disabled={btnDisabled}
                onClick={onCancel}
                className="border-slate-200 w-36 cursor-pointer text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="mr-2 h-4 w-4" />
                Cancelar
              </Button>
            )}
            <Button
              disabled={btnDisabled}
              className="bg-blue-500 w-36 cursor-pointer hover:bg-slate-900 text-white"
              type="submit"
            >
              <Save className="mr-2 cursor-pointer h-4 w-4" />
              {isEditing ? 'Actualizar' : 'Crear'}
              {(isLoadingCreateClient || isLoadingUpdateClient) && (
                <LoaderIcon className="ml-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
