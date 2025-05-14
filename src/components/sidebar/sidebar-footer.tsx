'use client'

import {
  SidebarFooter as ShadcnSidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { LogOut } from 'lucide-react'
import { Button } from '../ui/button'
import { useLogout } from '@/modules/login/services/mutation'

export function SidebarFooter() {
  const { mutate: logout, isPending: isLogoutPending } = useLogout()
  return (
    <ShadcnSidebarFooter className="mt-auto border-t border-border/40 p-2">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="gap-3 px-2" tooltip="Log out">
            <Button
              onClick={() => logout()}
              disabled={isLogoutPending}
              variant={'outline'}
              className="  hover:bg-primary hover:text-white "
            >
              {isLogoutPending ? (
                'Cerrando sesión...'
              ) : (
                <>
                  <LogOut className="h-4 w-4" />
                  <span>Cerrar sesión</span>
                </>
              )}
            </Button>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </ShadcnSidebarFooter>
  )
}
