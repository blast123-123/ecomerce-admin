import { User } from 'lucide-react'
import TableClient from '../components/table/table'

const PageClient = () => {
  return (
    <>
      <div className="h-16 flex items-center  px-4 ">
        <h1 className="text-2xl text-gray-800  flex gap-2 items-center px-4 w-full justify-center font-medium">
          Lista de Clientes
          <User />
        </h1>
      </div>
      <TableClient />
    </>
  )
}

export default PageClient
