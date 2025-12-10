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
    footerDescription?: string
    socialLinks?: Array<{
        platform: 'twitter' | 'linkedin' | 'discord' | 'email'
        url: string
    }>
    footerColumns?: Array<{
        title: string
        links?: Link[]
    }>
    contactEmail?: string
    copyrightText?: string
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
    sections?: PageSection[]
    seoTitle?: string
    seoDescription?: string
    ogImage?: SanityImage
}
