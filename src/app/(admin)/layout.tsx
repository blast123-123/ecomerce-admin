import { AppLayout } from '@/layout/app-layout'
import { FC, PropsWithChildren } from 'react'

const LayoutAdmin: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppLayout>{children}</AppLayout>
    </>
  )
}

export default LayoutAdmin
