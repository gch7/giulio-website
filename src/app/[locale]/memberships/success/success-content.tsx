"use client";

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import type { UIStrings } from '@/types/sanity';

interface SuccessContentProps {
    uiStrings: UIStrings | null;
}

export function SuccessContent({ uiStrings }: SuccessContentProps) {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [loading, setLoading] = useState(true);

    const containerRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    // CMS Strings with fallbacks
    // CMS is single source of truth - no hardcoded fallbacks
    const title = uiStrings?.membershipSuccessTitle ?? '';
    const message = uiStrings?.membershipSuccessMessage ?? '';
    const processingText = uiStrings?.membershipProcessingText ?? '';
    const orderRefPrefix = uiStrings?.membershipOrderReferencePrefix ?? '';
    const returnHomeText = uiStrings?.membershipReturnHomeButton ?? '';
    const contactSupportText = uiStrings?.membershipContactSupportButton ?? '';

    // Loading Text Fallback (can also be in CMS if needed, currently using systemLoading or hardcoded as per new schema logic)
    // I added membershipProcessingText for this specific state.

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    useGSAP(() => {
        if (loading) return;

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
            iconRef.current,
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, duration: 0.6 }
        )
            .fromTo(
                titleRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6 },
                "-=0.3"
            )
            .fromTo(
                textRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5 },
                "-=0.3"
            )
            .fromTo(
                buttonRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5 },
                "-=0.2"
            );
    }, [loading]);

    return (
        <div ref={containerRef} className="max-w-md w-full text-center">
            {loading ? (
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-[#2563EB] animate-spin" />
                    <p className="text-[#6B7280]">{processingText}</p>
                </div>
            ) : (
                <>
                    <div ref={iconRef} className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#2563EB]/10 mb-6">
                        <CheckCircle className="w-10 h-10 text-[#2563EB]" strokeWidth={1.5} />
                    </div>

                    <h1 ref={titleRef} className="text-[32px] font-semibold text-[#111827] mb-4">
                        {title}
                    </h1>

                    <div ref={textRef} className="space-y-4 mb-8">
                        <p className="text-[#6B7280] text-[16px] leading-relaxed">
                            {message}
                        </p>
                        {sessionId && (
                            <p className="text-[12px] text-[#9CA3AF] font-mono">
                                {orderRefPrefix} {sessionId.slice(0, 20)}...
                            </p>
                        )}
                    </div>

                    <div ref={buttonRef} className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A1A2F] text-white hover:bg-[#1E3A8A] h-11 px-6 text-sm font-medium transition"
                        >
                            {returnHomeText}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-[#111827] border border-[#E5E7EB] hover:bg-[#F3F4F6] h-11 px-6 text-sm font-medium transition"
                        >
                            {contactSupportText}
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}
