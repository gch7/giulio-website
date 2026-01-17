import { ReactNode } from 'react'
import type { Metadata, Viewport } from 'next'

// Use metadata from next-sanity for Sanity Studio
export { metadata, viewport } from 'next-sanity/studio'

// Prevent any parent layout styles from affecting the admin
export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div style={{ 
      height: '100vh', 
      width: '100vw',
      overflow: 'hidden',
      isolation: 'isolate' // Create stacking context to isolate admin from parent styles
    }}>
      {children}
    </div>
  )
}
