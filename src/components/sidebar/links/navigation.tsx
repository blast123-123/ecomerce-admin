import { BookCheck, User } from 'lucide-react'
import type { ReactNode } from 'react'

interface NavigationItem {
  title: string
  icon: ReactNode
  href: string
}

interface NavigationSection {
  title: string
  items: NavigationItem[]
}

export const navigationSections: NavigationSection[] = [
  {
    title: 'Administration',
    items: [
      {
        title: 'Usuarios',
        icon: <User className="h-4 w-4" />,
        href: '/user',
      },
      {
        title: 'Productos',
        icon: <BookCheck className="h-4 w-4" />,
        href: '/product',
      },
      {
        title: 'Clientes',
        icon: <User className="h-4 w-4" />,
        href: '/clients',
      },
    ],
  },
]
