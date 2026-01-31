// ============================================
// Reusable Query Fragments
// ============================================

// Helper to get localized value from internationalizedArray
const LOCALIZED_VALUE = `
  "value": select(
    defined(.[language == $locale][0].value) => .[language == $locale][0].value,
    .[language == "en"][0].value
  )
`

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
// Brand & Site Settings Queries
// ============================================

export const SITE_SETTINGS_QUERY = defineQuery(`
  {
    "brand": *[_type == "brandSettings"][0] {
      siteName,
      logo { ..., asset-> },
      favicon { ..., asset-> },
      socialLinks[] { platform, url, iconName },
      contactEmail
    },
    "settings": *[_type == "siteSettings" && (language == $locale || !defined(language))][0] {
      "siteName": siteName[]{${LOCALIZED_VALUE}}[0].value,
      "logoText": logoText[]{${LOCALIZED_VALUE}}[0].value,
      navItems[] {
        text,
        href,
        hasDropdown,
        dropdownItems[] { text, description, href }
      },
      navCTA { text, href, variant, showArrow },
      footerDescription,
      footerColumns[] {
        title,
        links[] { text, href, isExternal }
      },
      copyrightText,
      disclaimer,
      ${SEO_PROJECTION}
    }
  }
`)

// ============================================
// UI Strings Query
// ============================================

export const UI_STRINGS_QUERY = defineQuery(`
  *[_type == "uiStrings"][0] {
    "notFoundBadge": notFoundBadge[]{${LOCALIZED_VALUE}}[0].value,
    "notFoundTitle": notFoundTitle[]{${LOCALIZED_VALUE}}[0].value,
    "notFoundDescription": notFoundDescription[]{${LOCALIZED_VALUE}}[0].value,
    "notFoundHomeButtonText": notFoundHomeButtonText[]{${LOCALIZED_VALUE}}[0].value,
    "notFoundContactButtonText": notFoundContactButtonText[]{${LOCALIZED_VALUE}}[0].value,
    "notFoundQuickLinksTitle": notFoundQuickLinksTitle[]{${LOCALIZED_VALUE}}[0].value,
    
    "systemLoading": systemLoading[]{${LOCALIZED_VALUE}}[0].value,
    "systemError": systemError[]{${LOCALIZED_VALUE}}[0].value,
    "comingSoonTitle": comingSoonTitle[]{${LOCALIZED_VALUE}}[0].value,
    
    "mobileMenuOpenLabel": mobileMenuOpenLabel[]{${LOCALIZED_VALUE}}[0].value,
    "mobileMenuCloseLabel": mobileMenuCloseLabel[]{${LOCALIZED_VALUE}}[0].value,
    "logoAriaLabel": logoAriaLabel[]{${LOCALIZED_VALUE}}[0].value,
    "exploreServicesLabel": exploreServicesLabel[]{${LOCALIZED_VALUE}}[0].value,
    "navigationBackLabel": navigationBackLabel[]{${LOCALIZED_VALUE}}[0].value,
    
    "formSubmitButton": formSubmitButton[]{${LOCALIZED_VALUE}}[0].value,
    "formSubmittingText": formSubmittingText[]{${LOCALIZED_VALUE}}[0].value,
    "formRequiredError": formRequiredError[]{${LOCALIZED_VALUE}}[0].value,
    "formEmailError": formEmailError[]{${LOCALIZED_VALUE}}[0].value,
    "formSuccessTitle": formSuccessTitle[]{${LOCALIZED_VALUE}}[0].value,
    
    contactRoute,
    solutionsRoute
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

export const ALL_PAGE_SLUGS_QUERY = defineQuery(`
  *[_type == "page" && defined(slug.current) && isHomepage != true && (language == $locale || !defined(language))].slug.current
`)

// ============================================
// Page Singleton Queries (Translation Documents)
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
    areaOfInterestOptions[] { value, label },
    expectationsHeading,
    expectationItems[] { icon, text },
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
    insideFeatures[] { icon, text },
    benefitsSectionTitle,
    keyBenefits[] { icon, title, description },
    includedSectionTitle,
    includedFeatures,
    educationalMiniCourseTitle,
    educationalItems,
    additionalIncluded,
    includedTagline,
    pricingSectionTitle,
    pricingSectionDescription,
    plans[] {
      id, name, price, priceValue, trial, description, cta, popular, stripePriceId
    },
    popularBadgeText,
    accessSectionTitle,
    accessSteps[] { step, title, description },
    accessTagline,
    faqSectionTitle,
    faqs[] { question, answer },
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
    serviceNavItems[] { id, title, icon },
    serviceSections[] {
      id, icon, title, description, highlight, iconGradient, shadowColor,
      features[] { icon, title, desc }
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
    solutions[] { title, description, icon, color, href, features },
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
    services[] { title, description, icon, features },
    ctaTitle,
    ctaDescription,
    primaryCtaText,
    primaryCtaLink,
    secondaryCtaText,
    secondaryCtaLink
  }
`)
