import PageProduct from '@/modules/product/pages/page.product'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Product',
}
const Product = () => {
  return (
    <>
      <PageProduct />
    </>
  )
}

export default Product
