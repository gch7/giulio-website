import { createClient } from '@sanity/client'
import consultingEn from './consultingPage-en.json'
import consultingIt from './consultingPage-it.json'

const client = createClient({
    projectId: 'rm9kkope',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_WRITE_TOKEN,
})

async function seedConsulting() {
    console.log('Briefcase Seeding Consulting Pages...\n')

    await client.createOrReplace(consultingEn)
    console.log('✅ Created Consulting Page (EN)')

    await client.createOrReplace(consultingIt)
    console.log('✅ Created Consulting Page (IT)')

    console.log('\n🎉 Consulting Pages seeding complete!')
}

seedConsulting().catch(console.error)
