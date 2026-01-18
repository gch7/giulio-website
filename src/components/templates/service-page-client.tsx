'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import NavigationHeader from "@/components/sections/navigation-header";
import Footer from "@/components/sections/footer";
import { Briefcase, Users, Calendar, Check, Network, Building2, BarChart3, TrendingUp, Shield, ArrowUpRight, type LucideIcon } from 'lucide-react';
import type { ServiceLandingPage, SiteSettings } from '@/types/sanity';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
    Briefcase,
    Users,
    Calendar,
    Check,
    Network,
    Building2,
    BarChart3,
    TrendingUp,
    Shield,
};

interface ServicePageClientProps {
    pageData?: ServiceLandingPage | null;
    siteSettings?: SiteSettings | null;
    defaultBadge?: string;
    defaultTitle?: string;
}

export default function ServicePageClient({ pageData, siteSettings, defaultBadge = 'Service', defaultTitle = 'Service' }: ServicePageClientProps) {
    const heroBadge = pageData?.heroBadge ?? defaultBadge;
    const heroTitle = pageData?.heroTitle ?? defaultTitle;
    const heroSubtitle = pageData?.heroSubtitle ?? '';
    const heroDescription = pageData?.heroDescription ?? '';
    const heroCtaText = pageData?.heroCtaText ?? 'Request Access';
    const heroCtaLink = pageData?.heroCtaLink ?? '/contact';

    const services = pageData?.services || [];

    const ctaTitle = pageData?.ctaTitle ?? 'Ready to Get Started?';
    const ctaDescription = pageData?.ctaDescription ?? 'Contact us to learn more about our services.';
    const primaryCtaText = pageData?.primaryCtaText ?? 'Contact Us';
    const primaryCtaLink = pageData?.primaryCtaLink ?? '/contact';
    const secondaryCtaText = pageData?.secondaryCtaText ?? 'View Solutions';
    const secondaryCtaLink = pageData?.secondaryCtaLink ?? '/solutions';

    const heroRef = useRef<HTMLElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);
    const ctaButtonRef = useRef<HTMLAnchorElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
            badgeRef.current,
            { opacity: 0, y: -20, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7 }
        )
            .fromTo(
                titleRef.current,
                { opacity: 0, y: 50, clipPath: "inset(100% 0% 0% 0%)" },
                { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.9 },
                "-=0.4"
            )
            .fromTo(
                paragraphRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.7 },
                "-=0.5"
            )
            .fromTo(
                ctaButtonRef.current,
                { opacity: 0, y: 20, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6 },
                "-=0.4"
            );

        if (cardsRef.current) {
            gsap.fromTo(
                cardsRef.current.children,
                { opacity: 0, y: 50, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        gsap.fromTo(
            ctaRef.current,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ctaRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, []);

    return (
        <div className="min-h-screen bg-[#F8F9FB]">
            <NavigationHeader siteSettings={siteSettings} />
            <main>
                <section ref={heroRef} className="w-full bg-[#F8F9FB] py-12 md:py-24 px-6 md:px-12">
                    <div className="max-w-[1200px] mx-auto text-center">
                        <div ref={badgeRef} className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2563EB]/10 border border-[#2563EB]/20 rounded-full mb-8">
                            <Network className="w-4 h-4 text-[#2563EB]" />
                            <span className="text-[12px] font-medium text-[#2563EB] tracking-wide uppercase">{heroBadge}</span>
                        </div>
                        <h1 ref={titleRef} className="text-[36px] md:text-[48px] font-display font-medium tracking-[-0.03em] leading-[1.1] mb-6 text-[#111827]">
                            {heroTitle.replace(heroSubtitle, '')}
                            {heroSubtitle && <><br /><span className="text-[#6B7280]">{heroSubtitle}</span></>}
                        </h1>
                        <p ref={paragraphRef} className="text-[17px] text-[#6B7280] font-normal leading-relaxed max-w-xl mx-auto mb-10">
                            {heroDescription}
                        </p>
                        <Link
                            ref={ctaButtonRef}
                            href={heroCtaLink}
                            className="inline-block bg-[#0A1A2F] text-white px-7 py-3.5 rounded-md text-[14px] font-semibold hover:bg-[#1E3A8A] transition-colors"
                        >
                            {heroCtaText}
                        </Link>
                    </div>
                </section>

                <div className="flex flex-col">
                    {services.map((service, index) => {
                        const IconComponent = iconMap[service.icon || ''] || Briefcase;
                        const isNetwork = service.title?.toLowerCase().includes('network');
                        const isCore = service.title?.toLowerCase().includes('(core)');

                        // Core Section - Centered, Highlighted
                        if (isCore) {
                            return (
                                <section key={index} className="w-full bg-white py-20 md:py-32 px-6 md:px-12 border-b border-[#E5E7EB]">
                                    <div className="max-w-[900px] mx-auto text-center">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#eff4ff] text-[#2563EB] mb-8 ring-1 ring-[#dbeafe]">
                                            <IconComponent className="w-8 h-8" />
                                        </div>
                                        <h2 className="text-[32px] md:text-[42px] font-display font-medium text-[#111827] mb-6 leading-tight">
                                            {service.title}
                                        </h2>
                                        <p className="text-[18px] md:text-[20px] text-[#4B5563] leading-relaxed whitespace-pre-wrap">
                                            {service.description}
                                        </p>
                                    </div>
                                </section>
                            );
                        }

                        // Network Section - Dark Mode, Distinctive
                        if (isNetwork) {
                            return (
                                <section key={index} className="w-full bg-[#0B1120] text-white py-20 md:py-32 px-6 md:px-12 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                                        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#2563EB] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                                        <div className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-[#7C3AED] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
                                    </div>

                                    <div className="max-w-[1200px] mx-auto relative z-10">
                                        <div className="flex flex-col lg:flex-row gap-16 items-center">
                                            <div className="flex-1">
                                                {/* Removed hardcoded "Exclusive Access" badge */}
                                                <h2 className="text-[36px] md:text-[48px] font-display font-medium mb-6 leading-tight">
                                                    {service.title}
                                                </h2>
                                                <div className="w-20 h-1 bg-[#2563EB] mb-8" />
                                                <p className="text-[18px] text-gray-300 leading-relaxed mb-8 whitespace-pre-wrap">
                                                    {service.description}
                                                </p>

                                                {service.features && service.features.length > 0 && (
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                                                        {service.features.map((feature, i) => (
                                                            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                                                <div className="mt-1 w-5 h-5 rounded-full bg-[#2563EB]/20 flex items-center justify-center flex-shrink-0 text-[#60A5FA]">
                                                                    <Check className="w-3 h-3" />
                                                                </div>
                                                                <span className="text-[15px] text-gray-200">{feature}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {service.linkUrl && (
                                                    <Link
                                                        href={service.linkUrl}
                                                        className="inline-flex items-center gap-2 text-white font-medium border-b border-[#2563EB] pb-1 hover:text-[#60A5FA] hover:border-[#60A5FA] transition-all"
                                                    >
                                                        {service.linkText || 'Request Access'}
                                                        <ArrowUpRight className="w-4 h-4" />
                                                    </Link>
                                                )}
                                            </div>
                                            <div className="lg:w-1/3 flex justify-center">
                                                <div className="relative w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-full flex items-center justify-center border border-white/10 shadow-2xl">
                                                    <IconComponent className="w-24 h-24 text-white/20" />
                                                    <div className="absolute inset-0 border border-white/5 rounded-full scale-110" />
                                                    <div className="absolute inset-0 border border-white/5 rounded-full scale-125" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            );
                        }

                        // Standard Section - Alternating Layout
                        const isEven = index % 2 === 0;

                        return (
                            <section key={index} className={`w-full py-16 md:py-24 px-6 md:px-12 ${isEven ? 'bg-[#F8F9FB]' : 'bg-white'}`}>
                                <div className="max-w-[1200px] mx-auto">
                                    <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-start`}>

                                        {/* Content Side */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isEven ? 'bg-white border border-[#E5E7EB] text-[#2563EB]' : 'bg-[#eff4ff] text-[#2563EB]'}`}>
                                                    <IconComponent className="w-6 h-6" />
                                                </div>
                                                <h3 className="text-[28px] font-display font-medium text-[#111827]">{service.title}</h3>
                                            </div>

                                            <p className="text-[17px] text-[#4B5563] leading-relaxed mb-8 whitespace-pre-wrap">
                                                {service.description}
                                            </p>

                                            {service.features && service.features.length > 0 && (
                                                <ul className="space-y-4 mb-8">
                                                    {service.features.map((feature, i) => (
                                                        <li key={i} className="flex items-start gap-3">
                                                            <div className="w-6 h-6 rounded-full bg-[#DBEAFE] flex items-center justify-center flex-shrink-0 mt-0.5">
                                                                <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
                                                            </div>
                                                            <span className="text-[16px] text-[#374151]">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            {service.linkUrl && (
                                                <Link
                                                    href={service.linkUrl}
                                                    className="group inline-flex items-center text-[15px] font-semibold text-[#2563EB] hover:text-[#1E3A8A] transition-colors"
                                                >
                                                    {service.linkText || 'Learn more'}
                                                    <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                                </Link>
                                            )}
                                        </div>

                                        {/* Visual Side (Abstract Representation since we don't have images) */}
                                        <div className="w-full lg:w-[45%]">
                                            <div className={`aspect-[4/3] rounded-2xl border border-[#E5E7EB] bg-white p-8 flex flex-col justify-between shadow-sm relative overflow-hidden ${isEven ? '' : 'bg-gradient-to-br from-[#eff4ff] to-white'}`}>
                                                {/* Dictionary/Journal style abstract visual */}
                                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                                    <IconComponent className="w-64 h-64" />
                                                </div>

                                                <div className="relative z-10">
                                                    <div className="w-12 h-1 bg-[#2563EB] mb-6" />
                                                    <div className="space-y-4 opacity-30">
                                                        <div className="h-4 bg-[#111827] rounded w-3/4" />
                                                        <div className="h-4 bg-[#111827] rounded w-full" />
                                                        <div className="h-4 bg-[#111827] rounded w-5/6" />
                                                        <div className="h-4 bg-[#111827] rounded w-2/3" />
                                                    </div>
                                                </div>

                                                <div className="relative z-10 mt-auto pt-8 border-t border-dashed border-gray-200">
                                                    {/* Removed hardcoded REF text */}
                                                    <div className="w-full h-px bg-gray-100" />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </section>
                        );
                    })}
                </div>

                <section ref={ctaRef} className="w-full bg-[#F3F4F6] py-12 md:py-20 px-6 md:px-12 border-t border-[#E5E7EB]">
                    <div className="max-w-[700px] mx-auto text-center">
                        <h2 className="text-[28px] md:text-[36px] font-medium text-[#111827] mb-5">{ctaTitle}</h2>
                        {ctaDescription && (
                            <p className="text-[16px] text-[#6B7280] mb-8">
                                {ctaDescription}
                            </p>
                        )}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                href={primaryCtaLink}
                                className="bg-[#0A1A2F] text-white px-7 py-3.5 rounded-md text-[14px] font-semibold hover:bg-[#1E3A8A] transition-colors"
                            >
                                {primaryCtaText}
                            </Link>
                            <Link
                                href={secondaryCtaLink}
                                className="bg-transparent text-[#111827] px-7 py-3.5 rounded-md text-[14px] font-medium border border-[#E5E7EB] hover:border-[#6B7280] hover:bg-white transition-colors"
                            >
                                {secondaryCtaText}
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer siteSettings={siteSettings} />
        </div>
    );
}
