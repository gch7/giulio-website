'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Building, Target, Shield, MessageSquare, Layers, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
    {
        icon: Building,
        text: 'Institutional logic applied to private portfolios',
    },
    {
        icon: Target,
        text: 'Strong focus on options flow and structured payoffs',
    },
    {
        icon: Shield,
        text: 'Risk-aware, scenario-driven methodology',
    },
    {
        icon: MessageSquare,
        text: 'Clean communication, no hype or retail noise',
    },
    {
        icon: Layers,
        text: 'A growing ecosystem: research, Discord, and advisory',
    },
];

export default function WhyGammaSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const reasonsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (headerRef.current) {
            gsap.fromTo(
                headerRef.current.children,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        if (reasonsRef.current) {
            gsap.fromTo(
                reasonsRef.current.children,
                { opacity: 0, x: -30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: reasonsRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-white py-12 md:py-24 px-6 md:px-12 border-t border-[#e4e4e7]">
            <div className="max-w-[900px] mx-auto">
                <div ref={headerRef} className="text-center mb-12">
                    <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wide border rounded-full px-3 py-1 text-[#52525b] bg-[#0a0a0b]/5 border-[#0a0a0b]/10 mb-6">
                        Our Difference
                    </span>
                    <h2 className="text-[32px] md:text-[40px] font-medium tracking-[-0.02em] leading-[1.15] text-[#0a0a0b]">
                        Why Gamma Capital
                    </h2>
                </div>

                <div ref={reasonsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reasons.map((reason, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4 p-5 bg-gradient-to-br from-[#fafafa] to-white border border-[#e4e4e7] rounded-xl hover:border-[#0d9488]/30 hover:shadow-sm transition-all duration-200"
                        >
                            <div className="w-10 h-10 bg-[#0d9488]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <reason.icon className="w-5 h-5 text-[#0d9488]" />
                            </div>
                            <div className="flex-1 pt-2">
                                <span className="text-[15px] text-[#3f3f46] font-medium leading-relaxed">{reason.text}</span>
                            </div>
                            <div className="flex-shrink-0 pt-2">
                                <Check className="w-4 h-4 text-[#0d9488]" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
