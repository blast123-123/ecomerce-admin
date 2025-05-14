'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, Mail, User } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Login } from '../../types/login.type'
import { formSchema } from './schema/schema'
import { useAuthLogin } from '../../services/mutation'

const LoginForm = () => {
  const { mutate: login, isPending: isPendingLogin } = useAuthLogin()
  const form = useForm<Login>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = (values: Login) =>
    login(values, {
      onSuccess: () => {
        form.reset()
      },
    })

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-col">
        <h1 className="text-xl font-medium mb-8">
          Bienvenido a Cibernetics Core.{' '}
          <p className="text-sm text-gray-600 mt-2">
            Inicia sesión en tu cuenta
          </p>
        </h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex-1"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <div className="flex">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Username"
                      className="rounded-r-none "
                      autoComplete="username"
                    />
                  </FormControl>
                  <Button
                    type="button"
                    size="icon"
                    className="rounded-l-none bg-blue-200 hover:bg-blue-600"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="flex">
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Ingresa tu contraseña"
                      autoComplete="current-password"
                      className="rounded-r-none"
                    />
                  </FormControl>
                  <Button
                    type="button"
                    size="icon"
                    className="rounded-l-none bg-blue-200 hover:bg-blue-600"
                  >
                    <Lock className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex justify-end mt-1">
                  {/* <Link
                    href="/forgot-password"
                    className="text-sm text-gray-500 hover:text-blue-400"
                  >
                    Forgot password?
                  </Link> */}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600"
            disabled={isPendingLogin}
          >
            {isPendingLogin && (
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></span>
            )}
            Login <User />
          </Button>
          <div className="relative flex items-center justify-center py-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 flex-shrink text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default LoginForm
