'use client'
import Profile from '@/components/profile'
import { SidebarWrapper } from '@/components/sidebar/sidebar-wrappter'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { FC, PropsWithChildren } from 'react'

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <SidebarWrapper />
        <SidebarInset className="flex-1">
          <header className="flex w-full h-16 items-center border-b px-4">
            <div className="flex items-center justify-between w-full">
              <SidebarTrigger />
              <div className="flex items-center gap-2">
                <Profile />
              </div>
            </div>
          </header>
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
