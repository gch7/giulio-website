// Object Types
import link from './objects/link'
import ctaButton from './objects/ctaButton'
import navItem from './objects/navItem'
import stat from './objects/stat'
import serviceCard from './objects/serviceCard'

// Section Types
import heroSection from './sections/heroSection'
import whatWeDoSection from './sections/whatWeDoSection'
import testimonialCTASection from './sections/testimonialCTASection'
import threeCardsSection from './sections/threeCardsSection'
import richTextSection from './sections/richTextSection'

// Document Types
import siteSettings from './documents/siteSettings'
import page from './documents/page'

export const schemaTypes = [
    // Objects (reusable)
    link,
    ctaButton,
    navItem,
    stat,
    serviceCard,

    // Sections (for Page Builder)
    heroSection,
    whatWeDoSection,
    testimonialCTASection,
    threeCardsSection,
    richTextSection,

    // Documents
    siteSettings,
    page,
]
