import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Secret to validate webhook requests from Sanity
const REVALIDATE_SECRET = process.env.SANITY_REVALIDATE_SECRET

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { secret, _type } = body

        // Validate secret
        if (secret !== REVALIDATE_SECRET) {
            return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
        }

        // Revalidate based on document type
        if (_type === 'page') {
            revalidateTag('page')
            revalidateTag('homepage')
        } else if (_type === 'siteSettings') {
            revalidateTag('siteSettings')
        }

        // Always revalidate general tags
        revalidateTag('sanity')

        return NextResponse.json({
            revalidated: true,
            now: Date.now(),
            type: _type,
        })
    } catch (error) {
        return NextResponse.json(
            { message: 'Error revalidating', error: String(error) },
            { status: 500 }
        )
    }
}
