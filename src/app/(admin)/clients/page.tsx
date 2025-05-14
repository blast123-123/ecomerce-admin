import PageClient from '@/modules/clients/pages/page-client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Clients',
}
const Clients = () => {
  return (
    <>
      <PageClient />
    </>
  )
}

export default Clients
