import Image from 'next/image'
import { FindOneProduct } from '../types/types'
import { Loader2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Props = {
  data: FindOneProduct
  isLoadingDeleteImg: boolean
  confirmDeleteImg: (id_img: string) => void
}

const ProductDetails = ({
  data,
  confirmDeleteImg,
  isLoadingDeleteImg,
}: Props) => {
  const { ProductsImgs } = data.data
  return (
    <>
      {ProductsImgs &&
        ProductsImgs.map((image) => (
          <div
            key={image.id}
            className="relative group overflow-hidden rounded-lg"
          >
            <Image
              src={image.url || '/placeholder.svg'}
              alt={data.data.name}
              width={200}
              height={200}
              className="w-full h-auto object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
            />
            <Button
              onClick={() => confirmDeleteImg(image.id)}
              disabled={isLoadingDeleteImg || ProductsImgs.length === 1}
              size="icon"
              variant="destructive"
              className="absolute top-2 right-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {isLoadingDeleteImg ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              <span className="sr-only">Eliminar imagen</span>
            </Button>
          </div>
        ))}
    </>
  )
}

export default ProductDetails
