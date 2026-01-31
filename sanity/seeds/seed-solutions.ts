import { createClient } from '@sanity/client'
import solutionsEn from './solutionsPage-en.json'
import solutionsIt from './solutionsPage-it.json'

const client = createClient({
    projectId: 'rm9kkope',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_WRITE_TOKEN,
})

async function seedSolutions() {
    console.log('💡 Seeding Solutions Pages...\n')

    // Cleanup old drafts or random IDs if necessary (optional here as IDs are fixed)

    await client.createOrReplace(solutionsEn)
    console.log('✅ Created Solutions Page (EN)')

    await client.createOrReplace(solutionsIt)
    console.log('✅ Created Solutions Page (IT)')

    console.log('\n🎉 Solutions Pages seeding complete!')
}

seedSolutions().catch(console.error)
