import { Suspense } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProductsTable } from '../components/product-table'
import { ProductForm } from '../components/product-form'

const PageProduct = () => {
  return (
    <>
      <main className="container mx-auto py-10 px-4 space-y-8">
        <h1 className="text-3xl font-bold">Gestión de Productos</h1>

        <Tabs  defaultValue="list" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="list">Lista de Productos</TabsTrigger>
            <TabsTrigger value="form">Crear Producto</TabsTrigger>
          </TabsList>
          <TabsContent value="list" className="pt-4">
            <Suspense fallback={<div>Cargando productos...</div>}>
              <ProductsTable />
            </Suspense>
          </TabsContent>
          <TabsContent value="form" className="pt-4">
            <ProductForm />
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}

export default PageProduct
