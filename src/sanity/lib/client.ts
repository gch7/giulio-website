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
            studioUrl: '/studio',
        },
    })
}

// Utility function for fetching data
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
}): Promise<T> {
    return client.fetch<T>(query, params, {
        next: {
            revalidate,
            tags,
        },
    })
}
