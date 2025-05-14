import Link from 'next/link'

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mt-2">Página no encontrada</p>
        <Link
          href="/login"
          className="mt-4 px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          Volver al inicio
        </Link>
      </div>
    </>
  )
}

export default NotFound
