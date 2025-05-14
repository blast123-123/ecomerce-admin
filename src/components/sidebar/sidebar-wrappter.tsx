'use client'

import { Sidebar, SidebarContent, SidebarRail } from '@/components/ui/sidebar'
import { SidebarHeader } from './sidebar-header'
import { SidebarNavigation } from './sidebar-navigation'
import { SidebarFooter } from './sidebar-footer'

export function SidebarWrapper() {
  return (
    <Sidebar className="border-r border-border/40" collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarNavigation />
      </SidebarContent>
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}
