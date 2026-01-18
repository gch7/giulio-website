'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Globe, Layers, TrendingUp, Building2, Coins, type LucideIcon } from 'lucide-react';
import type { MultiAssetSectionData } from '@/types/sanity';

gsap.registerPlugin(ScrollTrigger);

// Icon mapping for CMS-driven icons
const iconMap: Record<string, LucideIcon> = {
    TrendingUp,
    Layers,
    Globe,
    Building2,
    Coins,
};

// Default data removed
const defaultAssetClasses: { icon: string; label: string }[] = [];

interface MultiAssetSectionProps {
    data?: MultiAssetSectionData;
}

export default function MultiAssetSection({ data }: MultiAssetSectionProps) {
    // Extract CMS data with fallbacks
    const badge = data?.badge ?? 'Cross-Asset Expertise';
    const title = data?.title ?? 'A Multi-Asset, Institutional Perspective';
    const description = data?.description ?? 'Gamma Capital operates across multiple asset classes, including equities, derivatives, structured products, real estate and digital assets.';
    const secondaryDescription = data?.secondaryDescription ?? 'This cross-asset perspective allows us to identify hidden correlations, structural inefficiencies and opportunities that remain invisible within single-asset approaches.';
    const assetClasses = data?.assetClasses || [];

    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const assetsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (contentRef.current) {
            gsap.fromTo(
                contentRef.current.children,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        if (assetsRef.current) {
            gsap.fromTo(
                assetsRef.current.children,
                { opacity: 0, scale: 0.9 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: assetsRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-[#F8F9FB] py-12 md:py-24 px-6 md:px-12 border-t border-[#E5E7EB]">
            <div className="max-w-[1000px] mx-auto">
                <div ref={contentRef} className="text-center">
                    <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wide border rounded-full px-3 py-1 text-[#6B7280] bg-white border-[#E5E7EB] mb-6">
                        {badge}
                    </span>
                    <h2 className="text-[32px] md:text-[40px] font-display font-medium tracking-[-0.02em] leading-[1.15] text-[#111827] mb-6">
                        {title}
                    </h2>
                    <p className="text-[16px] md:text-[17px] text-[#6B7280] max-w-3xl mx-auto leading-relaxed mb-4">
                        {description}
                    </p>
                    <p className="text-[16px] md:text-[17px] text-[#6B7280] max-w-3xl mx-auto leading-relaxed mb-4">
                        {secondaryDescription}
                    </p>
                </div>

                {/* Asset Class Pills */}
                <div ref={assetsRef} className="flex flex-wrap justify-center gap-3 mt-12">
                    {assetClasses.map((asset, index) => {
                        const IconComponent = iconMap[asset.icon ?? ''] ?? Globe;
                        return (
                            <div
                                key={index}
                                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-full hover:border-[#2563EB]/30 hover:shadow-sm transition-all duration-200"
                            >
                                <IconComponent className="w-4 h-4 text-[#2563EB]" />
                                <span className="text-[14px] font-medium text-[#374151]">{asset.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
