'use client'

import { SidebarProvider as ShadcnSidebarProvider } from '@/components/ui/sidebar'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

interface SidebarProviderProps {
  children: ReactNode
  defaultOpen?: boolean
}

export function SidebarProvider({
  children,
  defaultOpen = true,
}: SidebarProviderProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    setIsMounted(true)

    const checkScreenSize = () => setIsDesktop(window.innerWidth >= 1024)

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const initialState = isMounted
    ? isDesktop
      ? defaultOpen
      : false
    : defaultOpen

  return (
    <ShadcnSidebarProvider defaultOpen={initialState}>
      {children}
    </ShadcnSidebarProvider>
  )
}
