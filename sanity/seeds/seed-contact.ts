import { createClient } from '@sanity/client'
import contactEn from './contactPage-en.json'
import contactIt from './contactPage-it.json'

const client = createClient({
    projectId: 'rm9kkope',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_WRITE_TOKEN,
})

async function seedContact() {
    console.log('✉️ Seeding Contact Pages...\n')

    await client.createOrReplace(contactEn)
    console.log('✅ Created Contact Page (EN)')

    await client.createOrReplace(contactIt)
    console.log('✅ Created Contact Page (IT)')

    console.log('\n🎉 Contact Pages seeding complete!')
}

seedContact().catch(console.error)
