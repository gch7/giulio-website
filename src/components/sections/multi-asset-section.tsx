'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Globe, Layers, TrendingUp, Building2, Coins } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const assetClasses = [
    { icon: TrendingUp, label: 'Equities' },
    { icon: Layers, label: 'Derivatives' },
    { icon: Globe, label: 'Structured Products' },
    { icon: Building2, label: 'Real Estate' },
    { icon: Coins, label: 'Digital Assets' },
];

export default function MultiAssetSection() {
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
        <section ref={sectionRef} className="w-full bg-[#fafafa] py-12 md:py-24 px-6 md:px-12 border-t border-[#e4e4e7]">
            <div className="max-w-[1000px] mx-auto">
                <div ref={contentRef} className="text-center">
                    <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wide border rounded-full px-3 py-1 text-[#52525b] bg-white border-[#e4e4e7] mb-6">
                        Cross-Asset Expertise
                    </span>
                    <h2 className="text-[32px] md:text-[40px] font-medium tracking-[-0.02em] leading-[1.15] text-[#0a0a0b] mb-6">
                        A Multi-Asset, Institutional Perspective
                    </h2>
                    <p className="text-[16px] md:text-[17px] text-[#71717a] max-w-3xl mx-auto leading-relaxed mb-4">
                        Gamma Capital operates across multiple asset classes, including equities, derivatives, structured products, real estate and digital assets.
                    </p>
                    <p className="text-[16px] md:text-[17px] text-[#71717a] max-w-3xl mx-auto leading-relaxed mb-4">
                        This cross-asset perspective allows us to identify hidden correlations, structural inefficiencies and opportunities that remain invisible within single-asset approaches.
                    </p>
                    <p className="text-[16px] md:text-[17px] text-[#52525b] max-w-3xl mx-auto leading-relaxed font-medium">
                        Our work integrates financial markets analysis with real-world asset experience, offering a broader and more resilient strategic view.
                    </p>
                </div>

                {/* Asset Class Pills */}
                <div ref={assetsRef} className="flex flex-wrap justify-center gap-3 mt-12">
                    {assetClasses.map((asset, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#e4e4e7] rounded-full hover:border-[#0d9488]/30 hover:shadow-sm transition-all duration-200"
                        >
                            <asset.icon className="w-4 h-4 text-[#0d9488]" />
                            <span className="text-[14px] font-medium text-[#3f3f46]">{asset.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
