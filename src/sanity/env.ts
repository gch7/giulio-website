export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rm9kkope'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// Ensure projectId is valid
if (!projectId) {
    throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable')
}
