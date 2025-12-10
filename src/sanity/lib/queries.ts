import { defineQuery } from 'next-sanity'

// ============================================
// Site Settings Queries
// ============================================

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    siteName,
    logo,
    logoText,
    navItems[] {
      text,
      href,
      hasDropdown,
      dropdownItems[] {
        text,
        description,
        href
      }
    },
    navCTA {
      text,
      href,
      variant
    },
    footerDescription,
    socialLinks[] {
      platform,
      url
    },
    footerColumns[] {
      title,
      links[] {
        text,
        href,
        isExternal
      }
    },
    contactEmail,
    copyrightText,
    disclaimer,
    seoTitle,
    seoDescription,
    ogImage
  }
`)

// ============================================
// Page Queries
// ============================================

export const HOMEPAGE_QUERY = defineQuery(`
  *[_type == "page" && isHomepage == true][0] {
    _id,
    title,
    slug,
    sections[] {
      _key,
      _type,
      ...,
      // Hero Section expansions
      featureCards[] {
        _key,
        icon,
        title,
        description,
        href,
        linkText
      },
      stats[] {
        _key,
        value,
        label
      },
      primaryCTA {
        text,
        href,
        variant,
        showArrow
      },
      secondaryCTA {
        text,
        href,
        variant,
        showArrow
      },
      // What We Do Section expansions
      services[] {
        _key,
        icon,
        title,
        description,
        href,
        linkText
      },
      // Cards Section expansions
      cards[] {
        _key,
        icon,
        title,
        description,
        href,
        linkText
      }
    },
    seoTitle,
    seoDescription,
    ogImage
  }
`)

export const PAGE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    isHomepage,
    sections[] {
      _key,
      _type,
      ...,
      featureCards[] {
        _key,
        icon,
        title,
        description,
        href,
        linkText
      },
      stats[] {
        _key,
        value,
        label
      },
      primaryCTA {
        text,
        href,
        variant,
        showArrow
      },
      secondaryCTA {
        text,
        href,
        variant,
        showArrow
      },
      services[] {
        _key,
        icon,
        title,
        description,
        href,
        linkText
      },
      cards[] {
        _key,
        icon,
        title,
        description,
        href,
        linkText
      }
    },
    seoTitle,
    seoDescription,
    ogImage
  }
`)

export const ALL_PAGES_QUERY = defineQuery(`
  *[_type == "page"] {
    _id,
    title,
    "slug": slug.current,
    isHomepage
  }
`)

// For generating static paths
export const ALL_PAGE_SLUGS_QUERY = defineQuery(`
  *[_type == "page" && defined(slug.current) && isHomepage != true].slug.current
`)
