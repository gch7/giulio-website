import { createClient } from '@sanity/client'
import homepageEn from './homepage-en.json'
import homepageIt from './homepage-it.json'

const client = createClient({
    projectId: 'rm9kkope',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_WRITE_TOKEN,
})

async function seedHomepages() {
    console.log('🏠 Seeding Homepages...\n')

    // Clean old homepage documents with random IDs
    const oldHomepages = await client.fetch(`*[_type == "page" && isHomepage == true && !(_id in ["homepage-en", "homepage-it"])] { _id }`)
    if (oldHomepages.length > 0) {
        console.log(`🧹 Deleting ${oldHomepages.length} old homepage documents...`)
        const tx = client.transaction()
        oldHomepages.forEach((doc: { _id: string }) => tx.delete(doc._id))
        await tx.commit()
    }

    // Create/Replace new homepages
    await client.createOrReplace(homepageEn)
    console.log('✅ Created Homepage (EN)')

    await client.createOrReplace(homepageIt)
    console.log('✅ Created Homepage (IT)')

    console.log('\n🎉 Homepage seeding complete!')
}

seedHomepages().catch(console.error)
