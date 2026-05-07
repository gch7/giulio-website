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
    const ctaRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
        tl.fromTo(badgeRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.4 })
            .fromTo(titleRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
            .fromTo(paragraphRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.25");

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
        <div className="min-h-screen bg-[#fafafa]">
            <NavigationHeader siteSettings={siteSettings} />
            <main>
                {/* Hero */}
                <section ref={heroRef} className="w-full bg-[#fafafa] py-16 md:py-24 px-6 md:px-12">
                    <div className="max-w-[1200px] mx-auto text-center">
                        <div ref={badgeRef} className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2563EB]/10 border border-[#2563EB]/20 rounded-full mb-8">
                            <TrendingUp className="w-4 h-4 text-[#2563EB]" />
                            <span className="text-[12px] font-medium text-[#2563EB] tracking-wide uppercase">{heroBadge}</span>
                        </div>
                        <h1 ref={titleRef} className="text-[36px] md:text-[48px] font-display font-medium tracking-[-0.03em] leading-[1.1] mb-6 text-[#111827]">
                            {heroTitle}
                            {heroSubtitle && (
                                <>
                                    <br />
                                    <span className="text-[#6B7280]">{heroSubtitle}</span>
                                </>
                            )}
                        </h1>
                        <p ref={paragraphRef} className="text-[17px] text-[#6B7280] font-normal leading-relaxed max-w-xl mx-auto mb-8">
                            {heroDescription}
                        </p>
                        <Link
                            href={heroCtaLink}
                            className="inline-flex items-center gap-2 bg-[#0A1A2F] text-white px-7 py-3.5 rounded-xl text-[14px] font-semibold hover:bg-[#1E3A8A] transition-colors"
                        >
                            {heroCtaText}
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </section>

                {/* Services */}
                <div>
                    {services.map((service, index) => {
                        const IconComponent = iconMap[service.icon || ''] || BarChart3;
                        const hasLink = !service.linkUrl;

                        // Special "list" layout — first service if layout is list
                        if (pageData?.layout === 'list' && index === 0) {
                            return (
                                <section key={index} className="w-full py-16 md:py-24 px-6 md:px-12 bg-gradient-to-br from-[#0A1A2F] to-[#111827] text-white">
                                    <div className="max-w-[1200px] mx-auto relative z-10">
                                        <div className="flex flex-col lg:flex-row gap-16 items-center">
                                            <div className="flex-1">
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

                        // Standard Section — Alternating Layout
                        const isEven = index % 2 === 0;

                        return (
                            <section key={index} className={`w-full py-16 md:py-24 px-6 md:px-12 ${isEven ? 'bg-[#F8F9FB]' : 'bg-white'}`}>
                                <div className="max-w-[1200px] mx-auto">
                                    <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}>

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

                                        {/* Visual Side — Clean icon card */}
                                        <div className="w-full lg:w-[42%] flex-shrink-0">
                                            <div className={`aspect-[4/3] rounded-2xl flex items-center justify-center relative overflow-hidden ${isEven ? 'bg-gradient-to-br from-[#EFF6FF] to-[#F0F7FF] border border-[#DBEAFE]' : 'bg-gradient-to-br from-[#F8F9FB] to-white border border-[#E5E7EB]'}`}>
                                                {/* Subtle dot grid */}
                                                <div
                                                    className="absolute inset-0 opacity-[0.035]"
                                                    style={{
                                                        backgroundImage: 'radial-gradient(circle, #2563EB 1px, transparent 0)',
                                                        backgroundSize: '32px 32px'
                                                    }}
                                                />
                                                {/* Decorative circles */}
                                                <div className="absolute top-5 right-5 w-20 h-20 rounded-full border border-[#2563EB]/10 bg-[#2563EB]/5" />
                                                <div className="absolute bottom-5 left-5 w-12 h-12 rounded-full border border-[#2563EB]/10 bg-[#2563EB]/5" />
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[#2563EB]/5" />
                                                {/* Icon */}
                                                <div className="relative z-10 flex flex-col items-center gap-5">
                                                    <div className="w-24 h-24 rounded-3xl bg-white shadow-xl shadow-[#2563EB]/10 border border-[#E5E7EB]/80 flex items-center justify-center">
                                                        <IconComponent className="w-12 h-12 text-[#2563EB]" />
                                                    </div>
                                                    <div className="flex gap-2 items-center">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]/25" />
                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]/60" />
                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]/25" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </section>
                        );
                    })}
                </div>

                {/* CTA */}
                <section ref={ctaRef} className="w-full bg-[#F3F4F6] py-12 md:py-20 px-6 md:px-12 border-t border-[#E5E7EB]">
                    <div className="max-w-[700px] mx-auto text-center">
                        <h2 className="text-[28px] md:text-[36px] font-medium text-[#111827] mb-5">{ctaTitle}</h2>
                        {ctaDescription && (
                            <p className="text-[16px] text-[#6B7280] mb-8">{ctaDescription}</p>
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
