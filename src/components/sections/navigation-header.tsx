"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ChevronDown, Menu, X } from 'lucide-react';

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
    <nav ref={navRef} className="sticky top-0 z-50 w-full bg-[#fafafa]/95 backdrop-blur-md border-b border-[#e4e4e7]">
      <div className="relative flex h-[72px] items-center justify-between px-6 md:px-12 max-w-[1400px] mx-auto">
        <div ref={logoRef} className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 border border-[#0d9488]/30 rounded flex items-center justify-center bg-[#0d9488]/5">
              <span className="text-[#0d9488] font-semibold text-lg tracking-tight">Γ</span>
            </div>
            <span className="text-[17px] font-semibold text-[#0a0a0b] tracking-tight">Gamma Capital</span>
          </Link>
        </div>

        <div className="flex items-center justify-end flex-1 pl-8">
          <div ref={linksRef} className="hidden lg:flex items-center h-full gap-0">
            <div 
              className="relative"
              onMouseEnter={() => setIsSolutionsOpen(true)}
              onMouseLeave={() => setIsSolutionsOpen(false)}
            >
              <button className="flex items-center h-[72px] px-5 relative hover:text-[#0a0a0b] transition-colors gap-1.5">
                <span className="text-[14px] font-medium text-[#52525b] hover:text-[#0a0a0b] transition-colors">Solutions</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#a1a1aa]" />
              </button>
              {isSolutionsOpen && (
                <div className="absolute top-full left-0 w-56 bg-white border border-[#e4e4e7] rounded-lg shadow-lg py-2 mt-0">
                  <Link href="/solutions/strategy-insights" className="block px-4 py-3 hover:bg-[#f4f4f5] transition-colors">
                    <span className="text-[14px] font-medium text-[#0a0a0b]">Strategy Insights</span>
                    <p className="text-[12px] text-[#71717a] mt-0.5">Market Intelligence</p>
                  </Link>
                  <Link href="/memberships" className="block px-4 py-3 hover:bg-[#f4f4f5] transition-colors">
                    <span className="text-[14px] font-medium text-[#0a0a0b]">Discord Memberships</span>
                    <p className="text-[12px] text-[#71717a] mt-0.5">Join our community</p>
                  </Link>
                  <Link href="/consulting" className="block px-4 py-3 hover:bg-[#f4f4f5] transition-colors">
                    <span className="text-[14px] font-medium text-[#0a0a0b]">Consulting</span>
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
            <div className="w-px h-5 bg-[#e4e4e7]" />
            <Link 
              href="/contact" 
              className="bg-[#0a0a0b] text-white px-5 py-2.5 rounded-md text-[13px] font-semibold hover:bg-[#27272a] transition-colors"
            >
              Get Started
            </Link>
          </div>

          <div className="lg:hidden ml-4">
            <button 
              onClick={toggleMobileMenu}
              className="p-2 -mr-2 text-[#0a0a0b] focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[73px] z-40 bg-[#fafafa] border-t border-[#e4e4e7] lg:hidden overflow-y-auto">
          <div className="flex flex-col p-6 space-y-6">
            <div className="flex flex-col space-y-1">
              <MobileNavLink href="/" text="Home" />
              <div className="py-3">
                <span className="text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider">Solutions</span>
                <div className="mt-3 flex flex-col space-y-1">
                  <MobileNavLink href="/solutions/strategy-insights" text="Strategy Insights" />
                  <MobileNavLink href="/memberships" text="Discord Memberships" />
                  <MobileNavLink href="/consulting" text="Consulting" />
                </div>
              </div>
              <MobileNavLink href="/contact" text="Contact" />
            </div>

            <div className="h-px bg-[#e4e4e7] w-full" />

            <Link 
              href="/contact" 
              className="bg-[#0a0a0b] text-white px-5 py-3.5 rounded-md text-[14px] font-semibold text-center hover:bg-[#27272a] transition-colors"
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
    <Link href={href} className="group flex items-center h-[72px] px-5 relative hover:text-[#0a0a0b] transition-colors">
      <span className="text-[14px] font-medium text-[#52525b] group-hover:text-[#0a0a0b] transition-colors">{text}</span>
    </Link>
  )
}

function MobileNavLink({ text, href }: { text: string; href: string }) {
  return (
    <Link href={href} className="block text-[16px] font-medium py-2.5 text-[#52525b] hover:text-[#0a0a0b] transition-colors">
      {text}
    </Link>
  )
}