import { createClient } from '@sanity/client'
import membershipsEn from './membershipsPage-en.json'
import membershipsIt from './membershipsPage-it.json'

const client = createClient({
    projectId: 'rm9kkope',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_WRITE_TOKEN,
})

async function seedMemberships() {
    console.log('🚀 Seeding Memebrships Pages...\n')

    await client.createOrReplace(membershipsEn)
    console.log('✅ Created Memberships Page (EN)')

    await client.createOrReplace(membershipsIt)
    console.log('✅ Created Memberships Page (IT)')

    console.log('\n🎉 Memberships Pages seeding complete!')
}

seedMemberships().catch(console.error)
