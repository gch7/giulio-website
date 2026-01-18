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
}: {
    query: string
    params?: QueryParams
    revalidate?: number | false
    tags?: string[]
}): Promise<T | null> {
    try {
        const { draftMode } = await import('next/headers')
        const { isEnabled } = await draftMode()

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

            return await previewClient.fetch<T>(query, params, {
                next: {
                    revalidate: 0,
                    tags,
                },
            })
        }

        return await client.fetch<T>(query, params, {
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

