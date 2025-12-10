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

        console.log('🎉 Seed completed successfully!')
    } catch (error) {
        console.error('❌ Seed failed:', error)
        process.exit(1)
    }
}

seed()
