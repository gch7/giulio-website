import { defineQuery } from 'next-sanity'

// ============================================
// Reusable Query Fragments
// ============================================

// Sections projection used in page queries
const SECTIONS_PROJECTION = `
  sections[] {
    _key,
    _type,
    // Common section fields
    badge,
    title,
    titleLine1,
    titleLine2,
    description,
    backgroundColor,
    showViewAllButton,
    viewAllButtonText,
    viewAllButtonHref,
    // CTA buttons
    primaryCTA { text, href, variant, showArrow },
    secondaryCTA { text, href, variant, showArrow },
    // Hero Section
    featureCards[] { _key, icon, title, description, href, linkText },
    stats[] { _key, value, label },
    bulletPoints[] { icon, text },
    supportingTagline,
    // What We Do / Three Cards Section
    services[] { _key, icon, title, description, href, linkText },
    cards[] { _key, icon, title, description, href, linkText },
    // Multi-Asset Section
    secondaryDescription,
    assetClasses[] { icon, label },
    // Why Gamma Section
    reasons[] { icon, text },
    // Rich Text Section - expand inline images
    content[] {
      ...,
      _type == "image" => {
        ...,
        asset-> { _id, url }
      }
    }
  }
`

// SEO fields projection
const SEO_PROJECTION = `
  seoTitle,
  seoDescription,
  ogImage {
    ...,
    asset-> { _id, url }
  }
`

// ============================================
// Site Settings Queries
// ============================================

// With locale filter - falls back to doc without language if not found
export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && (language == $locale || !defined(language))][0] {
    siteName,
    logo {
      ...,
      asset->
    },
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
    ${SEO_PROJECTION}
  }
`)

// ============================================
// Page Queries
// ============================================

export const HOMEPAGE_QUERY = defineQuery(`
  *[_type == "page" && isHomepage == true && (language == $locale || !defined(language))][0] {
    _id,
    title,
    slug,
    ${SECTIONS_PROJECTION},
    ${SEO_PROJECTION}
  }
`)

export const PAGE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug && (language == $locale || !defined(language))][0] {
    _id,
    title,
    slug,
    isHomepage,
    noIndex,
    ${SECTIONS_PROJECTION},
    ${SEO_PROJECTION}
  }
`)

export const ALL_PAGES_QUERY = defineQuery(`
  *[_type == "page" && (language == $locale || !defined(language))] {
    _id,
    title,
    "slug": slug.current,
    isHomepage
  }
`)

// For generating static paths - get all slugs for a locale
export const ALL_PAGE_SLUGS_QUERY = defineQuery(`
  *[_type == "page" && defined(slug.current) && isHomepage != true && (language == $locale || !defined(language))].slug.current
`)

// ============================================
// Page Singleton Queries
// ============================================

export const CONTACT_PAGE_QUERY = defineQuery(`
  *[_type == "contactPage" && (language == $locale || !defined(language))][0] {
    heroTitle,
    heroDescription,
    heroHighlight,
    introHeading,
    introDescription,
    introEmailLabel,
    introEmail,
    formTitle,
    formSubtitle,
    formSuccessTitle,
    formSuccessMessage,
    formErrorTitle,
    formErrorMessage,
    areaOfInterestOptions[] {
      value,
      label
    },
    expectationsHeading,
    expectationItems[] {
      icon,
      text
    },
    disclaimer,
    seoTitle,
    seoDescription
  }
`)

export const MEMBERSHIPS_PAGE_QUERY = defineQuery(`
  *[_type == "membershipsPage" && (language == $locale || !defined(language))][0] {
    heroBadge,
    heroTitle,
    heroSubtitle,
    heroDescription,
    heroPrimaryCta,
    heroSecondaryCta,
    insideSectionTitle,
    insideSectionDescription,
    insideFeatures[] {
      icon,
      text
    },
    benefitsSectionTitle,
    keyBenefits[] {
      icon,
      title,
      description
    },
    includedSectionTitle,
    includedFeatures,
    educationalMiniCourseTitle,
    educationalItems,
    additionalIncluded,
    includedTagline,
    pricingSectionTitle,
    pricingSectionDescription,
    plans[] {
      id,
      name,
      price,
      priceValue,
      trial,
      description,
      cta,
      popular,
      stripePriceId
    },
    popularBadgeText,
    accessSectionTitle,
    accessSteps[] {
      step,
      title,
      description
    },
    accessTagline,
    faqSectionTitle,
    faqs[] {
      question,
      answer
    },
    comingSoonTitle,
    comingSoonDescription,
    comingSoonFeatures,
    comingSoonNote,
    finalCtaTitle,
    finalCtaDescription,
    finalCtaButton,
    seoTitle,
    seoDescription
  }
`)

export const CONSULTING_PAGE_QUERY = defineQuery(`
  *[_type == "consultingPage" && (language == $locale || !defined(language))][0] {
    heroBadge,
    heroTitle,
    heroSubtitle,
    heroDescription,
    heroStats[] { value, label },
    serviceNavTitle,
    serviceNavSubtitle,
    serviceNavItems[] {
      id,
      title,
      icon
    },
    serviceSections[] {
      id,
      icon,
      title,
      description,
      highlight,
      iconGradient,
      shadowColor,
      features[] {
        icon,
        title,
        desc
      }
    },
    ctaTitle,
    ctaDescription,
    ctaButtonText,
    ctaButtonHref,
    seoTitle,
    seoDescription
  }
`)

export const SOLUTIONS_PAGE_QUERY = defineQuery(`
  *[_type == "solutionsPage" && (language == $locale || !defined(language))][0] {
    seoTitle,
    seoDescription,
    heroBadge,
    heroTitle,
    heroSubtitle,
    heroDescription,
    solutions[] {
      title,
      description,
      icon,
      color,
      href,
      features
    },
    ctaTitle,
    ctaDescription,
    primaryCtaText,
    primaryCtaLink,
    secondaryCtaText,
    secondaryCtaLink
  }
`)

export const SERVICE_LANDING_PAGE_QUERY = defineQuery(`
  *[_type == "serviceLandingPage" && _id == $id && (language == $locale || !defined(language))][0] {
    seoTitle,
    seoDescription,
    heroBadge,
    heroTitle,
    heroSubtitle,
    heroDescription,
    heroCtaText,
    heroCtaLink,
    services[] {
      title,
      description,
      icon,
      features
    },
    ctaTitle,
    ctaDescription,
    primaryCtaText,
    primaryCtaLink,
    secondaryCtaText,
    secondaryCtaLink
  }
`)

// UI Strings Query
export const UI_STRINGS_QUERY = defineQuery(`
  *[_type == "uiStrings" && (language == $locale || !defined(language))][0] {
    notFoundBadge,
    notFoundTitle,
    notFoundDescription,
    notFoundHomeButtonText,
    notFoundContactButtonText,
    notFoundQuickLinksTitle,
    notFoundQuickLinks[] {
      label,
      href
    },
    systemLoading,
    systemError,
    systemRetry,
    sectionErrorTitle,
    sectionErrorMessage,
    comingSoonTitle,
    comingSoonMessage,
    exploreServicesLabel,
    readyToStartBadge,
    mobileMenuOpenLabel,
    mobileMenuCloseLabel,
    navigationBackLabel,
    logoAriaLabel,
    skipToContentLabel,
    draftModeLabel,
    draftModeExitText,
    paginationPrev,
    paginationNext,
    carouselPrev,
    carouselNext,
    exploreLabel,
    freeTrialSuffix,
    insideChannelsLabel,
    checkoutProcessingText,
    checkoutErrorText,
    formNameLabel,
    formNamePlaceholder,
    formEmailLabel,
    formEmailPlaceholder,
    formCountryLabel,
    formCountryPlaceholder,
    formInterestLabel,
    formInterestPlaceholder,
    formMessageLabel,
    formMessagePlaceholder,
    formRequiredError,
    formEmailError,
    membershipSuccessTitle,
    membershipSuccessMessage,
    membershipProcessingText,
    membershipOrderReferencePrefix,
    membershipReturnHomeButton,
    membershipContactSupportButton,
    spinnerLoadingLabel,
    paginationEllipsis,
    sidebarToggleLabel,
    sheetCloseLabel,
    dialogCloseLabel,
    breadcrumbAriaLabel,
    breadcrumbMoreLabel,
    adminLoadingText,
    contactRoute,
    membershipsRoute,
    solutionsRoute,
    loginRoute,
    disableDraftRoute
  }
`)
