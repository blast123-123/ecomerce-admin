import { User } from 'lucide-react'
import TableUser from '../components/table/table'

const PageUser = () => {
  return (
    <>
      <div className="h-16 flex items-center  px-4 ">
        <h1 className="text-2xl text-gray-800  flex gap-2 items-center px-4 w-full justify-center font-medium">
          Lista de Usuarios
          <User />
        </h1>
      </div>
      <TableUser />
    </>
  )
}

export default PageUser
