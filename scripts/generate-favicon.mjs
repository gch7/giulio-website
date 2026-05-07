/**
 * Generates favicon PNG and apple-icon PNG from a base SVG that draws "GC"
 * on a #2563EB background. Outputs into src/app/ so Next.js auto-serves them.
 *
 * Run with: node scripts/generate-favicon.mjs
 */

import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

function svg(size) {
  // Scale font proportionally (about 47% of the box).
  const fontSize = Math.round(size * 0.47);
  const y = Math.round(size * 0.7);
  const radius = Math.round(size * 0.19);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${radius}" fill="#2563EB"/>
  <text x="${size / 2}" y="${y}" font-family="Helvetica, Arial, sans-serif" font-size="${fontSize}" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="-${Math.max(1, Math.round(size * 0.02))}">GC</text>
</svg>`;
}

async function makePng(size, outPath) {
  const buf = Buffer.from(svg(size));
  await sharp(buf).resize(size, size).png().toFile(outPath);
  console.log(`  ✅ ${outPath} (${size}x${size})`);
}

async function main() {
  console.log('🎨 Generating GC favicons…');

  // Next.js conventions in /src/app:
  // - icon.png (default favicon, browsers; 32x32 standard)
  // - apple-icon.png (apple-touch-icon; 180x180 standard)
  await makePng(32, resolve(projectRoot, 'src/app/icon.png'));
  await makePng(180, resolve(projectRoot, 'src/app/apple-icon.png'));

  // Public folder fallbacks (legacy paths some browsers/services hit directly)
  await makePng(16, resolve(projectRoot, 'public/favicon-16x16.png'));
  await makePng(32, resolve(projectRoot, 'public/favicon-32x32.png'));
  await makePng(32, resolve(projectRoot, 'public/favicon.png'));
  await makePng(180, resolve(projectRoot, 'public/apple-touch-icon.png'));

  // ICO from a 32x32 PNG via sharp (single-resolution, works fine on modern browsers).
  const ico32 = await sharp(Buffer.from(svg(32))).resize(32, 32).png().toBuffer();
  writeFileSync(resolve(projectRoot, 'src/app/favicon.ico'), ico32);
  writeFileSync(resolve(projectRoot, 'public/favicon.ico'), ico32);
  console.log(`  ✅ src/app/favicon.ico (32x32 PNG)`);
  console.log(`  ✅ public/favicon.ico (32x32 PNG)`);

  console.log('🎉 Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
