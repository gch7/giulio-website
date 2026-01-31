import { createClient } from '@sanity/client'

// Import all seed data
import brandSettings from './brandSettings.json'
import uiStrings from './uiStrings.json'
import siteSettingsEn from './siteSettings-en.json'
import siteSettingsIt from './siteSettings-it.json'
import solutionsPageEn from './solutionsPage-en.json'
import solutionsPageIt from './solutionsPage-it.json'
import membershipsPageEn from './membershipsPage-en.json'
import membershipsPageIt from './membershipsPage-it.json'
import consultingPageEn from './consultingPage-en.json'
import consultingPageIt from './consultingPage-it.json'
import contactPageEn from './contactPage-en.json'
import contactPageIt from './contactPage-it.json'

const client = createClient({
    projectId: 'rm9kkope',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_WRITE_TOKEN,
})

interface SeedDocument {
    _id: string
    _type: string
    [key: string]: unknown
}

const documents: SeedDocument[] = [
    brandSettings as SeedDocument,
    uiStrings as SeedDocument,
    siteSettingsEn as SeedDocument,
    siteSettingsIt as SeedDocument,
    solutionsPageEn as SeedDocument,
    solutionsPageIt as SeedDocument,
    membershipsPageEn as SeedDocument,
    membershipsPageIt as SeedDocument,
    consultingPageEn as SeedDocument,
    consultingPageIt as SeedDocument,
    contactPageEn as SeedDocument,
    contactPageIt as SeedDocument,
]

async function seedAll() {
    console.log('🌱 Starting seed process...\n')

    let successCount = 0
    let errorCount = 0

    for (const doc of documents) {
        try {
            const result = await client.createOrReplace(doc)
            console.log(`✅ ${result._type} (${result._id})`)
            successCount++
        } catch (error) {
            console.error(`❌ Failed to seed ${doc._type} (${doc._id}):`, error)
            errorCount++
        }
    }

    console.log('\n' + '='.repeat(50))
    console.log(`🎉 Seeding complete!`)
    console.log(`   ✅ Success: ${successCount}`)
    console.log(`   ❌ Errors: ${errorCount}`)
    console.log('='.repeat(50))
}

seedAll()
