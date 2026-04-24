import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RightNow@MIT',
  description: "MIT dining hall ratings — is it worth walking over tonight?",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 antialiased">{children}</body>
    </html>
  )
}
