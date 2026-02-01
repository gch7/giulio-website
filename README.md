# Gamma Capital - Institutional Grade Website

A high-performance, institutional-grade website built with **Next.js 15** and **Sanity CMS v4**, designed for Gamma Capital. The platform delivers market intelligence, strategic advisory, and premium membership services with a focus on visual performance and global accessibility via modern localization patterns.

## 🚀 Tech Stack

- **Framework**: [Next.js 15.1+](https://nextjs.org/) (App Router, Server Components)
- **CMS**: [Sanity v4](https://www.sanity.io/) (Headless CMS with embedded Studio at `/admin`)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) + CSS Variables based Theming
- **Animation**: [GSAP](https://gsap.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Localization**: Multi-language support (EN/IT) via `[locale]` dynamic routing
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide Icons](https://lucide.dev/)
- **State Management**: React Context (Locale, UI Strings) + URL-based state (`nuqs`)

## 📁 Project Structure

```
├── .agent/                     # Agentic coding workflows
├── _bmad/                      # BMad Core System (Epics, Stories, Config)
├── docs/                       # Project documentation & scan reports
├── sanity/                     # Sanity Studio Source
│   ├── schemaTypes/            # Document, Object, and Section schemas
│   └── plugins/                # Custom Sanity plugins
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/           # Localized routes (Home, Solutions, etc.)
│   │   ├── admin/              # Embedded Sanity Studio
│   │   └── api/                # Backend API routes
│   ├── components/             # React components
│   │   ├── sections/           # CMS-driven page sections
│   │   ├── ui/                 # Shadcn/Basic UI elements
│   │   └── providers/          # Context providers (Theme, Locale)
│   ├── lib/                    # Shared utilities & configurations
│   ├── sanity/                 # Sanity client & query definitions
│   ├── i18n/                   # Internationalization config
│   └── types/                  # TypeScript definitions
└── CMS-GUIDE.md                # Content editor handbook
```

## 🏗️ CMS Architecture

### Singleton Documents (Global State)
| Document | Purpose |
|----------|---------|
| `brandSettings` | Global branding (logos, favicons, social links, contact email) |
| `siteSettings` | Navigation menu, footer structure, and global SEO fallbacks |
| `uiStrings` | System-wide labels, error messages, and button texts (Localized) |

### Page-Specific Singletons
| Document | Page Managed |
|----------|--------------|
| `consultingPage` | Strategy, Portfolio, and Advisory service content |
| `membershipsPage` | Membership tiers, pricing, and FAQ content |
| `solutionsPage` | Main solutions overview and service matrix |
| `contactPage` | Professional inquiry form and contact details |

### Flexible Page Builder (`page` type)
Custom pages can be constructed using the **Page Builder** section array:
- `heroSection`: High-impact banners with animations and stats.
- `whatWeDoSection`: Grid-based service/feature overviews.
- `threeCardsSection`: Highlighted feature cards.
- `multiAssetSection`: Interactive asset class displays.
- `richTextSection`: Long-form formatted content.
- `whyGammaSection`: Value proposition lists.

## 🛠️ Getting Started

### Prerequisites
- Node.js 20+
- `pnpm` (recommended) or `npm`

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd orchids-atquo-website

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
```

### Development
```bash
npm run dev
```
- **Website**: [http://localhost:3000](http://localhost:3000)
- **Sanity Studio**: [http://localhost:3000/admin](http://localhost:3000/admin)

### Localization
The site automatically detects and routes based on the locale:
- `http://localhost:3000/en` (English - Default)
- `http://localhost:3000/it` (Italian)

## 🔑 Environment Variables

```env
# Sanity Config
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=...

# Feature Flags & URLs
NEXT_PUBLIC_SITE_URL=https://gammacap.ch
```

## 📝 Maintenance
- **Schema Updates**: Modifications to `sanity/schemaTypes` require a deployment to update the Studio interface.
- **Visual Editing**: Enabled in development. Use the Sanity toolbar to edit content directly from the live preview.

## 📄 License
Private - All Rights Reserved Gamma Capital.

