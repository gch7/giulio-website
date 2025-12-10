"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function NavigationHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = React.useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(
      logoRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8 }
    );

    if (linksRef.current) {
      tl.fromTo(
        linksRef.current.children,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        "-=0.4"
      );
    }

    tl.fromTo(
      ctaRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.6 },
      "-=0.3"
    );
  }, []);

  return (
    <nav ref={navRef} className="sticky top-0 z-50 w-full bg-[#0a0a0b]/95 backdrop-blur-md border-b border-[#27272a]">
      <div className="relative flex h-[72px] items-center justify-between px-6 md:px-12 max-w-[1400px] mx-auto">
        <div ref={logoRef} className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 border border-[#c9a227]/30 rounded flex items-center justify-center bg-[#c9a227]/5">
              <span className="text-[#c9a227] font-semibold text-lg tracking-tight">Γ</span>
            </div>
            <span className="text-[17px] font-semibold text-white tracking-tight">Gamma Capital</span>
          </Link>
        </div>

        <div className="flex items-center justify-end flex-1 pl-8">
          <div ref={linksRef} className="hidden lg:flex items-center h-full gap-0">
            <div 
              className="relative"
              onMouseEnter={() => setIsSolutionsOpen(true)}
              onMouseLeave={() => setIsSolutionsOpen(false)}
            >
              <button className="flex items-center h-[72px] px-5 relative hover:text-white transition-colors gap-1.5">
                <span className="text-[14px] font-medium text-[#a1a1aa] hover:text-white transition-colors">Solutions</span>
                <ChevronDown />
              </button>
              {isSolutionsOpen && (
                <div className="absolute top-full left-0 w-56 bg-[#111113] border border-[#27272a] rounded-lg shadow-2xl py-2 mt-0">
                  <Link href="/solutions/strategy-insights" className="block px-4 py-3 hover:bg-[#1a1a1d] transition-colors">
                    <span className="text-[14px] font-medium text-white">Strategy Insights</span>
                    <p className="text-[12px] text-[#71717a] mt-0.5">Market Intelligence</p>
                  </Link>
                  <Link href="/memberships" className="block px-4 py-3 hover:bg-[#1a1a1d] transition-colors">
                    <span className="text-[14px] font-medium text-white">Discord Memberships</span>
                    <p className="text-[12px] text-[#71717a] mt-0.5">Join our community</p>
                  </Link>
                  <Link href="/consulting" className="block px-4 py-3 hover:bg-[#1a1a1d] transition-colors">
                    <span className="text-[14px] font-medium text-white">Consulting</span>
                    <p className="text-[12px] text-[#71717a] mt-0.5">Expert guidance</p>
                  </Link>
                </div>
              )}
            </div>

            <NavLink text="Memberships" href="/memberships" />
            <NavLink text="Consulting" href="/consulting" />
            <NavLink text="Contact" href="/contact" />
          </div>

          <div ref={ctaRef} className="hidden lg:flex items-center ml-8 gap-5">
            <div className="w-px h-5 bg-[#27272a]" />
            <Link 
              href="/contact" 
              className="bg-white text-[#0a0a0b] px-5 py-2.5 rounded-md text-[13px] font-semibold hover:bg-[#e4e4e7] transition-colors"
            >
              Get Started
            </Link>
          </div>

          <div className="lg:hidden ml-4">
            <button 
              onClick={toggleMobileMenu}
              className="p-2 -mr-2 text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="6" width="16" height="1.5" fill="currentColor" rx="0.75"/>
                <rect x="4" y="11.25" width="16" height="1.5" fill="currentColor" rx="0.75"/>
                <rect x="4" y="16.5" width="16" height="1.5" fill="currentColor" rx="0.75"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[73px] z-40 bg-[#0a0a0b] border-t border-[#27272a] lg:hidden overflow-y-auto">
          <div className="flex flex-col p-6 space-y-6">
            <div className="flex flex-col space-y-1">
              <MobileNavLink href="/" text="Home" />
              <div className="py-3">
                <span className="text-[11px] font-semibold text-[#52525b] uppercase tracking-wider">Solutions</span>
                <div className="mt-3 flex flex-col space-y-1">
                  <MobileNavLink href="/solutions/strategy-insights" text="Strategy Insights" />
                  <MobileNavLink href="/memberships" text="Discord Memberships" />
                  <MobileNavLink href="/consulting" text="Consulting" />
                </div>
              </div>
              <MobileNavLink href="/contact" text="Contact" />
            </div>

            <div className="h-px bg-[#27272a] w-full" />

            <Link 
              href="/contact" 
              className="bg-white text-[#0a0a0b] px-5 py-3.5 rounded-md text-[14px] font-semibold text-center hover:bg-[#e4e4e7] transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

function NavLink({ text, href }: { text: string; href: string }) {
  return (
    <Link href={href} className="group flex items-center h-[72px] px-5 relative hover:text-white transition-colors">
      <span className="text-[14px] font-medium text-[#a1a1aa] group-hover:text-white transition-colors">{text}</span>
    </Link>
  )
}

function ChevronDown() {
  return (
    <svg className="w-3.5 h-3.5 text-[#52525b]" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 4.5L6 7.5L9 4.5" />
    </svg>
  )
}

function MobileNavLink({ text, href }: { text: string; href: string }) {
  return (
    <Link href={href} className="block text-[16px] font-medium py-2.5 text-[#a1a1aa] hover:text-white transition-colors">
      {text}
    </Link>
  )
}