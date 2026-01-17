import { Studio } from './Studio'

// Force dynamic rendering to ensure fresh Studio data
export const dynamic = 'force-dynamic'

// Disable static optimization for admin routes
export const revalidate = 0

export default function StudioPage() {
    return <Studio />
}
