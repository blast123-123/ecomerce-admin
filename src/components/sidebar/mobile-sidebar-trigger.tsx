"use client"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { Menu } from "lucide-react"

export function MobileSidebarTrigger() {
  const { toggleSidebar } = useSidebar()

  return (
    <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle Menu</span>
    </Button>
  )
}
