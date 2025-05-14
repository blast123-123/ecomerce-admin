'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  MoreHorizontal,
  Search,
  Trash,
  Users,
} from 'lucide-react'
import { useGetAllUsers, useGetProfile } from '../../services/queries.service'
import type { User } from '../../types/user-type'
import { getRoleBadgeVariant, getRoleName } from '../common/badge.roles'
import { UserForm } from '../form/form'
import { useDeleteUser } from '../../services/mutation.service'
import { useUserStoreUpdate } from '../../store/useStoreUpdateUser'
import { SkeletonTableGlobal } from '@/components/ui/skeleton.table'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/debounse'

export default function TableUser() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [search, setSearch] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const { data: profile } = useGetProfile()
  const { mutate: deleteUser, isPending: isLoadingDeleteUser } = useDeleteUser()
  const { data: users, isLoading: isLoadingUsers } = useGetAllUsers(
    currentPage,
    pageSize
  )
  const userStoreUpdate = useUserStoreUpdate()
  const totalUsers = users?.count || 0
  const totalPages = Math.ceil(totalUsers / pageSize)
  const disabledBtn = isLoadingDeleteUser

  const handleEditUser = (user: User) => {
    const { id, lastName, firstName, role, username } = user
    userStoreUpdate.updateUser({
      id,
      username,
      firstName,
      lastName,
      id_role: role.id,
    })
  }

  const handleDeleteUser = (id: string) => deleteUser(id)

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1)
  }

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value))
    setCurrentPage(1)
  }
  const deounceSearch = useDebounce(search, 1000)
  const handleSearch = (value: string) => setSearch(value.toLowerCase())

  const filteredUsers = users?.data.filter((user) =>
    `${user.username} ${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(deounceSearch)
  )

  return (
    <div className="container mx-auto px-8 py-8">
      <div className="grid grid-cols-1 gap-8">
        <UserForm />

        <Card className="shadow-sm border-0 rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row py-4  items-center justify-between bg-gradient-to-r from-slate-50 to-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-slate-700" />
              <CardTitle className="text-xl font-medium text-slate-800">
                Usuarios
              </CardTitle>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Buscar usuario..."
                  className="pl-9 border-slate-200 bg-white focus-visible:ring-slate-400"
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {isLoadingUsers ? (
              <div className="p-6">
                <SkeletonTableGlobal
                  columns={['Usuario', 'Nombre', 'Apellido', 'Rol', 'Acciones']}
                />
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow className="bg-slate-50 hover:bg-slate-50">
                        <TableHead className="text-slate-700 text-center font-medium">
                          Usuario
                        </TableHead>
                        <TableHead className="text-slate-700 text-center font-medium">
                          Nombre
                        </TableHead>
                        <TableHead className="text-slate-700 text-center font-medium">
                          Apellido
                        </TableHead>
                        <TableHead className="text-slate-700 text-center font-medium">
                          Rol
                        </TableHead>
                        <TableHead className=" text-slate-700 text-center font-medium">
                          Acciones
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers?.map((user) => (
                        <TableRow
                          key={user.id}
                          className="hover:bg-slate-50 border-b border-slate-100"
                        >
                          <TableCell className="font-medium text-slate-700 text-center">
                            {user.username}
                          </TableCell>
                          <TableCell className="text-slate-600 text-center">
                            {user.firstName}
                          </TableCell>
                          <TableCell className="text-slate-600 text-center">
                            {user.lastName}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge
                              variant={getRoleBadgeVariant(user.role.name)}
                              className="text-xs px-2.5 py-0.5 font-medium"
                            >
                              {getRoleName(user.role.name)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem
                                  disabled={disabledBtn}
                                  onClick={() => handleEditUser(user)}
                                  className="cursor-pointer"
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className={`${
                                    profile?.id === user.id && 'hidden'
                                  } cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50`}
                                  disabled={disabledBtn}
                                  onClick={() => handleDeleteUser(user.id)}
                                >
                                  <Trash className="mr-2 h-4 w-4" />
                                  Eliminar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-t border-slate-100 bg-slate-50">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-slate-500">
                      Mostrando{' '}
                      <span className="font-medium text-slate-700">
                        {Math.min(pageSize, filteredUsers?.length || 0)}
                      </span>{' '}
                      de{' '}
                      <span className="font-medium text-slate-700">
                        {filteredUsers?.length || 0}
                      </span>{' '}
                      usuarios
                    </p>

                    <div className="flex items-center ml-4">
                      <span className="text-sm text-slate-500 mr-2">
                        Mostrar:
                      </span>
                      <Select
                        onValueChange={handlePageSizeChange}
                        value={String(pageSize)}
                      >
                        <SelectTrigger className="w-[70px] h-8 border-slate-200 focus:ring-slate-400">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="20">20</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 border-slate-200"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Página anterior</span>
                    </Button>

                    <span className="text-sm text-slate-600 min-w-[100px] text-center">
                      Página {currentPage} de {totalPages || 1}
                    </span>

                    <Button
                      onClick={handleNextPage}
                      disabled={currentPage >= totalPages}
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 border-slate-200"
                    >
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">Página siguiente</span>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
