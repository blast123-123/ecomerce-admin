'use client'

import {
  Edit,
  Eye,
  ImageIcon,
  Loader2,
  MoreHorizontal,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SkeletonTableGlobal } from '@/components/ui/skeleton.table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

import {
  useDeleteImgProduct,
  useDeleteProduct,
} from '../services/mutation.service'
import {
  useGetAllProducts,
  useGetOneProduct,
} from '../services/queries.service'
import { UpdateProduct } from '../types/types'
import { formatPrice } from '../utils/format-price'
import ProductDetails from './product-details'
import { ProductFormUpdate } from './product-form-edit'
import ProductNewImg from './product-new-img'
import Image from 'next/image'
import { useDebounce } from '../../../hooks/debounse'

export function ProductsTable() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  )
  const [selectProductIdNewImg, setSelectProductIdNewImg] = useState<
    string | null
  >(null)
  const [dataUpdate, setDataUpdate] = useState<UpdateProduct | undefined>()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isViewDialogOpenNewImg, setIsViewDialogOpenNewImg] = useState(false)

  const [page, setPage] = useState<number>(1)
  const limit = 10

  const [search, setSearch] = useState<string>('')
  const debouncedSearch = useDebounce(search, 300)

  const { data: products, isLoading: isLoadingProducts } = useGetAllProducts(
    page,
    limit
  )
  const { data: selectedProduct, isLoading: isLoadingOneProduct } =
    useGetOneProduct(selectedProductId || '')

  const { mutate: deleteProduct, isPending: isLoadingDeleteProduct } =
    useDeleteProduct()
  const { mutate: deleteProductImg, isPending: isLoadingDeleteImg } =
    useDeleteImgProduct()

  const handleEdit = (productId: string) => {
    const productUpdate = products?.data.find(
      (product) => product.id === productId
    )
    setDataUpdate(productUpdate)
    setIsEditDialogOpen(true)
  }

  const handledsetIsViewClose = () => {
    setIsEditDialogOpen(false)
    setSelectedProductId(null)
  }

  const handledsetIsViewOpenNewImg = (id_product: string) => {
    setIsViewDialogOpenNewImg(true)
    setSelectProductIdNewImg(id_product)
  }

  const handledsetIsViewCloseNewImg = () => {
    setIsViewDialogOpenNewImg(false)
    setSelectProductIdNewImg(null)
  }

  const handleView = (productId: string) => {
    setSelectedProductId(productId)
    setIsViewDialogOpen(true)
  }

  const confirmDelete = (productId: string) => deleteProduct(productId)

  const confirmDeleteImg = (id_img: string) =>
    deleteProductImg(id_img, {
      onSuccess: () => {
        setSelectedProductId(null)
        setIsViewDialogOpen(false)
      },
    })

  const disabledBtn = isLoadingProducts

  const filteredProducts = products?.data.filter((product) =>
    product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  )

  const totalPages = products ? Math.ceil(products.count / limit) : 1

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Lista de productos</h2>
        <Input
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        {disabledBtn ? (
          SkeletonTableGlobal({ columns: ['Nombre', 'Descripción', 'Precio'] })
        ) : (
          <Table className="table-fixed w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Imagen</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead className="hidden md:table-cell">
                  Descripción
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Tipo de cámara
                </TableHead>
                <TableHead>Precio</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-10 text-muted-foreground"
                  >
                    No hay productos disponibles
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts?.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      <Image
                        src={product.ProductsImgs[0].url}
                        alt={product.name}
                        width={50}
                        height={10}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                    </TableCell>
                    <TableCell className="font-medium max-w-[150px] truncate whitespace-nowrap">
                      {product.name}
                    </TableCell>
                    <TableCell className="font-medium max-w-[150px] truncate whitespace-nowrap">
                      {product.description}
                    </TableCell>
                    <TableCell className="font-medium max-w-[150px] truncate whitespace-nowrap">
                      {product.type_camera}
                    </TableCell>
                    <TableCell>{formatPrice(product.price)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menú</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            disabled={disabledBtn}
                            onClick={() => handleView(product.id)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            disabled={
                              disabledBtn || product.ProductsImgs.length >= 2
                            }
                            onClick={() =>
                              handledsetIsViewOpenNewImg(product.id)
                            }
                          >
                            <ImageIcon className="mr-2 h-4 w-4" />
                            Nueva Imagen
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            disabled={disabledBtn}
                            onClick={() => handleEdit(product.id)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            disabled={disabledBtn || isLoadingDeleteProduct}
                            onClick={() => confirmDelete(product.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Paginado */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className={page === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
          <PaginationItem>
            <span className="px-4 py-2">
              {page} / {totalPages}
            </span>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              className={
                page === totalPages ? 'pointer-events-none opacity-50' : ''
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Editar Producto</DialogTitle>
            <DialogDescription>
              Actualiza la información del producto seleccionado.
            </DialogDescription>
          </DialogHeader>
          <ProductFormUpdate
            data={dataUpdate as UpdateProduct}
            onClose={handledsetIsViewClose}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={isViewDialogOpenNewImg}
        onOpenChange={setIsViewDialogOpenNewImg}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nueva imagen</DialogTitle>
            <DialogDescription>
              Sube una nueva imagen para el producto
            </DialogDescription>
          </DialogHeader>
          <ProductNewImg
            id={selectProductIdNewImg || ''}
            handleClose={handledsetIsViewCloseNewImg}
          />
        </DialogContent>
      </Dialog>

      <div className="max-w-3xl">
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[825px] max-h-[85vh] overflow-y-auto ">
            <DialogHeader className="flex-col pt-6 pb-2 flex  items-start justify-between">
              <DialogTitle>Detalles del Producto</DialogTitle>
              <DialogDescription>
                Ver detalles del producto seleccionado.
              </DialogDescription>
            </DialogHeader>
            {isLoadingOneProduct || !selectedProduct ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid gap-6">
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <ProductDetails
                      isLoadingDeleteImg={isLoadingDeleteImg}
                      confirmDeleteImg={confirmDeleteImg}
                      data={selectedProduct}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {selectedProduct.data.name}
                    </h3>
                    <p className="text-2xl font-bold mt-2">
                      {formatPrice(selectedProduct.data.price)}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Descripción
                    </h4>
                    <p className="mt-1">{selectedProduct.data.description}</p>

                    <h4 className="text-sm mt-2 font-medium text-muted-foreground">
                      Tipo de camara
                    </h4>
                    <p className="">{selectedProduct.data.type_camera}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
