'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SkeletonTableGlobal } from '@/components/ui/skeleton.table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useDebounce } from '@/hooks/debounse'
import { cn } from '@/lib/utils'
import {
  BookAIcon,
  ChevronLeft,
  ChevronRight,
  Edit,
  MoreHorizontal,
  Search,
  Trash,
  Users,
} from 'lucide-react'
import { useState } from 'react'
import { useDeleteClient } from '../../services/mutation.service'
import { useGetAllClients } from '../../services/queries.service'
import { useClientStoreUpdate } from '../../store/useStoreUpdateClient'
import { Client } from '../../types/client-type'
import { getEstadoBadgeClass, getEstadoName } from '../common/badge.client'
import { ClientForm } from '../form/form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function TableClient() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [search, setSearch] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false)
  const [dataDetails, setDataDetails] = useState<Client | null>(null)
  const { mutate: deleteClient, isPending: isLoadingDeleteClient } =
    useDeleteClient()
  const { data: clients, isLoading: isLoadingClients } = useGetAllClients(
    currentPage,
    pageSize
  )
  const clientStoreUpdate = useClientStoreUpdate()
  const totalClients = clients?.count || 0
  const totalPages = Math.ceil(totalClients / pageSize)
  const disabledBtn = isLoadingDeleteClient

  const handleEditClient = (client: Client) => {
    const { id, details_service, dni, phone, stado } = client
    clientStoreUpdate.updateClient({
      id,
      details_service,
      dni,
      phone,
      stado,
    })
  }
  const hanledDetailsClient = (client: Client) => {
    setIsDetailsOpen(true)
    setDataDetails(client)
  }

  const handleDeleteClient = (id: string) => deleteClient(id)

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

  const filteredClients = clients?.data.filter((client) =>
    `${client.dni} ${client.phone}`.toLowerCase().includes(deounceSearch)
  )

  return (
    <div className="container mx-auto px-8 py-8">
      <div className="grid grid-cols-1 gap-8">
        <ClientForm />

        <Card className="shadow-sm border-0 rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row py-4  items-center justify-between bg-gradient-to-r from-slate-50 to-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-slate-700" />
              <CardTitle className="text-xl font-medium text-slate-800">
                Clientes
              </CardTitle>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Buscar clientes. DNI-PHONE"
                  className="pl-9 border-slate-200 bg-white focus-visible:ring-slate-400"
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {isLoadingClients ? (
              <div className="p-6">
                <SkeletonTableGlobal
                  columns={['DNI', 'Celular', 'Estado', 'Detalles', 'Acciones']}
                />
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow className="bg-slate-50 hover:bg-slate-50">
                        <TableHead className="text-slate-700 text-center font-medium">
                          DNI
                        </TableHead>
                        <TableHead className="text-slate-700 text-center font-medium">
                          Celular
                        </TableHead>
                        <TableHead className="text-slate-700 text-center font-medium">
                          Estado
                        </TableHead>
                        <TableHead className="text-slate-700 text-center font-medium ">
                          Detalles
                        </TableHead>
                        <TableHead className=" text-slate-700 text-center font-medium">
                          Acciones
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClients?.map((client) => (
                        <TableRow
                          key={client.id}
                          className="hover:bg-slate-50 border-b border-slate-100"
                        >
                          <TableCell className="font-medium text-slate-700 text-center">
                            {client.dni}
                          </TableCell>
                          <TableCell className="text-slate-600 text-center">
                            {client.phone}
                          </TableCell>
                          <TableCell className="text-center">
                            <span
                              className={cn(
                                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                                getEstadoBadgeClass(client.stado)
                              )}
                            >
                              {getEstadoName(client.stado)}
                            </span>
                          </TableCell>
                          <TableCell className="text-slate-600 text-center truncate whitespace-nowrap max-w-[50px]">
                            {client.details_service}
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
                                  onClick={() => hanledDetailsClient(client)}
                                  className="cursor-pointer"
                                >
                                  <BookAIcon className="mr-2 h-4 w-4" />
                                  Detalles
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                  disabled={disabledBtn}
                                  onClick={() => handleEditClient(client)}
                                  className="cursor-pointer"
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Editar
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                  className={`cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50`}
                                  disabled={disabledBtn}
                                  onClick={() => handleDeleteClient(client.id)}
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
                        {Math.min(pageSize, filteredClients?.length || 0)}
                      </span>{' '}
                      de{' '}
                      <span className="font-medium text-slate-700">
                        {filteredClients?.length || 0}
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
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto ">
          <DialogHeader>
            <DialogTitle>Detalles del cliente</DialogTitle>
            <DialogDescription>
              La información del cliente detallada
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold ">DNI</h3>
                <p className="text-slate-500">{dataDetails?.dni}</p>
              </div>
              <div>
                <h4 className="text-sm mt-1 font-semibold">Celular</h4>
                <h4 className=" text-slate-500">{dataDetails?.phone}</h4>
                <p className="text-sm mt-4 font-semibold">Descripción</p>
                <p className="mt-1 text-slate-500">
                  {dataDetails?.details_service}
                </p>

                <h4 className="text-sm  mt-4 font-semibold">
                  Estado del servicio
                </h4>
                <p className=" text-slate-500 ">
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                      getEstadoBadgeClass(dataDetails?.stado || '')
                    )}
                  >
                    {getEstadoName(dataDetails?.stado || '')}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
