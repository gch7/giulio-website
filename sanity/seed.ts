// Seed data script for Sanity
// Run with: npx tsx seed.ts

import { createClient } from '@sanity/client'

// Use the API key directly for write access
const client = createClient({
    projectId: 'rm9kkope',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: 'skOUtsAh1nD2puWGAGlcM5V9PZ6cYctduaFM9AuTbfoxoG0Jkiiu4hEBF4rZoI1VhLCA5tABIZj83zWdpqrvTl8xiF8d0P4axzEz93nhsl5nbisEwCtKC5JQFezOdAydh0726wEVrhVxEX8zLFwZ6OGqtCmRbg4cXcdSuVG9jnxlKbqtJJ5x',
    useCdn: false,
})

// Site Settings document
const siteSettings = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: 'Gamma Capital',
    logoText: 'Γ',
    navItems: [
        {
            _key: 'nav-1',
            text: 'Solutions',
            href: '/solutions',
            hasDropdown: true,
            dropdownItems: [
                { text: 'Strategy Insights', description: 'Market Intelligence', href: '/solutions/strategy-insights' },
                { text: 'Discord Memberships', description: 'Join our community', href: '/memberships' },
                { text: 'Consulting', description: 'Expert guidance', href: '/consulting' },
            ],
        },
        { _key: 'nav-2', text: 'Memberships', href: '/memberships', hasDropdown: false },
        { _key: 'nav-3', text: 'Consulting', href: '/consulting', hasDropdown: false },
        { _key: 'nav-4', text: 'Contact', href: '/contact', hasDropdown: false },
    ],
    navCTA: {
        text: 'Get Started',
        href: '/contact',
        variant: 'primary',
    },
    footerDescription: 'Institutional-grade market intelligence and strategic advisory for sophisticated investors.',
    socialLinks: [
        { _key: 'social-1', platform: 'twitter', url: '#' },
        { _key: 'social-2', platform: 'linkedin', url: '#' },
    ],
    footerColumns: [
        {
            _key: 'col-1',
            title: 'Solutions',
            links: [
                { _key: 'link-1', text: 'Strategy Insights', href: '/solutions/strategy-insights', isExternal: false },
                { _key: 'link-2', text: 'Discord Memberships', href: '/memberships', isExternal: false },
                { _key: 'link-3', text: 'Consulting', href: '/consulting', isExternal: false },
            ],
        },
        {
            _key: 'col-2',
            title: 'Company',
            links: [
                { _key: 'link-4', text: 'Contact', href: '/contact', isExternal: false },
            ],
        },
    ],
    connectColumnTitle: 'Connect',
    mobileSecondaryLinks: [
        { _key: 'mob-1', text: 'Intelligence', href: '/solutions/strategy-insights', isExternal: false },
        { _key: 'mob-2', text: 'Contact Us', href: '/contact', isExternal: false },
        { _key: 'mob-3', text: 'Community', href: '/memberships', isExternal: false },
    ],
    mobileFooterText: 'Institutional-grade market intelligence.',
    contactEmail: 'contact@gammacapital.com',
    copyrightText: '© 2024 Gamma Capital. All rights reserved.',
    disclaimer: 'Disclaimer: The information provided is for educational purposes only and should not be considered financial advice. Past performance is not indicative of future results.',
    seoTitle: 'Gamma Capital - Institutional Market Intelligence',
    seoDescription: 'Institutional-grade market intelligence, research, and advisory services for sophisticated investors.',
}

// Homepage document
const homepage = {
    _id: 'homepage',
    _type: 'page',
    title: 'Homepage',
    slug: { _type: 'slug', current: 'home' },
    isHomepage: true,
    sections: [
        {
            _key: 'hero-1',
            _type: 'heroSection',
            badge: 'Institutional Intelligence',
            titleLine1: 'Market Intelligence for',
            titleLine2: 'Sophisticated Investors',
            description: 'Gamma Capital delivers institutional-grade research, exclusive community access, and personalized consulting to elevate your investment strategy.',
            primaryCTA: {
                text: 'View Memberships',
                href: '/memberships',
                variant: 'primary',
                showArrow: true,
            },
            secondaryCTA: {
                text: 'Book Consultation',
                href: '/consulting',
                variant: 'secondary',
                showArrow: false,
            },
            featureCards: [
                {
                    _key: 'card-1',
                    icon: 'BarChart3',
                    title: 'Strategy Insights',
                    description: 'Data-driven market analysis and actionable intelligence for informed decisions.',
                    href: '/solutions/strategy-insights',
                    linkText: 'Learn more',
                },
                {
                    _key: 'card-2',
                    icon: 'Discord',
                    title: 'Discord Community',
                    description: 'Real-time alerts, market discussions, and direct access to our research team.',
                    href: '/memberships',
                    linkText: 'View plans',
                },
                {
                    _key: 'card-3',
                    icon: 'Users',
                    title: 'Advisory Services',
                    description: 'Portfolio review, strategy design, and risk framework development.',
                    href: '/consulting',
                    linkText: 'Get started',
                },
            ],
            stats: [
                { _key: 'stat-1', value: '500+', label: 'Active Members' },
                { _key: 'stat-2', value: '$2.1B', label: 'AUM Advised' },
                { _key: 'stat-3', value: '12+', label: 'Years Experience' },
                { _key: 'stat-4', value: '94%', label: 'Client Retention' },
            ],
        },
        {
            _key: 'whatwedo-1',
            _type: 'whatWeDoSection',
            badge: 'Our Solutions',
            title: 'What We Do',
            description: "Comprehensive investment solutions designed to give you an edge in today's complex markets.",
            services: [
                {
                    _key: 'service-1',
                    icon: 'BarChart3',
                    title: 'Market Intelligence',
                    description: 'Data-driven market analysis, research reports, and actionable insights for informed investment decisions.',
                    href: '/solutions/strategy-insights',
                    linkText: 'Learn more',
                },
                {
                    _key: 'service-2',
                    icon: 'Discord',
                    title: 'Discord Memberships',
                    description: 'Real-time trade alerts, market discussions, and exclusive community access with tiered membership options.',
                    href: '/memberships',
                    linkText: 'Learn more',
                },
                {
                    _key: 'service-3',
                    icon: 'Users',
                    title: 'Consulting',
                    description: 'Personalized portfolio reviews, strategy design, and risk framework development from experienced analysts.',
                    href: '/consulting',
                    linkText: 'Learn more',
                },
                {
                    _key: 'service-4',
                    icon: 'Building2',
                    title: 'Real Estate Advisory',
                    description: 'Strategic guidance for real estate investments, market analysis, and portfolio diversification.',
                    href: '/solutions/real-estate',
                    linkText: 'Learn more',
                },
                {
                    _key: 'service-5',
                    icon: 'Network',
                    title: 'Strategic Network',
                    description: 'Access to exclusive deal flow, institutional connections, and curated investment opportunities.',
                    href: '/solutions/network',
                    linkText: 'Learn more',
                },
            ],
            showViewAllButton: true,
            viewAllButtonText: 'View All Solutions',
            viewAllButtonHref: '/solutions',
        },
        {
            _key: 'cta-1',
            _type: 'testimonialCTASection',
            badge: 'Trusted by institutional investors',
            titleLine1: 'Ready to Gain an Edge',
            titleLine2: "in Today's Markets?",
            description: 'Join our community of sophisticated investors gaining access to institutional-grade insights and personalized guidance.',
            primaryCTA: {
                text: 'Explore Memberships',
                href: '/memberships',
                variant: 'primary',
                showArrow: false,
            },
            secondaryCTA: {
                text: 'Contact Us',
                href: '/contact',
                variant: 'secondary',
                showArrow: false,
            },
        },
    ],
    seoTitle: 'Gamma Capital - Institutional Market Intelligence',
    seoDescription: 'Institutional-grade market intelligence, research, and advisory services for sophisticated investors.',
}

// Solutions Page
const solutionsPage = {
    _id: 'solutionsPage',
    _type: 'solutionsPage',
    title: 'Solutions Page',
    seoTitle: 'Investment Solutions - Gamma Capital',
    seoDescription: 'Explore our comprehensive range of investment solutions, from market intelligence to personalized consulting.',
    heroBadge: 'Our Solutions',
    heroTitle: 'Comprehensive Investment Solutions',
    heroSubtitle: 'Investment Solutions',
    heroDescription: 'From market intelligence to personalized consulting, we provide the tools and insights you need to succeed in today\'s markets.',
    solutions: [
        {
            _key: 'sol-1',
            title: 'Market Intelligence',
            description: 'Data-driven analysis and research reports.',
            icon: 'BarChart3',
            color: '#2563EB',
            href: '/solutions/strategy-insights',
            features: ['Daily Reports', 'Market Analysis', 'Trend Identification']
        },
        {
            _key: 'sol-2',
            title: 'Discord Community',
            description: 'Real-time alerts and community access.',
            icon: 'Users',
            color: '#7C3AED',
            href: '/memberships',
            features: ['Live Alerts', 'Community Chat', 'Expert Access']
        },
        {
            _key: 'sol-3',
            title: 'Consulting Services',
            description: 'Personalized strategic guidance.',
            icon: 'Building2',
            color: '#059669',
            href: '/consulting',
            features: ['Portfolio Review', 'Risk Assessment', 'Strategy Design']
        }
    ],
    ctaTitle: 'Not Sure Where to Start?',
    ctaDescription: 'Book a free consultation call to discuss your goals and find the right solution for your investment needs.',
    primaryCtaText: 'Schedule a Call',
    primaryCtaLink: '/contact',
    secondaryCtaText: 'View Memberships',
    secondaryCtaLink: '/memberships',
}

// Memberships Page
const membershipsPage = {
    _id: 'membershipsPage',
    _type: 'membershipsPage',
    title: 'Memberships Page',
    heroBadge: 'Premium Discord Access',
    heroTitle: 'Join the Elite Investment Community',
    heroSubtitle: 'Elevate Your Strategy',
    heroDescription: 'Get real-time market alerts, exclusive research, and direct access to institutional analysts.',
    heroPrimaryCta: 'Join the Membership',
    heroSecondaryCta: 'Discover What\'s Inside',
    insideSectionTitle: 'Inside the Community',
    insideSectionDescription: 'Access a wealth of resources designed to improve your trading and investment performance.',
    insideFeatures: [
        { _key: 'if-1', icon: 'TrendingUp', text: 'Real-time Trade Alerts' },
        { _key: 'if-2', icon: 'Eye', text: 'Market Watchlists' },
        { _key: 'if-3', icon: 'MessageSquare', text: 'Analyst Q&A' },
        { _key: 'if-4', icon: 'GraduationCap', text: 'Educational Resources' }
    ],
    benefitsSectionTitle: 'Key Benefits of Joining',
    keyBenefits: [
        { _key: 'kb-1', icon: 'Zap', title: 'Speed', description: 'React faster to market movements with instant alerts.' },
        { _key: 'kb-2', icon: 'Target', title: 'Precision', description: 'High-conviction setups and analysis.' },
        { _key: 'kb-3', icon: 'Users', title: 'Network', description: 'Connect with like-minded serious investors.' }
    ],
    includedSectionTitle: 'What\'s Included in the Membership',
    includedFeatures: ['Daily Market Analysis', 'Live Trading Sessions', 'Portfolio Tracking Templates', 'Risk Management Tools'],
    educationalMiniCourseTitle: 'Educational mini-course:',
    educationalItems: ['Technical Analysis Mastery', 'Fundamental Analysis Basics', 'Risk Management Framework'],
    additionalIncluded: ['Priority Support', 'Quarterly Strategy Calls'],
    includedTagline: 'Everything you need to succeed.',
    pricingSectionTitle: 'Membership Tiers',
    pricingSectionDescription: 'Choose the plan that fits your investment style and needs.',
    plans: [
        {
            _key: 'plan-1',
            id: 'monthly',
            name: 'Monthly Access',
            price: '$99',
            priceValue: 99,
            trial: '7 days free trial',
            description: 'Flexible monthly billing.',
            cta: 'Start Free Trial',
            popular: false,
            stripePriceId: 'price_monthly_id'
        },
        {
            _key: 'plan-2',
            id: 'yearly',
            name: 'Annual Pro',
            price: '$899',
            priceValue: 899,
            trial: '14 days free trial',
            description: 'Save 25% with annual billing.',
            cta: 'Start Free Trial',
            popular: true,
            stripePriceId: 'price_yearly_id'
        }
    ],
    popularBadgeText: 'Most Popular',
    accessSectionTitle: 'How Access Works',
    accessSteps: [
        { _key: 'as-1', step: 1, title: 'Choose Plan', description: 'Select your membership tier.' },
        { _key: 'as-2', step: 2, title: 'Connect Discord', description: 'Link your Discord account securely.' },
        { _key: 'as-3', step: 3, title: 'Instant Access', description: 'Get immediate access to all channels.' }
    ],
    accessTagline: 'No friction, no manual steps, no waiting.',
    faqSectionTitle: 'Frequently Asked Questions',
    faqs: [
        { _key: 'faq-1', question: 'Can I cancel anytime?', answer: 'Yes, you can cancel your subscription at any time from your dashboard.' },
        { _key: 'faq-2', question: 'Do you offer refunds?', answer: 'We offer a 14-day money-back guarantee for annual plans.' }
    ],
    comingSoonTitle: 'Coming Soon',
    comingSoonDescription: 'We are constantly adding new features.',
    finalCtaTitle: 'Ready to Upgrade Your Trading?',
    finalCtaDescription: 'Join hundreds of satisfied members today.',
    finalCtaButton: 'Choose Your Membership Plan',
    seoTitle: 'Premium Investment Community - Gamma Capital',
    seoDescription: 'Join our premium Discord community for real-time alerts and expert analysis.',
}

// Consulting Page
const consultingPage = {
    _id: 'consultingPage',
    _type: 'consultingPage',
    title: 'Consulting Page',
    heroBadge: 'Expert Advisory',
    heroTitle: 'Personalized Investment Consulting',
    heroSubtitle: 'Tailored Strategies',
    heroDescription: 'Work directly with our experts to build a robust investment portfolio tailored to your unique goals and risk tolerance.',
    heroStats: [
        { _key: 'cs-1', value: '100+', label: 'Clients Advised' },
        { _key: 'cs-2', value: '$500M+', label: 'Strategy Volume' }
    ],
    serviceNavTitle: 'Our Advisory Services',
    serviceNavSubtitle: 'Click to explore each service in detail',
    serviceNavItems: [
        { _key: 'sni-1', id: 'portfolio', title: 'Portfolio Review', icon: 'Briefcase' },
        { _key: 'sni-2', id: 'risk', title: 'Risk Management', icon: 'Shield' }
    ],
    serviceSections: [
        {
            _key: 'ss-1',
            id: 'portfolio',
            icon: 'Briefcase',
            title: 'Portfolio Review',
            description: ['Comprehensive analysis of your current holdings.', 'Identification of overlapping assets and concentration risks.'],
            highlight: 'Optimize your allocation',
            features: [
                { _key: 'pf-1', icon: 'BarChart3', title: 'Asset Allocation', desc: 'Optimal distribution across asset classes.' },
                { _key: 'pf-2', icon: 'Target', title: 'Goal Alignment', desc: 'Ensuring investments match your objectives.' }
            ]
        },
        {
            _key: 'ss-2',
            id: 'risk',
            icon: 'Shield',
            title: 'Risk Management',
            description: ['Develop a personalized risk framework.', 'Stress test your portfolio against market scenarios.'],
            highlight: 'Protect your capital',
            features: [
                { _key: 'rf-1', icon: 'Shield', title: 'Downside Protection', desc: 'Strategies to limit losses.' },
                { _key: 'rf-2', icon: 'Calculator', title: 'Position Sizing', desc: 'Mathematical approach to trade size.' }
            ]
        }
    ],
    ctaTitle: 'Let\'s Discuss Your Portfolio',
    ctaDescription: 'Book a discovery call to see how we can help you achieve your financial goals.',
    ctaButtonText: 'Schedule Consultation',
    ctaButtonHref: '/contact',
    seoTitle: 'Investment Consulting Services - Gamma Capital',
    seoDescription: 'Professional investment consulting and portfolio advisory services.',
}

// Contact Page
const contactPage = {
    _id: 'contactPage',
    _type: 'contactPage',
    title: 'Contact Page',
    heroTitle: 'Get in Touch with {brand}Gamma Capital{/brand}',
    heroDescription: 'We are here to answer your questions and help you find the right solution.',
    heroHighlight: 'Contact Us',
    introHeading: 'How can we help?',
    introDescription: 'Choose a topic below or send us a general inquiry.',
    introEmailLabel: 'For general communication:',
    introEmail: 'hello@gammacapital.com',
    formTitle: 'Contact Request',
    formSubtitle: 'Fill out the form and we will get back to you shortly.',
    formSuccessTitle: 'Request submitted successfully!',
    formSuccessMessage: 'Thank you for reaching out. We will be in touch soon.',
    formErrorTitle: 'Failed to submit request',
    formErrorMessage: 'Please try again later.',
    formNameLabel: 'Full Name',
    formNamePlaceholder: 'Your full name',
    formEmailLabel: 'Email Address',
    formEmailPlaceholder: 'your@email.com',
    formCountryLabel: 'Country',
    formCountryPlaceholder: 'Your country',
    formInterestLabel: 'Area of Interest',
    formInterestPlaceholder: 'Select an area',
    formMessageLabel: 'Message',
    formMessagePlaceholder: 'How can we help you?',
    formButtonText: 'Submit Request',
    formButtonSubmittingText: 'Submitting...',
    areaOfInterestOptions: [
        { _key: 'aoi-1', value: 'membership', label: 'Membership' },
        { _key: 'aoi-2', value: 'consulting', label: 'Consulting' },
        { _key: 'aoi-3', value: 'other', label: 'Other' }
    ],
    expectationsHeading: 'What to Expect After Contacting Us',
    expectationItems: [
        { _key: 'ei-1', icon: 'Clock', text: 'Response within 24 hours' },
        { _key: 'ei-2', icon: 'UserCheck', text: 'Personalized reply' }
    ],
    disclaimer: 'Your privacy is important to us.',
    seoTitle: 'Contact Gamma Capital',
    seoDescription: 'Get in touch with our team for inquiries about memberships and consulting.',
}

// UI Strings
const uiStrings = {
    _id: 'uiStrings',
    _type: 'uiStrings',
    title: 'UI Strings',
    notFoundBadge: 'Error 404',
    notFoundTitle: 'Lost in {highlight}Data.{/highlight}',
    notFoundDescription: 'The page you are looking for has been moved, removed, or never existed in our strategy framework.',
    notFoundHomeButtonText: 'Return Home',
    notFoundContactButtonText: 'Contact Support',
    notFoundQuickLinksTitle: 'Popular Insights',
    notFoundQuickLinks: [
        { _key: 'ql-1', label: 'Strategy Insights', href: '/solutions/strategy-insights' },
        { _key: 'ql-2', label: 'Memberships', href: '/memberships' }
    ],
    systemLoading: 'Loading...',
    systemError: 'Error',
    systemRetry: 'Retry',
    comingSoonTitle: 'Coming Soon',
    comingSoonMessage: 'This page is currently being updated.',
    mobileMenuOpenLabel: 'Open menu',
    mobileMenuCloseLabel: 'Close menu',
    navigationBackLabel: 'Back',
    exploreServicesLabel: 'Explore Services',
    logoAriaLabel: 'Go to Homepage',
    skipToContentLabel: 'Skip to content',
    membershipSuccessTitle: 'Welcome to the Community!',
    membershipSuccessMessage: "Your membership has been activated successfully. You'll receive an email with your exclusive Discord invite link within 24 hours.",
    membershipProcessingText: 'Processing your payment...',
    membershipOrderReferencePrefix: 'Order reference:',
    membershipReturnHomeButton: 'Return Home',
    membershipContactSupportButton: 'Contact Support',
    formSubmitButton: 'Submit Request',
    formSubmittingText: 'Submitting...',
    formSuccessTitle: 'Request submitted successfully!',
    formErrorTitle: 'Failed to submit request',
    formRequiredFieldLabel: '(required)',
    draftModeLabel: 'Draft Mode',
    draftModeExitText: 'Exit',
    readyToStartBadge: 'Ready to Start?',
    sectionErrorTitle: 'Section Error',
    sectionErrorMessage: 'Unknown error',
    paginationPrev: 'Previous',
    paginationNext: 'Next',
    carouselPrev: 'Previous slide',
    carouselNext: 'Next slide',
    exploreLabel: 'Explore',
    freeTrialSuffix: 'free trial',
    insideChannelsLabel: 'Inside the private channels you will find:',
    checkoutProcessingText: 'Processing...',
    checkoutErrorText: 'Something went wrong. Please try again.',
    formNameLabel: 'Full Name',
    formNamePlaceholder: 'Your full name',
    formEmailLabel: 'Email Address',
    formEmailPlaceholder: 'your@email.com',
    formCountryLabel: 'Country of Residence',
    formCountryPlaceholder: 'e.g., Switzerland, United States, etc.',
    formInterestLabel: 'Area of Interest',
    formInterestPlaceholder: 'Select an area of interest',
    formMessageLabel: 'Message',
    formMessagePlaceholder: 'Briefly describe your situation, objectives, or question.',
    spinnerLoadingLabel: 'Loading',
    paginationEllipsis: 'More pages',
    sidebarToggleLabel: 'Toggle Sidebar',
    sheetCloseLabel: 'Close',
    dialogCloseLabel: 'Close',
    breadcrumbAriaLabel: 'breadcrumb',
    breadcrumbMoreLabel: 'More',
    adminLoadingText: 'Loading Sanity Studio...',
    contactRoute: '/contact',
    membershipsRoute: '/memberships',
    solutionsRoute: '/solutions',
    loginRoute: '/login',
    disableDraftRoute: '/api/disable-draft',
}

// Service Landing Pages (Singletons)
const networkPage = {
    _id: 'networkPage',
    _type: 'serviceLandingPage',
    title: 'Network Page',
    heroBadge: 'Strategic Connections',
    heroTitle: 'Global Investment Network',
    heroSubtitle: 'Access Opportunities',
    heroDescription: 'Unlock exclusive deal flow and connect with institutional partners.',
    heroCtaText: 'Join Network',
    heroCtaLink: '/contact',
    services: [
        { _key: 'ns-1', title: 'Deal Flow', description: 'Access to off-market deals.', icon: 'Network', features: ['Private Equity', 'Venture Capital'] },
        { _key: 'ns-2', title: 'Events', description: 'Exclusive networking events.', icon: 'Users', features: ['Summits', 'Roundtables'] }
    ],
    ctaTitle: 'Expand Your Reach',
    ctaDescription: 'Connect with us to access our global network.',
    primaryCtaText: 'Contact Us',
    primaryCtaLink: '/contact',
    secondaryCtaText: 'Learn More',
    secondaryCtaLink: '/about',
    seoTitle: 'Strategic Network - Gamma Capital',
    seoDescription: 'Exclusive investment network and deal flow.',
}

const realEstatePage = {
    _id: 'realEstatePage',
    _type: 'serviceLandingPage',
    title: 'Real Estate Page',
    heroBadge: 'Real Assets',
    heroTitle: 'Real Estate Advisory',
    heroSubtitle: 'Strategic Growth',
    heroDescription: 'Expert guidance on real estate investment and portfolio diversification.',
    heroCtaText: 'View Portfolio',
    heroCtaLink: '/contact',
    services: [
        { _key: 'res-1', title: 'Market Analysis', description: 'Deep dive into property markets.', icon: 'Building2', features: ['Residential', 'Commercial'] },
        { _key: 'res-2', title: 'Investment Strategy', description: 'Tailored real estate strategies.', icon: 'BarChart3', features: ['Acquisition', 'Development'] }
    ],
    ctaTitle: 'Invest in Real Estate',
    ctaDescription: 'Let us help you build a robust real estate portfolio.',
    primaryCtaText: 'Get Started',
    primaryCtaLink: '/contact',
    secondaryCtaText: 'View Projects',
    secondaryCtaLink: '/projects',
    seoTitle: 'Real Estate Advisory - Gamma Capital',
    seoDescription: 'Real estate investment advisory and market analysis.',
}

const strategyPage = {
    _id: 'strategyPage',
    _type: 'serviceLandingPage',
    title: 'Strategy Page',
    heroBadge: 'Market Intelligence',
    heroTitle: 'Strategic Insights',
    heroSubtitle: 'Data Driven',
    heroDescription: 'Actionable market intelligence and strategic insights.',
    heroCtaText: 'Read Reports',
    heroCtaLink: '/solutions/strategy-insights',
    services: [
        { _key: 'sts-1', title: 'Daily Reports', description: 'Market movements and analysis.', icon: 'TrendingUp', features: ['Forex', 'Equities'] },
        { _key: 'sts-2', title: 'Macro Analysis', description: 'Global economic trends.', icon: 'Map', features: ['Inflation', 'Rates'] }
    ],
    ctaTitle: 'Stay Informed',
    ctaDescription: 'Subscribe to our intelligence reports.',
    primaryCtaText: 'Subscribe',
    primaryCtaLink: '/memberships',
    secondaryCtaText: 'Sample Report',
    secondaryCtaLink: '#',
    seoTitle: 'Strategy Insights - Gamma Capital',
    seoDescription: 'Market intelligence and strategic investment insights.',
}

async function seed() {
    console.log('🌱 Starting seed...')

    try {
        // Create or replace siteSettings
        console.log('📝 Creating Site Settings...')
        await client.createOrReplace(siteSettings)
        console.log('✅ Site Settings created')

        // Create or replace homepage
        console.log('📝 Creating Homepage...')
        await client.createOrReplace(homepage)
        console.log('✅ Homepage created')

        console.log('📝 Creating Solutions Page...')
        await client.createOrReplace(solutionsPage)
        console.log('✅ Solutions Page created')

        console.log('📝 Creating Memberships Page...')
        await client.createOrReplace(membershipsPage)
        console.log('✅ Memberships Page created')

        console.log('📝 Creating Consulting Page...')
        await client.createOrReplace(consultingPage)
        console.log('✅ Consulting Page created')

        console.log('📝 Creating Contact Page...')
        await client.createOrReplace(contactPage)
        console.log('✅ Contact Page created')

        console.log('📝 Creating UI Strings...')
        await client.createOrReplace(uiStrings)
        console.log('✅ UI Strings created')

        console.log('📝 Creating Network Page...')
        await client.createOrReplace(networkPage)
        console.log('✅ Network Page created')

        console.log('📝 Creating Real Estate Page...')
        await client.createOrReplace(realEstatePage)
        console.log('✅ Real Estate Page created')

        console.log('📝 Creating Strategy Page...')
        await client.createOrReplace(strategyPage)
        console.log('✅ Strategy Page created')


        console.log('🎉 Seed completed successfully!')
    } catch (error) {
        console.error('❌ Seed failed:', error)
        process.exit(1)
    }
}

seed()
