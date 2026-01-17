"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import NavigationHeader from "@/components/sections/navigation-header";
import Footer from "@/components/sections/footer";
import { ArrowRight, Shield, Zap, Users } from 'lucide-react';
import {
    translations,
    buildDiscordAuthUrl,
    type SupportedLocale,
    type SupportedGroup,
} from '@/lib/join-config';

interface JoinClientProps {
    locale: SupportedLocale;
    group: SupportedGroup;
}

export default function JoinClient({ locale, group }: JoinClientProps) {
    const t = translations[locale];

    const heroRef = useRef<HTMLElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<HTMLDivElement>(null);

    const handleDiscordConnect = () => {
        const authUrl = buildDiscordAuthUrl(locale, group);
        if (authUrl && authUrl !== '#') {
            window.location.href = authUrl;
        } else {
            console.error('Discord auth endpoint not configured');
        }
    };

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        tl.fromTo(
            badgeRef.current,
            { opacity: 0, y: -10, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.4 }
        )
            .fromTo(
                titleRef.current,
                { opacity: 0, y: 25 },
                { opacity: 1, y: 0, duration: 0.5 },
                "-=0.2"
            )
            .fromTo(
                paragraphRef.current,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4 },
                "-=0.25"
            )
            .fromTo(
                ctaRef.current,
                { opacity: 0, y: 20, scale: 0.98 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5 },
                "-=0.2"
            );

        if (stepsRef.current) {
            gsap.fromTo(
                stepsRef.current.querySelectorAll('.step-item'),
                { opacity: 0, x: -20 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.4,
                    stagger: 0.1,
                    ease: "power2.out",
                    delay: 0.6
                }
            );
        }
    }, []);

    return (
        <div className="min-h-screen bg-[#fafafa]">
            <NavigationHeader />
            <main>
                {/* Hero Section */}
                <section ref={heroRef} className="w-full bg-[#fafafa] py-16 md:py-28 px-6 md:px-12">
                    <div className="max-w-[800px] mx-auto text-center">
                        {/* Badge */}
                        <div ref={badgeRef} className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#5865F2]/10 border border-[#5865F2]/20 rounded-full mb-6 md:mb-8">
                            <svg className="w-4 h-4 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                            </svg>
                            <span className="text-[12px] font-medium text-[#5865F2] tracking-wide uppercase">{t.badge}</span>
                        </div>

                        {/* Title */}
                        <h1 ref={titleRef} className="text-[32px] md:text-[48px] font-display font-medium tracking-[-0.03em] leading-[1.15] mb-6 text-[#111827]">
                            {t.title}<br />
                            <span className="text-[#5865F2]">{t.titleHighlight}</span>
                        </h1>

                        {/* Description */}
                        <p ref={paragraphRef} className="text-[15px] md:text-[18px] text-[#71717a] font-normal leading-relaxed max-w-2xl mx-auto mb-10 md:mb-12">
                            {t.description}
                        </p>

                        {/* CTA Button */}
                        <div ref={ctaRef} className="flex flex-col items-center gap-4">
                            <button
                                onClick={handleDiscordConnect}
                                className="inline-flex items-center justify-center gap-3 bg-[#5865F2] text-white px-8 py-4 rounded-xl text-[16px] font-semibold hover:bg-[#4752C4] transition-all duration-200 shadow-lg shadow-[#5865F2]/20 hover:shadow-xl hover:-translate-y-0.5 group"
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                                </svg>
                                {t.ctaButton}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                            <p className="flex items-center gap-2 text-[13px] text-[#9CA3AF]">
                                <Shield className="w-4 h-4" />
                                {t.ctaSubtext}
                            </p>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="w-full bg-white py-12 md:py-20 px-6 md:px-12 border-t border-[#E5E7EB]">
                    <div className="max-w-[900px] mx-auto">
                        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {/* Step 1 */}
                            <div className="step-item bg-[#F8F9FB] rounded-2xl p-6 border border-[#E5E7EB]">
                                <div className="w-12 h-12 bg-[#5865F2]/10 rounded-xl flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                                    </svg>
                                </div>
                                <div className="text-[11px] font-semibold text-[#5865F2] uppercase tracking-wide mb-2">Step 1</div>
                                <h3 className="text-[17px] font-semibold text-[#111827] mb-2">{t.step1Title}</h3>
                                <p className="text-[14px] text-[#71717a] leading-relaxed">{t.step1Description}</p>
                            </div>

                            {/* Step 2 */}
                            <div className="step-item bg-[#F8F9FB] rounded-2xl p-6 border border-[#E5E7EB]">
                                <div className="w-12 h-12 bg-[#2563EB]/10 rounded-xl flex items-center justify-center mb-4">
                                    <Zap className="w-6 h-6 text-[#2563EB]" />
                                </div>
                                <div className="text-[11px] font-semibold text-[#2563EB] uppercase tracking-wide mb-2">Step 2</div>
                                <h3 className="text-[17px] font-semibold text-[#111827] mb-2">{t.step2Title}</h3>
                                <p className="text-[14px] text-[#71717a] leading-relaxed">{t.step2Description}</p>
                            </div>

                            {/* Step 3 */}
                            <div className="step-item bg-[#F8F9FB] rounded-2xl p-6 border border-[#E5E7EB]">
                                <div className="w-12 h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center mb-4">
                                    <Users className="w-6 h-6 text-[#10B981]" />
                                </div>
                                <div className="text-[11px] font-semibold text-[#10B981] uppercase tracking-wide mb-2">Step 3</div>
                                <h3 className="text-[17px] font-semibold text-[#111827] mb-2">{t.step3Title}</h3>
                                <p className="text-[14px] text-[#71717a] leading-relaxed">{t.step3Description}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Bottom CTA */}
                <section className="w-full bg-gradient-to-b from-[#F8F9FB] to-[#F3F4F6] py-12 md:py-16 px-6 md:px-12 border-t border-[#E5E7EB]">
                    <div className="max-w-[600px] mx-auto text-center">
                        <button
                            onClick={handleDiscordConnect}
                            className="inline-flex items-center justify-center gap-3 bg-[#5865F2] text-white px-8 py-4 rounded-xl text-[15px] font-semibold hover:bg-[#4752C4] transition-all duration-200 shadow-lg shadow-[#5865F2]/20 hover:shadow-xl hover:-translate-y-0.5"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                            </svg>
                            {t.ctaButton}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
