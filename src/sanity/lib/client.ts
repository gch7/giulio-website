import { createClient, type QueryParams } from 'next-sanity'
import { projectId, dataset, apiVersion } from '../env'

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true, // Set to false for real-time preview
})

// Client for server-side fetching with optional preview token
export function getClient(previewToken?: string) {
    return createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: !previewToken,
        token: previewToken,
        perspective: previewToken ? 'drafts' : 'published',
        stega: {
            enabled: !!previewToken,
            studioUrl: '/admin',
        },
    })
}


// Utility function for fetching data with error handling
export async function sanityFetch<T>({
    query,
    params = {},
    revalidate = 60,
    tags = [],
    // Set to true when calling from generateStaticParams or generateMetadata
    // where draftMode() is not available
    skipDraftMode = false,
}: {
    query: string
    params?: QueryParams
    revalidate?: number | false
    tags?: string[]
    skipDraftMode?: boolean
}): Promise<T | null> {
    try {
        // Ensure locale is always provided if query uses $locale
        const mergedParams = {
            locale: 'en', // Default locale as fallback
            ...params,
        }
        
        let isEnabled = false

        // Only check draftMode when we're in a request context
        if (!skipDraftMode) {
            try {
                const { draftMode } = await import('next/headers')
                const result = await draftMode()
                isEnabled = result.isEnabled
            } catch {
                // draftMode() called outside request scope - ignore and use published content
                isEnabled = false
            }
        }

        if (isEnabled) {
            const previewClient = createClient({
                projectId,
                dataset,
                apiVersion,
                useCdn: false,
                token: process.env.SANITY_API_READ_TOKEN,
                perspective: 'previewDrafts',
                stega: {
                    enabled: true,
                    studioUrl: '/admin',
                },
            })

            return await previewClient.fetch<T>(query, mergedParams, {
                next: {
                    revalidate: 0,
                    tags,
                },
            })
        }

        return await client.fetch<T>(query, mergedParams, {
            next: {
                revalidate,
                tags,
            },
        })
    } catch (error) {
        console.error('[Sanity] Fetch error:', error)
        // Return null instead of crashing the page
        return null
    }
}

