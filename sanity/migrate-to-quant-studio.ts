/**
 * Migration script: rebrand from "Consulting" to "Quant Studio".
 *
 * Pushes the updated rebrand seed documents (IT + EN) into the Sanity CMS:
 *   - siteSettings, homepage, solutionsPage, consultingPage, contactPage, membershipsPage
 *
 * Run:
 *   DRY-RUN (default, prints what would change):
 *     SANITY_WRITE_TOKEN=xxx npx tsx sanity/migrate-to-quant-studio.ts
 *   APPLY:
 *     SANITY_WRITE_TOKEN=xxx npx tsx sanity/migrate-to-quant-studio.ts --apply
 *
 * Notes:
 *   - Uses createOrReplace, which overwrites the published document with the
 *     content of the local JSON seed. Any draft revisions in Sanity Studio
 *     for these documents will be preserved (drafts use a different _id).
 *   - The schema document _type stays "consultingPage" (internal name); only
 *     the contents and the URL path change.
 */

import { createClient } from '@sanity/client'

import siteSettingsIt from './seeds/siteSettings-it.json'
import siteSettingsEn from './seeds/siteSettings-en.json'
import homepageIt from './seeds/homepage-it.json'
import homepageEn from './seeds/homepage-en.json'
import solutionsPageIt from './seeds/solutionsPage-it.json'
import solutionsPageEn from './seeds/solutionsPage-en.json'
import consultingPageIt from './seeds/consultingPage-it.json'
import consultingPageEn from './seeds/consultingPage-en.json'
import contactPageIt from './seeds/contactPage-it.json'
import contactPageEn from './seeds/contactPage-en.json'
import membershipsPageIt from './seeds/membershipsPage-it.json'
import membershipsPageEn from './seeds/membershipsPage-en.json'

interface SeedDocument {
    _id: string
    _type: string
    [key: string]: unknown
}

const documents: SeedDocument[] = [
    siteSettingsIt as SeedDocument,
    siteSettingsEn as SeedDocument,
    homepageIt as SeedDocument,
    homepageEn as SeedDocument,
    solutionsPageIt as SeedDocument,
    solutionsPageEn as SeedDocument,
    consultingPageIt as SeedDocument,
    consultingPageEn as SeedDocument,
    contactPageIt as SeedDocument,
    contactPageEn as SeedDocument,
    membershipsPageIt as SeedDocument,
    membershipsPageEn as SeedDocument,
]

const apply = process.argv.includes('--apply')

const token = process.env.SANITY_WRITE_TOKEN
if (apply && !token) {
    console.error('❌ SANITY_WRITE_TOKEN is required to --apply.')
    process.exit(1)
}

const client = createClient({
    projectId: 'rm9kkope',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token,
})

async function migrate() {
    console.log(`\n🚀 Quant Studio rebrand migration — ${apply ? 'APPLY' : 'DRY-RUN'}\n`)
    console.log(`   Documents queued: ${documents.length}`)
    console.log(`   ${'─'.repeat(48)}`)

    let success = 0
    let failed = 0

    for (const doc of documents) {
        if (!apply) {
            console.log(`   [dry-run]  ${doc._type.padEnd(20)} ${doc._id}`)
            success++
            continue
        }
        try {
            await client.createOrReplace(doc)
            console.log(`   ✅ wrote    ${doc._type.padEnd(20)} ${doc._id}`)
            success++
        } catch (err) {
            console.error(`   ❌ failed   ${doc._type.padEnd(20)} ${doc._id}:`, err)
            failed++
        }
    }

    console.log(`   ${'─'.repeat(48)}`)
    console.log(`   ${apply ? 'Written' : 'Would write'}: ${success}, failed: ${failed}\n`)

    if (!apply) {
        console.log('   Re-run with --apply to push the changes to Sanity.\n')
    }
}

migrate()
