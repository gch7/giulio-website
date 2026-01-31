import { createClient } from '@sanity/client'
import uiStringsData from './uiStrings.json'

const client = createClient({
    projectId: 'rm9kkope',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_WRITE_TOKEN, // You need a write token
})

async function seedUIStrings() {
    try {
        console.log('Seeding UI Strings...')

        const result = await client.createOrReplace(uiStringsData)

        console.log('✅ UI Strings seeded successfully!')
        console.log('Document ID:', result._id)
    } catch (error) {
        console.error('❌ Error seeding UI Strings:', error)
    }
}

seedUIStrings()
