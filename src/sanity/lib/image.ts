import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
    return builder.image(source)
}

// Helper to get a full URL for an image with optional dimensions
export function getImageUrl(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    source: any,
    options?: {
        width?: number
        height?: number
        quality?: number
    }
) {
    if (!source) return null

    let imageBuilder = builder.image(source)

    if (options?.width) {
        imageBuilder = imageBuilder.width(options.width)
    }
    if (options?.height) {
        imageBuilder = imageBuilder.height(options.height)
    }
    if (options?.quality) {
        imageBuilder = imageBuilder.quality(options.quality)
    }

    return imageBuilder.auto('format').url()
}
