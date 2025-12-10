'use client'

import type {
    PageSection,
    HeroSectionData,
    WhatWeDoSectionData,
    TestimonialCTASectionData,
    ThreeCardsSectionData,
    RichTextSectionData,
} from '@/types/sanity'
import HeroSection from './sections/hero-section'
import WhatWeDo from './sections/what-we-do'
import TestimonialCTA from './sections/testimonial-cta'
import ThreeServicesCards from './sections/three-services-cards'
import RichTextSection from './sections/rich-text-section'

interface PageBuilderProps {
    sections?: PageSection[]
}

export function PageBuilder({ sections }: PageBuilderProps) {
    if (!sections || sections.length === 0) {
        return null
    }

    return (
        <>
            {sections.map((section) => {
                switch (section._type) {
                    case 'heroSection':
                        return <HeroSection key={section._key} data={section as HeroSectionData} />
                    case 'whatWeDoSection':
                        return <WhatWeDo key={section._key} data={section as WhatWeDoSectionData} />
                    case 'testimonialCTASection':
                        return <TestimonialCTA key={section._key} data={section as TestimonialCTASectionData} />
                    case 'threeCardsSection':
                        return <ThreeServicesCards key={section._key} data={section as ThreeCardsSectionData} />
                    case 'richTextSection':
                        return <RichTextSection key={section._key} data={section as RichTextSectionData} />
                    default:
                        // Handle unknown section types gracefully
                        console.warn(`Unknown section type: ${(section as PageSection)._type}`)
                        return null
                }
            })}
        </>
    )
}

export default PageBuilder
