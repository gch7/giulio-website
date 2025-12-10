import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    const secret = searchParams.get('secret')

    // Validate secret if you want to protect the endpoint
    // For now we just enable draft mode for any request from Sanity Studio
    const previewSecret = process.env.SANITY_PREVIEW_SECRET

    if (previewSecret && secret !== previewSecret) {
        return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    // Enable draft mode
    const draft = await draftMode()
    draft.enable()

    // Redirect to the page being previewed
    if (slug) {
        redirect(slug === '/' ? '/' : `/${slug}`)
    }

    redirect('/')
}
