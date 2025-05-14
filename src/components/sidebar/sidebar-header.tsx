'use client'

import { SidebarHeader as ShadcnSidebarHeader } from '@/components/ui/sidebar'

export function SidebarHeader() {
  return (
    <ShadcnSidebarHeader className="flex items-center justify-between p-4">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500 text-white">
          C
        </div>
        <span className="font-medium group-data-[collapsible=icon]:hidden">
          Cibernetics Core
        </span>
      </div>
    </ShadcnSidebarHeader>
  )
}
