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
    // title field removed as it is not in schema
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
            titleLine1: 'Institutional-Grade Market',
            titleLine2: 'Intelligence & Strategy Design',
            description: "Gamma Capital helps investors navigate complex markets through structured analysis, options-driven insights, and disciplined strategy frameworks.\n\nWe combine institutional methodology, real-time market intelligence, and a private Discord community to support better decision-making across market conditions.",
            primaryCTA: {
                text: 'Join Discord Memberships',
                href: '/memberships',
                variant: 'primary',
                showArrow: true,
            },
            secondaryCTA: {
                text: 'Explore Our Solutions',
                href: '/solutions',
                variant: 'secondary',
                showArrow: false,
            },
            bulletPoints: [
                {
                    _key: 'bp-1',
                    icon: 'Activity',
                    text: 'Options flow, volatility dynamics, and institutional market signals'
                },
                {
                    _key: 'bp-2',
                    icon: 'TrendingUp',
                    text: 'Structured strategy insights across derivatives, yield and risk management'
                },
                {
                    _key: 'bp-3',
                    icon: 'Shield',
                    text: 'Premium Discord access, education, and professional consulting'
                }
            ],
            // Cleared featureCards and stats as per specific requirements layout
            featureCards: [],
            stats: [],
            supportingTagline: 'No hype, no noise — just structured, data-driven insight.'
        },
        {
            _key: 'whatwedo-1',
            _type: 'whatWeDoSection',
            badge: 'Market Intelligence & Strategy',
            title: 'What We Do',
            description: "Gamma Capital is a research, strategy and advisory platform focused on options, structured products and multi-asset portfolio frameworks.\n\nOur mission is to bring institutional-style discipline, tools and reasoning to serious investors who seek clarity, structure and consistency rather than generic market commentary.",
            services: [
                {
                    _key: 'service-1',
                    icon: 'BarChart3',
                    title: 'Market Intelligence & Strategy Insights',
                    description: "We analyse options flow, volatility regimes, dealer positioning and key macro drivers to generate structured strategy insights.\n\nInstead of isolated trade ideas, we focus on context: why a setup exists, how it behaves across scenarios, and how it fits into a coherent risk framework.",
                    href: '/solutions/strategy-insights',
                    linkText: 'Learn more',
                },
                {
                    _key: 'service-2',
                    icon: 'Discord',
                    title: 'Discord Memberships',
                    description: "Through our private Discord community, members access real-time market commentary, unusual options activity, structured insights and educational material.\n\nThe environment is designed for investors who value clarity, discipline and professional discussion — not noise or speculation.",
                    href: '/memberships',
                    linkText: 'Learn more',
                },
                {
                    _key: 'service-3',
                    icon: 'Users',
                    title: 'Consulting & Portfolio Advisory',
                    description: "For investors requiring tailored guidance, Gamma Capital offers one-to-one consulting across portfolio review, strategy design, options structures, structured products and broader asset allocation.\n\nThe objective is simple: align strategy, risk and time horizon in a coherent, professional way.",
                    href: '/consulting',
                    linkText: 'Learn more',
                },
            ],
            showViewAllButton: true,
            viewAllButtonText: 'View All Solutions',
            viewAllButtonHref: '/solutions',
        },
        {
            _key: 'multiasset-1',
            _type: 'multiAssetSection',
            badge: 'Full Spectrum',
            title: 'A Multi-Asset, Institutional Perspective',
            description: "Gamma Capital operates across multiple asset classes, including equities, derivatives, structured products, real estate and digital assets.\n\nThis cross-asset perspective allows us to identify hidden correlations, structural inefficiencies and opportunities that remain invisible within single-asset approaches.",
            secondaryDescription: "Our work integrates financial markets analysis with real-world asset experience, offering a broader and more resilient strategic view.",
            assetClasses: [
                { _key: 'ac-1', icon: 'TrendingUp', label: 'Equities' },
                { _key: 'ac-2', icon: 'Layers', label: 'Derivatives' },
                { _key: 'ac-3', icon: 'Globe', label: 'Structured Products' },
                { _key: 'ac-4', icon: 'Building2', label: 'Real Estate' },
                { _key: 'ac-5', icon: 'Coins', label: 'Digital Assets' }
            ]
        },
        {
            _key: 'whygamma-1',
            _type: 'whyGammaSection',
            badge: 'Why Us',
            title: 'Why Gamma Capital',
            reasons: [
                { _key: 'r-1', icon: 'Building', text: 'Institutional logic applied to private portfolios' },
                { _key: 'r-2', icon: 'Target', text: 'Strong focus on options flow and structured payoffs' },
                { _key: 'r-3', icon: 'Shield', text: 'Risk-aware, scenario-driven methodology' },
                { _key: 'r-4', icon: 'MessageSquare', text: 'Clean communication, no hype or retail noise' },
                { _key: 'r-5', icon: 'Layers', text: 'A growing ecosystem: research, Discord, and advisory' }
            ]
        },
        {
            _key: 'cta-1',
            _type: 'testimonialCTASection',
            badge: 'Join Us',
            titleLine1: 'Built for Investors Who Want',
            titleLine2: "Structure and Clarity",
            description: 'Whether you are looking for actionable market intelligence, a disciplined community, or strategic advisory support, Gamma Capital is designed to help you operate with confidence in complex markets.',
            primaryCTA: {
                text: 'Join Discord Memberships',
                href: '/memberships',
                variant: 'primary',
                showArrow: true,
            },
            secondaryCTA: {
                text: 'Explore Our Solutions',
                href: '/solutions',
                variant: 'secondary',
                showArrow: false,
            },
        },
    ],
    seoTitle: 'Gamma Capital - Institutional Market Intelligence',
    seoDescription: 'Gamma Capital helps investors navigate complex markets through structured analysis, options-driven insights, and disciplined strategy frameworks.',
}

// Solutions Page
const solutionsPage = {
    _id: 'solutionsPage',
    _type: 'solutionsPage',
    // title field removed
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
    // title field removed
    heroBadge: 'Premium Access',
    heroTitle: 'Premium Discord Access for Serious Market Participants',
    heroSubtitle: '',
    heroDescription: 'Join a private environment dedicated to actionable insights, options flow interpretation, unusual activity monitoring and structured, real-time market guidance — without noise, hype or confusion.',
    heroPrimaryCta: 'Join the Membership',
    heroSecondaryCta: 'Discover What\'s Inside',
    insideSectionTitle: 'What You Will Find Inside the Discord',
    insideSectionDescription: 'The Gamma Capital Discord is designed for investors who want real clarity in fast-moving markets.',
    insideFeatures: [
        { _key: 'if-1', icon: 'TrendingUp', text: 'Real-time monitoring of institutional flows and unusual options activity' },
        { _key: 'if-2', icon: 'BarChart3', text: 'Daily market analysis on key U.S. equities and macro drivers' },
        { _key: 'if-3', icon: 'Zap', text: 'Fast alerts on anomalous moves and high-potential setups' },
        { _key: 'if-4', icon: 'Users', text: 'Private discussions within a high-quality community of motivated members' },
        { _key: 'if-5', icon: 'GraduationCap', text: 'Educational material, including introductory modules on options and flow interpretation' }
    ],
    benefitsSectionTitle: 'Key Benefits of Joining',
    keyBenefits: [
        { _key: 'kb-1', icon: 'Layers', title: 'Structured Insights', description: 'Receive disciplined, well-organized market insights — not noise or speculation.' },
        { _key: 'kb-2', icon: 'Eye', title: 'Early Information Advantage', description: 'Monitor institutional behavior and unusual activity before the majority of retail traders even notice what is happening.' },
        { _key: 'kb-3', icon: 'Shield', title: 'A Clean, Serious Community', description: 'A curated space for investors who want focus, clarity and real analysis.' },
        { _key: 'kb-4', icon: 'BookOpen', title: 'Educational Foundation', description: 'Access introductory material that helps you understand options, flows and smart money logic.' },
        { _key: 'kb-5', icon: 'Briefcase', title: 'Proven Methodology', description: 'The same analytical approach used in our consulting work — adapted for daily operational use.' }
    ],
    includedSectionTitle: 'What\'s Included in the Membership',
    includedFeatures: [
        'Access to all private Discord channels',
        'Real-time monitoring of institutional options flow',
        'Daily commentary on high-impact market events',
        'Fast alerts on unusual activity and high-potential setups',
        'Priority access to community discussions',
        'Automatic Premium role assignment after purchase'
    ],
    educationalMiniCourseTitle: 'Educational mini-course:',
    educationalItems: [
        'How options work',
        'How to read institutional flows',
        'How to operate with smart-money logic'
    ],
    additionalIncluded: [],
    includedTagline: 'Everything is designed to support your decision-making with clarity and focus.',
    pricingSectionTitle: 'Membership Tiers',
    pricingSectionDescription: "All plans include the full premium experience.\nThe only difference is the duration.",
    plans: [
        {
            _key: 'plan-1',
            id: 'monthly',
            name: 'Monthly Plan',
            price: '€19.99',
            priceValue: 19.99,
            trial: '3 days free trial',
            description: 'Best for testing the community and its value.',
            cta: 'Join Monthly',
            popular: false,
            stripePriceId: 'price_monthly_id'
        },
        {
            _key: 'plan-2',
            id: 'quarterly',
            name: 'Quarterly Plan',
            price: '€54.99',
            priceValue: 54.99,
            trial: '7 days free trial',
            description: 'Saves money compared to the monthly plan.',
            cta: 'Join Quarterly',
            popular: true,
            stripePriceId: 'price_quarterly_id'
        },
        {
            _key: 'plan-3',
            id: 'yearly',
            name: 'Annual Plan',
            price: '€219.99',
            priceValue: 219.99,
            trial: '30 days free trial',
            description: 'The best value for dedicated members.',
            cta: 'Join Annual',
            popular: false,
            stripePriceId: 'price_yearly_id'
        }
    ],
    popularBadgeText: 'Most Popular',
    accessSectionTitle: 'How Access Works',
    accessSteps: [
        { _key: 'as-1', step: 1, title: 'Select Plan', description: 'Select the plan you prefer and complete the checkout via Stripe.' },
        { _key: 'as-2', step: 2, title: 'Automatic Activation', description: 'Your Premium role on Discord is activated automatically.' },
        { _key: 'as-3', step: 3, title: 'Instant Access', description: 'You gain instant access to all private channels and educational materials.' },
        { _key: 'as-4', step: 4, title: 'Manage Subscription', description: 'At expiration, you can renew or cancel freely — your role adjusts accordingly.' }
    ],
    accessTagline: 'No friction, no manual steps, no waiting.',
    faqSectionTitle: 'FAQ',
    faqs: [
        { _key: 'faq-1', question: 'Do I need trading experience to join?', answer: 'Basic market knowledge helps, but the community is designed to be accessible even for investors who are still learning.' },
        { _key: 'faq-2', question: 'Are signals provided?', answer: 'No. We offer structure, context and strategic insights — not blind trade calls.' },
        { _key: 'faq-3', question: 'Can I cancel anytime?', answer: 'Yes. You can cancel at any moment; access remains valid until the end of your billing cycle.' },
        { _key: 'faq-4', question: 'How do free trials work?', answer: 'You get full access during the trial period. If you cancel before it ends, you will not be charged.' },
        { _key: 'faq-5', question: 'What markets do you focus on?', answer: 'Primarily U.S. equities, options and flow-based market signals.' }
    ],
    comingSoonTitle: 'Coming Soon',
    comingSoonDescription: "Gamma Capital constantly evolves.\nNew tools and channels will be added progressively, including:",
    comingSoonFeatures: [
        'Enhanced flow dashboards',
        'Educational modules',
        'Deeper analytical channels',
        'Periodic market breakdowns'
    ],
    comingSoonNote: 'Premium members will receive access automatically as these features roll out.',
    finalCtaTitle: 'Join the Gamma Capital Discord',
    finalCtaDescription: 'Gain clarity, structure and early insight in markets that reward prepared investors.',
    finalCtaButton: 'Choose Your Membership Plan',
    seoTitle: 'Premium Investment Community - Gamma Capital',
    seoDescription: 'Join our premium Discord community for real-time alerts and expert analysis.',
}

// Consulting Page
const consultingPage = {
    _id: 'consultingPage',
    _type: 'consultingPage',
    // title field removed
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
        { _key: 'sni-2', id: 'strategy', title: 'Strategy Design', icon: 'Compass' },
        { _key: 'sni-3', id: 'options', title: 'Options', icon: 'TrendingUp' },
        { _key: 'sni-4', id: 'structured', title: 'Structured Products', icon: 'Layers' },
        { _key: 'sni-5', id: 'realestate', title: 'Real Estate & Assets', icon: 'Building2' },
        { _key: 'sni-6', id: 'crypto', title: 'Crypto', icon: 'Bitcoin' }
    ],
    serviceSections: [
        {
            _key: 'ss-1',
            id: 'portfolio',
            icon: 'Briefcase',
            title: 'Portfolio Review',
            description: [
                'A disciplined, multi-asset review designed to reveal how your portfolio truly behaves.',
                'We analyse every component to identify hidden risks, inefficiencies and structural imbalances: equities, options, ETFs, fixed income, structured products, crypto, real estate and alternatives.',
                'Using institutional tools such as scenario analysis, stress testing, correlation mapping, VaR/CVaR and factor modelling, we highlight where performance is being lost and how risk can be repositioned.',
                'The result is a clear, refined interpretation of your exposures and a practical roadmap to bring order, coherence and discipline to your investment process.'
            ],
            highlight: 'Refined interpretation of your exposures',
            features: [
                { _key: 'pf-1', icon: 'BarChart3', title: 'Multi-Asset Analysis', desc: 'Equities, Options, Crypto, Real Estate.' },
                { _key: 'pf-2', icon: 'Target', title: 'Risk Mapping', desc: 'Identify hidden correlations and imbalances.' }
            ],
            iconGradient: "from-[#2563EB] to-[#1E3A8A]",
            shadowColor: "shadow-[#2563EB]/20"
        },
        {
            _key: 'ss-2',
            id: 'strategy',
            icon: 'Compass',
            title: 'Strategy Design',
            description: [
                'We design investment strategies that combine institutional structure with private-investor flexibility.',
                'Our philosophy is opportunistic and options-driven, integrating short-term tactics with medium- and long-term positioning.',
                'Each strategy is built around your objectives, risk tolerance and liquidity profile, ranging from tailored frameworks to fully bespoke architectures. Where requested, we also design tailor-made algorithms to systematise execution, risk rules and signal logic.',
                'What makes our work unique is the fusion of options flow analysis, structured-product logic, multi-asset integration and scenario-driven adaptability.',
                'Every strategy defines how to express an idea, how to size it, how to hedge it, and how to evolve it as conditions change — creating a disciplined, repeatable system rather than isolated trades.'
            ],
            highlight: 'Built around your objectives and risk tolerance',
            features: [
                { _key: 'sf-1', icon: 'Lightbulb', title: 'Bespoke Frameworks', desc: 'Tailored to your capital and goals.' },
                { _key: 'sf-2', icon: 'LineChart', title: 'Systematic Rules', desc: 'Defined execution and risk logic.' }
            ],
            iconGradient: "from-[#7C3AED] to-[#5B21B6]",
            shadowColor: "shadow-[#7C3AED]/20"
        },
        {
            _key: 'ss-3',
            id: 'options',
            icon: 'TrendingUp',
            title: 'Options',
            description: [
                'Options flow is the core of Gamma Capital.',
                'Our primary edge comes from monitoring and interpreting institutional-grade options flow and unusual activity to understand positioning, risk transfer, and potential market intent.',
                'We connect flow to derivatives mechanics, GEX (gamma exposure), delta hedging dynamics, vanna/charm effects, volatility regimes, skew, and term structure, to frame how options markets can influence price action and liquidity.',
                'Whether the objective is tactical exposure, yield enhancement, convexity management, or hedging, our approach translates complex market signals into clear, risk-aware frameworks — with the structure and precision of a professional derivatives desk.'
            ],
            highlight: 'Structure and precision of a professional desk',
            features: [
                { _key: 'of-1', icon: 'Activity', title: 'Flow Analysis', desc: 'Interpret institutional positioning.' },
                { _key: 'of-2', icon: 'Zap', title: 'Greeks & Volatility', desc: 'Advanced derivatives mechanics.' }
            ],
            iconGradient: "from-[#059669] to-[#047857]",
            shadowColor: "shadow-[#059669]/20"
        },
        {
            _key: 'ss-4',
            id: 'structured',
            icon: 'Layers',
            title: 'Structured Products',
            description: [
                'Our structured-product advisory blends academic depth with institutional insight gained through exposure to portfolio managers at UBS and studies at USI Lugano.',
                'We help investors evaluate and design a wide range of structures, from autocallables and Phoenix notes to reverse convertibles, express products and capital-protected solutions.',
                'Our focus is on understanding payoff design, issuer hedging, risk transfer and market-regime suitability.',
                'When appropriate, we replicate or enhance these payoffs using options to achieve greater flexibility and efficiency.'
            ],
            highlight: 'Academic depth with institutional insight',
            features: [
                { _key: 'spf-1', icon: 'Layers', title: 'Payoff Design', desc: 'Custom structures and replication.' },
                { _key: 'spf-2', icon: 'Shield', title: 'Risk Transfer', desc: 'Issuer hedging analysis.' }
            ],
            iconGradient: "from-[#D97706] to-[#B45309]",
            shadowColor: "shadow-[#D97706]/20"
        },
        {
            _key: 'ss-5',
            id: 'realestate',
            icon: 'Building2',
            title: 'Real Estate & Other Assets',
            description: [
                'Our real estate perspective is shaped by direct experience in Switzerland and Italy, with deep familiarity in markets such as Lugano, Chiasso, Venice, Como, Udine and Rome.',
                'We analyse property opportunities with the same rigor applied to financial assets — cash-flow projections, yield modelling, risk mapping, seasonality, and strategic integration within a broader portfolio.',
                'From short-stay optimisation to long-term capital allocation, we help clients treat real estate not as isolated purchases but as deliberate components of a multi-asset strategy.'
            ],
            highlight: 'Same rigor applied to financial assets',
            features: [
                { _key: 'ref-1', icon: 'Map', title: 'Market Knowledge', desc: 'Switzerland & Italy focus.' },
                { _key: 'ref-2', icon: 'PieChart', title: 'Financial Modelling', desc: 'Yield and cash-flow analysis.' }
            ],
            iconGradient: "from-[#DC2626] to-[#991B1B]",
            shadowColor: "shadow-[#DC2626]/20"
        },
        {
            _key: 'ss-6',
            id: 'crypto',
            icon: 'Bitcoin',
            title: 'Crypto',
            description: [
                'Active in the crypto markets since 2017, we bring historical context and institutional discipline to an asset class often dominated by noise.',
                'We focus on market structure, liquidity cycles, risk sizing, macro correlations and scenario-based positioning.',
                'Our network includes experienced crypto professionals whose insights add depth beyond superficial commentary.',
                'Crypto is approached not as speculation, but as an asymmetric asset requiring measured sizing, structural awareness and strategic integration within a diversified portfolio.'
            ],
            highlight: 'Historical context and institutional discipline',
            features: [
                { _key: 'cf-1', icon: 'Wallet', title: 'Market Structure', desc: 'Liquidity and cycle analysis.' },
                { _key: 'cf-2', icon: 'Shield', title: 'Risk Sizing', desc: 'Measured asymmetric exposure.' }
            ],
            iconGradient: "from-[#F59E0B] to-[#D97706]",
            shadowColor: "shadow-[#F59E0B]/20"
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
    // title field removed
    heroTitle: 'Get in Touch with {brand}Gamma Capital{/brand}',
    heroDescription: 'Whether you are interested in our Discord memberships, consulting services, or a strategic collaboration, you can contact us here. We review every request carefully and respond selectively.',
    heroHighlight: '',
    introHeading: 'How to Contact Us',
    introDescription: "Gamma Capital works with investors, professionals and partners who value clarity, structure and disciplined decision-making.\n\nUse the form below to reach us regarding memberships, consulting, or other professional inquiries.",
    introEmailLabel: 'For general communication:',
    introEmail: 'contact@gammacap.ch',
    formTitle: 'Contact Request',
    formSubtitle: 'Please provide a few details so we can better understand your request and respond appropriately.',
    formSuccessTitle: 'Request submitted successfully!',
    formSuccessMessage: 'Thank you for reaching out. We will be in touch soon.',
    formErrorTitle: 'Failed to submit request',
    formErrorMessage: 'Please try again later.',
    formNameLabel: 'Full Name',
    formNamePlaceholder: 'Your full name',
    formEmailLabel: 'Email Address',
    formEmailPlaceholder: 'your@email.com',
    formCountryLabel: 'Country of Residence',
    formCountryPlaceholder: 'Your country',
    formInterestLabel: 'Area of Interest',
    formInterestPlaceholder: 'Select an area',
    formMessageLabel: 'Message',
    formMessagePlaceholder: "Briefly describe your situation, objectives, or question.",
    formButtonText: 'Submit Request',
    formButtonSubmittingText: 'Submitting...',
    areaOfInterestOptions: [
        { _key: 'aoi-1', value: 'membership', label: 'Discord Memberships' },
        { _key: 'aoi-2', value: 'consulting', label: 'Consulting & Portfolio Review' },
        { _key: 'aoi-3', value: 'strategy', label: 'Strategy Design' },
        { _key: 'aoi-4', value: 'options', label: 'Options & Derivatives' },
        { _key: 'aoi-5', value: 'structured', label: 'Structured Products' },
        { _key: 'aoi-6', value: 'realestate', label: 'Real Estate & Other Assets' },
        { _key: 'aoi-7', value: 'crypto', label: 'Crypto' },
        { _key: 'aoi-8', value: 'partnerships', label: 'Partnerships / Other' }
    ],
    expectationsHeading: 'What to Expect After Contacting Us',
    expectationItems: [
        { _key: 'ei-1', icon: 'UserCheck', text: 'Every request is reviewed personally' },
        { _key: 'ei-2', icon: 'Clock', text: 'We typically respond within 1–2 business days' },
        { _key: 'ei-3', icon: 'MessageSquare', text: 'Not all requests may receive a response' },
        { _key: 'ei-4', icon: 'ShieldCheck', text: 'Consulting engagements are subject to availability and fit' }
    ],
    disclaimer: "Gamma Capital does not provide brokerage services, does not execute trades on behalf of clients, and does not offer legal or tax advice.\nAll information and consulting services are provided for educational and strategic purposes only.",
    seoTitle: 'Contact Gamma Capital',
    seoDescription: 'Get in touch with us for Discord memberships, consulting services, and strategic collaborations.',
}

// UI Strings
const uiStrings = {
    _id: 'uiStrings',
    _type: 'uiStrings',
    // title field removed
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
    // title field removed
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
    // title field removed
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
    // title field removed
    heroBadge: 'Strategy Insights',
    heroTitle: 'Market Intelligence',
    heroSubtitle: '',
    heroDescription: 'Data-driven insights, algorithms and institutional frameworks to understand markets and manage risk.',
    heroCtaText: 'Contact Us',
    heroCtaLink: '/contact',
    layout: 'list',
    services: [
        {
            _key: 'sts-1',
            title: 'Market Intelligence (Core)',
            description: "We develop advanced analytical frameworks and proprietary algorithms to interpret markets, manage portfolio risk and identify asymmetric opportunities.\n\nOur models adapt to volatility, liquidity and macro regimes, and can be custom-built on request for specific strategies or portfolios.",
            icon: 'BarChart3',
            features: [],
            linkUrl: '/contact',
            linkText: 'Contact us'
        },
        {
            _key: 'sts-2',
            title: 'Options Intelligence',
            description: "Options are a key source of market information. We analyse institutional options flow, GEX, dealer positioning and volatility dynamics to understand where risk is building or being hedged.\n\nOur focus is on:",
            icon: 'TrendingUp',
            features: [
                'Flow-driven market behaviour',
                'Gamma exposure and dealer hedging',
                'Volatility regimes and term structure',
                'This intelligence supports timing, risk management and strategy design.'
            ],
            // CTA: none
        },
        {
            _key: 'sts-3',
            title: 'Structured Products Intelligence',
            description: "We analyse and design structured payoffs from an institutional perspective. Our work focuses on:",
            icon: 'Layers',
            features: [
                'Payoff asymmetry and embedded optionality',
                'Issuer hedging logic',
                'Regime-dependent performance',
                'Efficiency vs complexity',
                'We also replicate or improve structured payoffs using options, removing unnecessary opacity.'
            ],
            // CTA: none
        },
        {
            _key: 'sts-4',
            title: 'Real Estate Advisory (Market Intelligence)',
            description: "Our real estate intelligence combines financial analysis with direct operational experience in Switzerland and Italy.\n\nWe analyse opportunities in markets such as Lugano, Chiasso, Venice, Como, Udine and Rome, focusing on yield, risk, cash flow and strategic allocation.\n\nReal estate is treated as part of a broader multi-asset framework, not as an isolated investment.",
            icon: 'Building2',
            features: [],
            linkUrl: '/contact',
            linkText: 'Contact us'
        },
        {
            _key: 'sts-5',
            title: 'Strategic Network & Access',
            description: "Gamma Capital operates within a selective network of professionals across finance, real estate and alternative investments.\n\nThis network provides access to:",
            icon: 'Network',
            features: [
                'High-level market insight',
                'Experienced operators',
                'Strategic alignment and introductions, where appropriate',
                'Not a service, but a strategic advantage for selected clients.'
            ],
            linkUrl: '/contact',
            linkText: 'Contact us'
        }
    ],
    ctaTitle: 'Institutional insight, applied with clarity.',
    ctaDescription: '', // Empty as per request "Closing line: Institutional insight..." is the title basically.
    primaryCtaText: 'Contact Us',
    primaryCtaLink: '/contact',
    secondaryCtaText: 'View Memberships',
    secondaryCtaLink: '/memberships',
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
