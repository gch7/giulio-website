'use client';

import Link from 'next/link';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (columnsRef.current) {
      gsap.fromTo(
        columnsRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    gsap.fromTo(
      bottomRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bottomRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#0a0a0b] border-t border-[#1a1a1d] text-white">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 py-16">
        <div ref={columnsRef} className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 border border-[#c9a227]/30 rounded flex items-center justify-center bg-[#c9a227]/5">
                <span className="text-[#c9a227] font-semibold text-base tracking-tight">Γ</span>
              </div>
              <span className="text-[15px] font-semibold text-white tracking-tight">Gamma Capital</span>
            </Link>
            <p className="text-[13px] text-[#52525b] leading-relaxed">
              Institutional-grade market intelligence and strategic advisory for sophisticated investors.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-[11px] font-semibold text-[#52525b] uppercase tracking-wider mb-1">Solutions</h3>
            <div className="flex flex-col gap-2.5">
              <Link href="/solutions/strategy-insights" className="text-[13px] font-medium text-[#a1a1aa] hover:text-white transition-colors">
                Strategy Insights
              </Link>
              <Link href="/memberships" className="text-[13px] font-medium text-[#a1a1aa] hover:text-white transition-colors">
                Discord Memberships
              </Link>
              <Link href="/consulting" className="text-[13px] font-medium text-[#a1a1aa] hover:text-white transition-colors">
                Consulting
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-[11px] font-semibold text-[#52525b] uppercase tracking-wider mb-1">Company</h3>
            <div className="flex flex-col gap-2.5">
              <Link href="/contact" className="text-[13px] font-medium text-[#a1a1aa] hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-[11px] font-semibold text-[#52525b] uppercase tracking-wider mb-1">Connect</h3>
            <div className="flex flex-col gap-2.5">
              <a href="mailto:contact@gammacapital.com" className="text-[13px] font-medium text-[#a1a1aa] hover:text-white transition-colors">
                contact@gammacapital.com
              </a>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-[#1a1a1d] mb-8"></div>

        <div ref={bottomRef} className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] text-[#52525b]">
            © 2024 Gamma Capital. All rights reserved.
          </p>
          <p className="text-[11px] text-[#3f3f46] max-w-2xl text-center md:text-right leading-relaxed">
            Disclaimer: The information provided is for educational purposes only and should not be considered financial advice. Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </footer>
  );
}