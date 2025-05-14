'use client'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

import { usePathname } from 'next/navigation'
import { navigationSections } from './links/navigation'
import Link from 'next/link'

export function SidebarNavigation() {
  const pathname = usePathname()

  return (
    <>
      {navigationSections.map((section) => (
        <SidebarGroup key={section.title} className="py-2">
          <SidebarGroupLabel className="px-2 text-xs font-normal text-muted-foreground">
            {section.title}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {section.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        'gap-3 px-2',
                        isActive &&
                          'bg-blue-400 text-white hover:bg-blue-400 hover:text-white '
                      )}
                      tooltip={item.title}
                    >
                      <Link href={item.href} className="flex items-center">
                        <div
                          className={cn(
                            'flex items-center justify-center',
                            isActive && 'text-white'
                          )}
                        >
                          {item.icon}
                        </div>
                        <span className="ml-3">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  )
}
