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
import { useCreateUser, useUpdateUser } from '../../services/mutation.service'
import { useGetAllRoles, useGetProfile } from '../../services/queries.service'
import { useUserStoreUpdate } from '../../store/useStoreUpdateUser'
import type { CreateUser } from '../../types/user-type'
import { userFormSchema } from './schema/schema'

export function UserForm() {
  const { mutate: createUser, isPending: isLoadingCreateUser } = useCreateUser()
  const { dataUpdateUser, updateUser: updateUserStore } = useUserStoreUpdate()
  const { data: profile } = useGetProfile()
  const { mutate: updateUser, isPending: isLoadingUpdateUser } = useUpdateUser(
    profile?.id === dataUpdateUser.id
  )
  const { data: roles } = useGetAllRoles()

  const btnDisabled = isLoadingCreateUser || isLoadingUpdateUser
  const isEditing = !!dataUpdateUser?.id

  const defaultValues: CreateUser = {
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    id_role: '',
  }

  const form = useForm<CreateUser>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
  })

  useEffect(() => {
    if (dataUpdateUser.id) {
      form.reset({
        username: dataUpdateUser.username,
        firstName: dataUpdateUser.firstName,
        password: 'blanco',
        lastName: dataUpdateUser.lastName,
        id_role: dataUpdateUser.id_role,
      })
    }
  }, [dataUpdateUser, form])

  const handleSubmit = (data: CreateUser) => {
    if (dataUpdateUser?.id)
      return updateUser(
        { id: dataUpdateUser.id, ...data },
        {
          onSuccess: () => {
            onCancel()
          },
        }
      )

    createUser(data, {
      onSuccess: () => {
        onCancel()
      },
    })
  }

  const onCancel = () => {
    form.reset(defaultValues)
    updateUserStore(defaultValues)
  }

  return (
    <Card className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 pb-4">
        <CardTitle className="text-xl mt-2 font-medium text-slate-800">
          {isEditing ? 'Editar Usuario' : 'Crear Usuario'}
        </CardTitle>
        <CardDescription className="text-slate-500">
          {isEditing
            ? 'Actualiza la información del usuario existente.'
            : 'Completa el formulario para crear un nuevo usuario.'}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-5 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="text-start">
                    <FormLabel className="text-slate-700 font-medium">
                      Nombre de usuario
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="usuario123"
                        {...field}
                        className="border-slate-200 focus-visible:ring-slate-400"
                        autoComplete='username'
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-slate-500">
                      Este será el identificador único del usuario.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="id_role"
                render={({ field }) => (
                  <FormItem className="text-start">
                    <FormLabel className="text-slate-700 font-medium">
                      Rol
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-slate-200 focus-visible:ring-slate-400">
                          <SelectValue placeholder="Selecciona un rol" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles?.data.map((role) => (
                          <SelectItem key={role.id} value={role.id}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-xs text-slate-500">
                      El rol determina los permisos del usuario.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="text-start">
                    <FormLabel className="text-slate-700 font-medium">
                      Nombre
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Juan"
                        {...field}
                        className="border-slate-200 focus-visible:ring-slate-400"
                        autoComplete='given-name'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="text-start">
                    <FormLabel className="text-slate-700 font-medium">
                      Apellido
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Pérez"
                        {...field}
                        className="border-slate-200 focus-visible:ring-slate-400"
                        autoComplete='family-name'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {!isEditing && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="text-start">
                    <FormLabel className="text-slate-700 font-medium">
                      Contraseña
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="******"
                        {...field}
                        className="border-slate-200 focus-visible:ring-slate-400"
                        autoComplete='new-password'
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-slate-500">
                      La contraseña debe tener al menos 1 caracteres.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
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
              {(isLoadingCreateUser || isLoadingUpdateUser) && (
                <LoaderIcon className="ml-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
