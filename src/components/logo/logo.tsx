import Link from 'next/link'

const NetworkLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-1">
      <div className="flex items-center">
        <div className="h-8 w-2 bg-blue-300 rounded-sm"></div>
        <div className="h-8 w-2 bg-blue-300 rounded-sm mx-0.5"></div>
        <div className="h-8 w-2 bg-blue-300 rounded-sm"></div>
      </div>
      <span className="text-xl font-bold text-blue-300">Cibernetics Core</span>
    </Link>
  )
}
export default NetworkLogo
