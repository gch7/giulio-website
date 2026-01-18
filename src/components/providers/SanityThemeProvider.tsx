'use client'

import { ThemeProvider, studioTheme } from '@sanity/ui'
import { ReactNode } from 'react'

export function SanityThemeProvider({ children }: { children: ReactNode }) {
    // studioTheme is the default theme used in Sanity Studio, ensuring compatibility with Visual Editing components
    return (
        <ThemeProvider theme={studioTheme}>
            {children}
        </ThemeProvider>
    )
}
