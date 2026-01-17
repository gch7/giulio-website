'use client'

import dynamic from 'next/dynamic'
import { Suspense, useMemo } from 'react'

// Lazy load NextStudio to reduce initial bundle
const NextStudio = dynamic(
    () => import('next-sanity/studio').then((mod) => mod.NextStudio),
    {
        ssr: false,
        loading: () => (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                background: '#1a1a1a',
                color: '#fff'
            }}>
                <div>Loading Sanity Studio...</div>
            </div>
        )
    }
)

// Import shared Sanity config from the sanity directory
// This avoids duplication and speeds up compile time
import { createSanityConfig } from '../../../../sanity/lib/config'

export function Studio() {
    // Memoize config to avoid recreating on every render
    const config = useMemo(() => {
        return createSanityConfig({
            origin: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
        })
    }, [])

    return (
        <Suspense fallback={<div style={{ height: '100vh', background: '#1a1a1a' }} />}>
            <NextStudio config={config} />
        </Suspense>
    )
}
