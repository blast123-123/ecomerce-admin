import { ProviderQueryClient } from '@/provider/QueryClient'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import NextTopLoader from 'nextjs-toploader'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader
          color="#10B981"
          initialPosition={0.08}
          crawlSpeed={400}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          zIndex={9999999999999}
          showAtBottom={false}
        />
        <ProviderQueryClient>
          {children}
          <Toaster />
        </ProviderQueryClient>
      </body>
    </html>
  )
}
