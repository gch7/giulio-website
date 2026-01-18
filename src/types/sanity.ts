// ============================================
// Object Types
// ============================================

export interface SanityImage {
    _type: 'image'
    asset: {
        _ref: string
        _type: 'reference'
    }
    hotspot?: {
        x: number
        y: number
        height: number
        width: number
    }
    alt?: string
}

export interface Link {
    text: string
    href: string
    isExternal?: boolean
}

export interface CTAButton {
    text: string
    href: string
    variant?: 'primary' | 'secondary' | 'ghost'
    showArrow?: boolean
}

export interface NavItem {
    text: string
    href: string
    hasDropdown?: boolean
    dropdownItems?: Array<{
        text: string
        description?: string
        href: string
    }>
}

export interface Stat {
    _key: string
    value: string
    label: string
}

export interface ServiceCard {
    _key: string
    icon?: 'BarChart3' | 'Users' | 'Building2' | 'Network' | 'Rocket' | 'Discord'
    title: string
    description: string
    href: string
    linkText?: string
}

// ============================================
// Section Types
// ============================================

export interface HeroSectionData {
    _key: string
    _type: 'heroSection'
    badge?: string
    titleLine1: string
    titleLine2: string
    description: string
    primaryCTA?: CTAButton
    secondaryCTA?: CTAButton
    featureCards?: ServiceCard[]
    stats?: Stat[]
    bulletPoints?: Array<{ icon?: string; text: string }>
    supportingTagline?: string
}

export interface MultiAssetSectionData {
    _key: string
    _type: 'multiAssetSection'
    badge?: string
    title?: string
    description?: string
    secondaryDescription?: string
    assetClasses?: Array<{ icon?: string; label: string }>
}

export interface WhyGammaSectionData {
    _key: string
    _type: 'whyGammaSection'
    badge?: string
    title?: string
    reasons?: Array<{ icon?: string; text: string }>
}

export interface WhatWeDoSectionData {
    _key: string
    _type: 'whatWeDoSection'
    badge?: string
    title: string
    description?: string
    services?: ServiceCard[]
    showViewAllButton?: boolean
    viewAllButtonText?: string
    viewAllButtonHref?: string
}

export interface TestimonialCTASectionData {
    _key: string
    _type: 'testimonialCTASection'
    badge?: string
    titleLine1: string
    titleLine2?: string
    description?: string
    primaryCTA?: CTAButton
    secondaryCTA?: CTAButton
}

export interface ThreeCardsSectionData {
    _key: string
    _type: 'threeCardsSection'
    cards?: ServiceCard[]
}

export interface RichTextSectionData {
    _key: string
    _type: 'richTextSection'
    title?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content?: any[] // Portable Text blocks
    backgroundColor?: 'white' | 'gray' | 'teal'
}

// Union type for all sections
export type PageSection =
    | HeroSectionData
    | WhatWeDoSectionData
    | TestimonialCTASectionData
    | ThreeCardsSectionData
    | RichTextSectionData

// ============================================
// Document Types
// ============================================

export interface SiteSettings {
    siteName?: string
    logo?: SanityImage
    logoText?: string
    navItems?: NavItem[]
    navCTA?: CTAButton
    mobileSecondaryLinks?: Link[]
    mobileFooterText?: string
    footerDescription?: string
    socialLinks?: Array<{
        platform?: string
        iconName?: string
        url: string
    }>
    footerColumns?: Array<{
        title: string
        links?: Link[]
    }>
    contactEmail?: string
    copyrightText?: string
    connectColumnTitle?: string
    disclaimer?: string
    seoTitle?: string
    seoDescription?: string
    ogImage?: SanityImage
}

export interface Page {
    _id: string
    title: string
    slug: {
        current: string
    }
    isHomepage?: boolean
    noIndex?: boolean
    sections?: PageSection[]
    seoTitle?: string
    seoDescription?: string
    ogImage?: SanityImage
}

// ============================================
// Page Singleton Types
// ============================================

export interface ContactPage {
    heroTitle?: string
    heroDescription?: string
    heroHighlight?: string
    introHeading?: string
    introDescription?: string
    introEmailLabel?: string
    introEmail?: string
    formTitle?: string
    formSubtitle?: string
    formSuccessTitle?: string
    formSuccessMessage?: string
    formErrorTitle?: string
    formErrorMessage?: string
    formNameLabel?: string
    formNamePlaceholder?: string
    formEmailLabel?: string
    formEmailPlaceholder?: string
    formCountryLabel?: string
    formCountryPlaceholder?: string
    formInterestLabel?: string
    formInterestPlaceholder?: string
    formMessageLabel?: string
    formMessagePlaceholder?: string
    formButtonText?: string
    formButtonSubmittingText?: string
    areaOfInterestOptions?: Array<{
        value: string
        label: string
    }>
    expectationsHeading?: string
    expectationItems?: Array<{
        icon?: string
        text: string
    }>
    disclaimer?: string
    seoTitle?: string
    seoDescription?: string
}

export interface MembershipsPage {
    heroBadge?: string
    heroTitle?: string
    heroSubtitle?: string
    heroDescription?: string
    heroPrimaryCta?: string
    heroSecondaryCta?: string
    insideSectionTitle?: string
    insideSectionDescription?: string
    insideFeatures?: Array<{
        icon?: string
        text: string
    }>
    benefitsSectionTitle?: string
    keyBenefits?: Array<{
        icon?: string
        title: string
        description: string
    }>
    includedSectionTitle?: string
    includedFeatures?: string[]
    educationalMiniCourseTitle?: string
    educationalItems?: string[]
    additionalIncluded?: string[]
    includedTagline?: string
    pricingSectionTitle?: string
    pricingSectionDescription?: string
    plans?: Array<{
        id: string
        name: string
        price: string
        priceValue: number
        trial: string
        description: string
        cta: string
        popular?: boolean
        stripePriceId?: string
    }>
    popularBadgeText?: string
    accessSectionTitle?: string
    accessSteps?: Array<{
        step: number
        title: string
        description: string
    }>
    accessTagline?: string
    faqSectionTitle?: string
    faqs?: Array<{
        question: string
        answer: string
    }>
    comingSoonTitle?: string
    comingSoonDescription?: string
    comingSoonFeatures?: string[]
    comingSoonNote?: string
    finalCtaTitle?: string
    finalCtaDescription?: string
    finalCtaButton?: string
    seoTitle?: string
    seoDescription?: string
}

export interface ConsultingPage {
    heroBadge?: string
    heroTitle?: string
    heroSubtitle?: string
    heroDescription?: string
    heroStats?: Array<{
        value: string
        label: string
    }>
    serviceNavTitle?: string
    serviceNavSubtitle?: string
    serviceNavItems?: Array<{
        id: string
        title: string
        icon?: string
    }>
    serviceSections?: Array<{
        id: string
        icon?: string
        title: string
        description?: string[]
        highlight?: string
        iconGradient?: string
        shadowColor?: string
        features?: Array<{
            icon?: string
            title: string
            desc: string
        }>
    }>
    ctaTitle?: string
    ctaDescription?: string
    ctaButtonText?: string
    ctaButtonHref?: string
    seoTitle?: string
    seoDescription?: string
}

export interface SolutionsPage {
    seoTitle?: string
    seoDescription?: string
    heroBadge?: string
    heroTitle?: string
    heroSubtitle?: string
    heroDescription?: string
    solutions?: Array<{
        title: string
        description: string
        icon?: string
        color?: string
        href: string
        features?: string[]
    }>
    ctaTitle?: string
    ctaDescription?: string
    primaryCtaText?: string
    primaryCtaLink?: string
    secondaryCtaText?: string
    secondaryCtaLink?: string
}

export interface ServiceLandingPage {
    seoTitle?: string
    seoDescription?: string
    heroBadge?: string
    heroTitle?: string
    heroSubtitle?: string
    heroDescription?: string
    heroCtaText?: string
    heroCtaLink?: string
    services?: Array<{
        title: string
        description: string
        icon?: string
        features?: string[]
    }>
    ctaTitle?: string
    ctaDescription?: string
    primaryCtaText?: string
    primaryCtaLink?: string
    secondaryCtaText?: string
    secondaryCtaLink?: string
}

// UI Strings singleton (system messages and labels)
export interface UIStrings {
    _type: 'uiStrings'
    _id: string
    // 404 Page
    notFoundBadge?: string
    notFoundTitle?: string
    notFoundDescription?: string
    notFoundHomeButtonText?: string
    notFoundContactButtonText?: string
    notFoundQuickLinksTitle?: string
    notFoundQuickLinks?: Array<{ label: string; href: string }>
    // Navigation
    mobileMenuOpenLabel?: string
    mobileMenuCloseLabel?: string
    navigationBackLabel?: string
    exploreServicesLabel?: string
    // General
    draftModeLabel?: string
    draftModeExitText?: string
    readyToStartBadge?: string
    // System
    systemLoading?: string
    systemError?: string
    systemRetry?: string
    sectionErrorTitle?: string
    sectionErrorMessage?: string
    comingSoonTitle?: string
    comingSoonMessage?: string
    // Memberships
    membershipSuccessTitle?: string
    membershipSuccessMessage?: string
    membershipProcessingText?: string
    membershipOrderReferencePrefix?: string
    membershipReturnHomeButton?: string
    membershipContactSupportButton?: string
    // Forms
    formSubmitButton?: string
    formSubmittingText?: string
    formSuccessTitle?: string
    formErrorTitle?: string
    formRequiredFieldLabel?: string
    // Accessibility
    paginationPrev?: string
    paginationNext?: string
    carouselPrev?: string
    carouselNext?: string
}
