"use client";

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import NavigationHeader from "@/components/sections/navigation-header";
import Footer from "@/components/sections/footer";
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen bg-[#fafafa]">
      <NavigationHeader />
      <main className="flex items-center justify-center min-h-[80vh] px-6">
        <div ref={containerRef} className="max-w-md w-full text-center">
          {loading ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 text-[#0d9488] animate-spin" />
              <p className="text-[#71717a]">Processing your payment...</p>
            </div>
          ) : (
            <>
              <div ref={iconRef} className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#0d9488]/10 mb-6">
                <CheckCircle className="w-10 h-10 text-[#0d9488]" strokeWidth={1.5} />
              </div>
              
              <h1 ref={titleRef} className="text-[32px] font-semibold text-[#0a0a0b] mb-4">
                Welcome to the Community!
              </h1>
              
              <div ref={textRef} className="space-y-4 mb-8">
                <p className="text-[#71717a] text-[16px] leading-relaxed">
                  Your membership has been activated successfully. You&apos;ll receive an email with your exclusive Discord invite link within 24 hours.
                </p>
                {sessionId && (
                  <p className="text-[12px] text-[#a1a1aa] font-mono">
                    Order reference: {sessionId.slice(0, 20)}...
                  </p>
                )}
              </div>

              <div ref={buttonRef} className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link 
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0a0a0b] text-white hover:bg-[#27272a] h-11 px-6 text-sm font-medium transition"
                >
                  Return Home
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-[#0a0a0b] border border-[#e4e4e7] hover:bg-[#f4f4f5] h-11 px-6 text-sm font-medium transition"
                >
                  Contact Support
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
