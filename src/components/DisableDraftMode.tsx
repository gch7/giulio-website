'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useUIStrings } from '@/components/providers/ui-strings-provider'

export function DisableDraftMode() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const uiStrings = useUIStrings()
    const exitLabel = uiStrings?.draftModeExitText ?? 'Exit Preview'

    const handleDisable = () => {
        startTransition(() => {
            router.push('/api/disable-draft')
        })
    }

    return (
        <button
            onClick={handleDisable}
            disabled={isPending}
            className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all hover:bg-blue-700 disabled:opacity-50"
        >
            {isPending ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            )}
            {exitLabel}
        </button>
    )
}
