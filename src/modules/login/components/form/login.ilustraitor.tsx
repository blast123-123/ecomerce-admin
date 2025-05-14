import Image from 'next/image'

const Portada = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6">
      <Image
        src="/logo.jpg"
        alt="Camera security illustration"
        width={800}
        height={800}
        className="max-w-full h-full rounded-3xl shadow-lg object-cover object-center w-full"
        priority
      />
    </div>
  )
}

export default Portada
