import '@/app/globals.css'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'

export const metadata = {
  metadataBase: process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : undefined,
  title: {
    default: '旅先コンシェルジュ 楽曲生成モードβ版',
    template: `%s - 旅先コンシェルジュ 楽曲生成モードβ版`
  },
  description: '旅先のおもいでの音楽を生成',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Toaster position="top-center" />
        <Providers
          attribute="class"
          defaultTheme="white"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col h-screen  scroll-auto">
            <Header />
            <main className="flex flex-col flex-1 ">{children}</main>
          </div>
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  )
}
