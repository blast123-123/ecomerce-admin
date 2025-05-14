import PageUser from '@/modules/user/pages/page-user'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Usuario',
}

const User = () => {
  return (
    <>
      <PageUser />
    </>
  )
}

export default User
