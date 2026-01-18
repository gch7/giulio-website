'use client'

import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import type {
    PageSection,
    HeroSectionData,
    WhatWeDoSectionData,
    TestimonialCTASectionData,
    ThreeCardsSectionData,
    RichTextSectionData,
    UIStrings,
} from '@/types/sanity'
import HeroSection from './sections/hero-section'
import WhatWeDo from './sections/what-we-do'
import TestimonialCTA from './sections/testimonial-cta'
import ThreeServicesCards from './sections/three-services-cards'
import RichTextSection from './sections/rich-text-section'

interface PageBuilderProps {
    sections?: PageSection[]
    uiStrings?: UIStrings | null
}

// Error fallback component
function SectionErrorFallback({ error, resetErrorBoundary, uiStrings }: FallbackProps & { uiStrings?: UIStrings | null }) {
    const errorTitle = uiStrings?.sectionErrorTitle ?? uiStrings?.systemError ?? 'Section Error'
    const retryLabel = uiStrings?.systemRetry ?? 'Retry'
    const show = process.env.NODE_ENV === 'development' || uiStrings?.sectionErrorTitle || uiStrings?.systemError

    if (show) {
        return (
            <div className="p-6 my-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="text-red-800 font-semibold mb-2">
                    {errorTitle}
                </h3>
                {process.env.NODE_ENV === 'development' && (
                    <p className="text-red-600 text-sm font-mono mb-3">
                        {error instanceof Error ? error.message : 'Unknown error'}
                    </p>
                )}
                <button
                    onClick={resetErrorBoundary}
                    className="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    {retryLabel}
                </button>
            </div>
        )
    }
    return null
}

function renderSection(section: PageSection) {
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
            console.warn(`Unknown section type: ${(section as PageSection)._type}`)
            return null
    }
}

export function PageBuilder({ sections, uiStrings }: PageBuilderProps) {
    if (!sections || sections.length === 0) {
        return null
    }

    return (
        <>
            {sections.map((section) => (
                <ErrorBoundary
                    key={section._key}
                    fallbackRender={(props) => <SectionErrorFallback {...props} uiStrings={uiStrings} />}
                    onError={(error) => {
                        console.error(`[PageBuilder] Section ${section._type} error:`, error)
                    }}
                >
                    {renderSection(section)}
                </ErrorBoundary>
            ))}
        </>
    )
}

export default PageBuilder

