import fs from 'node:fs';
import path from 'node:path';
import Stripe from 'stripe';

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, 'utf-8');
  for (const rawLine of content.split('\n')) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    const value = line.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvLocal();

const BLACK_LABEL_PRICE_IDS = [
  'price_1T5ZqgEJRFKN7GwZpBsOrU4O',
  'price_1T5ZsPEJRFKN7GwZk38rvhCE',
  'price_1T5ZucEJRFKN7GwZLPDjT2GF',
];

const args = new Set(process.argv.slice(2));
const isDryRun = args.has('--dry-run');
const verbose = args.has('--verbose');

const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  console.error('Missing STRIPE_SECRET_KEY. Set it in .env.local or in your environment.');
  process.exit(1);
}

const stripe = new Stripe(secretKey, { apiVersion: '2025-12-15.clover' });

function isLiveKey(key: string) {
  return key.startsWith('sk_live_');
}

async function listAllRecurringPrices(): Promise<Stripe.Price[]> {
  const out: Stripe.Price[] = [];
  let startingAfter: string | undefined;
  while (true) {
    const page: Stripe.ApiList<Stripe.Price> = await stripe.prices.list({
      active: true,
      type: 'recurring',
      limit: 100,
      starting_after: startingAfter,
      expand: ['data.product'],
    });
    out.push(...page.data);
    if (!page.has_more || page.data.length === 0) break;
    startingAfter = page.data[page.data.length - 1].id;
  }
  return out;
}

function productIdOf(priceOrProduct: Stripe.Price['product']): string {
  if (typeof priceOrProduct === 'string') return priceOrProduct;
  return priceOrProduct.id;
}

function productNameOf(priceOrProduct: Stripe.Price['product']): string {
  if (typeof priceOrProduct === 'string') return priceOrProduct;
  if ('name' in priceOrProduct && priceOrProduct.name) return priceOrProduct.name;
  return priceOrProduct.id;
}

function formatPrice(price: Stripe.Price): string {
  const amount = price.unit_amount != null ? (price.unit_amount / 100).toFixed(2) : '?';
  const currency = (price.currency || '').toUpperCase();
  const interval = price.recurring
    ? `${price.recurring.interval_count ?? 1}${price.recurring.interval[0]}`
    : 'one-time';
  return `${amount} ${currency} / ${interval}`;
}

async function main() {
  console.log(`Mode:           ${isDryRun ? 'DRY RUN (no changes will be applied)' : 'APPLY'}`);
  console.log(`Stripe key:     ${isLiveKey(secretKey!) ? 'LIVE' : 'TEST'} (${secretKey!.slice(0, 14)}…)\n`);

  const prices = await listAllRecurringPrices();
  if (prices.length === 0) {
    console.error('No active recurring prices found in this Stripe account. Aborting.');
    process.exit(1);
  }

  const productIdToPrices = new Map<string, Stripe.Price[]>();
  for (const price of prices) {
    const pid = productIdOf(price.product);
    if (!productIdToPrices.has(pid)) productIdToPrices.set(pid, []);
    productIdToPrices.get(pid)!.push(price);
  }

  const blackLabelPrices = prices.filter(p => BLACK_LABEL_PRICE_IDS.includes(p.id));
  if (blackLabelPrices.length === 0) {
    console.error(
      'Could not find any of the expected Black Label prices in this Stripe account.\n' +
      `Looked for: ${BLACK_LABEL_PRICE_IDS.join(', ')}\n` +
      'Check that you are using the correct Stripe key (live vs test) and that the prices exist.'
    );
    process.exit(1);
  }
  const blackLabelProductIds = new Set(blackLabelPrices.map(p => productIdOf(p.product)));

  console.log(`Found ${prices.length} recurring price(s) across ${productIdToPrices.size} product(s).`);
  console.log(`Identified ${blackLabelProductIds.size} Black Label product(s) and ${productIdToPrices.size - blackLabelProductIds.size} Premium product(s).\n`);

  const portalProducts: Stripe.BillingPortal.ConfigurationUpdateParams.Features.SubscriptionUpdate.Product[] = [];
  for (const [productId, productPrices] of productIdToPrices) {
    portalProducts.push({
      product: productId,
      prices: productPrices.map(p => p.id),
    });
  }

  console.log('Products that will be available for plan switching in the portal:');
  for (const entry of portalProducts) {
    const tier = blackLabelProductIds.has(entry.product) ? 'Black Label' : 'Premium    ';
    const productPrices = productIdToPrices.get(entry.product) ?? [];
    const displayName = productNameOf(productPrices[0]?.product ?? entry.product);
    console.log(`  • [${tier}] ${displayName}  (${entry.product})`);
    if (verbose) {
      for (const price of productPrices) {
        console.log(`        – ${price.id}  ${formatPrice(price)}`);
      }
    }
  }
  if (!verbose) {
    console.log('  (run with --verbose to see individual prices)');
  }

  const configList = await stripe.billingPortal.configurations.list({ is_default: true, limit: 1 });
  let configId: string;
  let existingConfig: Stripe.BillingPortal.Configuration | null = null;
  if (configList.data.length === 0) {
    console.log('\nNo default Customer Portal configuration found.');
    if (isDryRun) {
      console.log('(DRY RUN) Would create a new default configuration.');
      return;
    }
    console.log('Creating a new default configuration…');
    const created = await stripe.billingPortal.configurations.create({
      business_profile: {
        headline: 'Gestisci il tuo abbonamento Gamma Capital',
      },
      features: {
        customer_update: { enabled: true, allowed_updates: ['email', 'name', 'address', 'phone', 'tax_id'] },
        invoice_history: { enabled: true },
        payment_method_update: { enabled: true },
        subscription_cancel: { enabled: true, mode: 'at_period_end', proration_behavior: 'none' },
        subscription_update: {
          enabled: true,
          default_allowed_updates: ['price', 'promotion_code'],
          proration_behavior: 'create_prorations',
          products: portalProducts,
        },
      },
      default_return_url: 'https://gammacapital.it/it/memberships',
    });
    configId = created.id;
    console.log(`Created configuration ${configId}.`);
  } else {
    existingConfig = configList.data[0];
    configId = existingConfig.id;
    console.log(`\nFound existing default Customer Portal configuration: ${configId}`);
  }

  if (isDryRun) {
    console.log('\n(DRY RUN) Re-run without --dry-run to apply the configuration.');
    return;
  }

  if (existingConfig) {
    console.log(`Updating configuration ${configId}…`);
    const updated = await stripe.billingPortal.configurations.update(configId, {
      features: {
        subscription_update: {
          enabled: true,
          default_allowed_updates: ['price', 'promotion_code'],
          proration_behavior: 'create_prorations',
          products: portalProducts,
        },
      },
    });
    const sub = updated.features.subscription_update;
    console.log('\nDone. Current subscription_update settings:');
    console.log(`  enabled:            ${sub.enabled}`);
    console.log(`  proration_behavior: ${sub.proration_behavior}`);
    console.log(`  allowed updates:    ${sub.default_allowed_updates.join(', ')}`);
    console.log(`  products:           ${sub.products?.length ?? 0}`);
  }

  console.log('\nNext: open the customer portal login link and verify that customers can switch between Premium and Black Label tiers.');
}

main().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  console.error(`\nError: ${message}`);
  process.exit(1);
});
