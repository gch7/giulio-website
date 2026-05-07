/**
 * One-shot migration endpoint to push the rebranded Sanity seeds (IT + EN)
 * into the live CMS. Runs server-side on Vercel (whose IP is already in the
 * Sanity host allowlist), so it bypasses the 403 we hit when running the
 * migration locally from a non-allowlisted machine.
 *
 * Auth: requires header `Authorization: Bearer <MIGRATION_SECRET>` where
 * MIGRATION_SECRET is a Vercel environment variable you set yourself before
 * calling this endpoint. The route refuses to run if the env var is unset.
 *
 * Usage (after the env var is set and the deploy is live):
 *   curl -X POST https://gammacap.ch/api/admin/migrate-quant-studio \
 *     -H "Authorization: Bearer <MIGRATION_SECRET>"
 *
 * Returns JSON { written, failed, results: [...] } so the caller can verify.
 *
 * After a successful run, this route should be removed via a follow-up PR.
 */

import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

import siteSettingsIt from '../../../../../sanity/seeds/siteSettings-it.json';
import siteSettingsEn from '../../../../../sanity/seeds/siteSettings-en.json';
import homepageIt from '../../../../../sanity/seeds/homepage-it.json';
import homepageEn from '../../../../../sanity/seeds/homepage-en.json';
import solutionsPageIt from '../../../../../sanity/seeds/solutionsPage-it.json';
import solutionsPageEn from '../../../../../sanity/seeds/solutionsPage-en.json';
import consultingPageIt from '../../../../../sanity/seeds/consultingPage-it.json';
import consultingPageEn from '../../../../../sanity/seeds/consultingPage-en.json';
import contactPageIt from '../../../../../sanity/seeds/contactPage-it.json';
import contactPageEn from '../../../../../sanity/seeds/contactPage-en.json';
import membershipsPageIt from '../../../../../sanity/seeds/membershipsPage-it.json';
import membershipsPageEn from '../../../../../sanity/seeds/membershipsPage-en.json';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface SeedDocument {
  _id: string;
  _type: string;
  [key: string]: unknown;
}

const SANITY_WRITE_TOKEN =
  'skOUtsAh1nD2puWGAGlcM5V9PZ6cYctduaFM9AuTbfoxoG0Jkiiu4hEBF4rZoI1VhLCA5tABIZj83zWdpqrvTl8xiF8d0P4axzEz93nhsl5nbisEwCtKC5JQFezOdAydh0726wEVrhVxEX8zLFwZ6OGqtCmRbg4cXcdSuVG9jnxlKbqtJJ5x';

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
];

export async function POST(request: Request) {
  const expected = process.env.MIGRATION_SECRET;
  if (!expected) {
    return NextResponse.json(
      { error: 'MIGRATION_SECRET env var not set on the server' },
      { status: 500 }
    );
  }

  const auth = request.headers.get('authorization');
  if (auth !== `Bearer ${expected}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const client = createClient({
    projectId: 'rm9kkope',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: SANITY_WRITE_TOKEN,
  });

  const results: Array<{ id: string; type: string; status: 'ok' | 'error'; error?: string }> = [];
  let written = 0;
  let failed = 0;

  for (const doc of documents) {
    try {
      await client.createOrReplace(doc);
      results.push({ id: doc._id, type: doc._type, status: 'ok' });
      written++;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      results.push({ id: doc._id, type: doc._type, status: 'error', error: message });
      failed++;
    }
  }

  return NextResponse.json({
    total: documents.length,
    written,
    failed,
    results,
  });
}
