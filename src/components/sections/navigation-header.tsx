"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ChevronDown, Menu, X, Search, ChevronRight } from 'lucide-react';
import type { SiteSettings, NavItem } from '@/types/sanity';
import { urlFor } from '@/sanity/lib/image';

// Default navigation data (fallback)
const defaultNavItems: NavItem[] = [
  {
    text: 'Solutions',
    href: '/solutions',
    hasDropdown: true,
    dropdownItems: [
      { text: 'Strategy Insights', description: 'Market Intelligence', href: '/solutions/strategy-insights' },
      { text: 'Memberships', description: 'Join our community', href: '/memberships' },
      { text: 'Consulting', description: 'Expert guidance', href: '/consulting' },
    ],
  },
  { text: 'Memberships', href: '/memberships' },
  { text: 'Consulting', href: '/consulting' },
  { text: 'Contact', href: '/contact' },
];

const secondaryNavItems = [
  { text: 'Intelligence', href: '/solutions/strategy-insights' },
  { text: 'Contact Us', href: '/contact' },
  { text: 'Community', href: '/memberships' },
];

const defaultNavCTA = { text: 'Get Started', href: '/contact' };

interface NavigationHeaderProps {
  siteSettings?: SiteSettings | null;
}

export default function NavigationHeader({ siteSettings }: NavigationHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = React.useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Use CMS data or fallback
  const siteName = siteSettings?.siteName || 'GAMMA CAPITAL';
  const logoText = siteSettings?.logoText || 'Γ';
  const navItems = siteSettings?.navItems || defaultNavItems;
  const navCTA = siteSettings?.navCTA || defaultNavCTA;
  const logoImage = siteSettings?.logo;

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

  // Find dropdown items for "Solutions" nav item
  const solutionsNavItem = navItems.find(item => item.hasDropdown);

  return (
    <>
      <nav ref={navRef} className="sticky top-0 z-50 w-full bg-[#fafafa]/95 backdrop-blur-md border-b border-[#e4e4e7]">
        <div className="relative flex h-[72px] items-center justify-between px-6 md:px-12 max-w-[1400px] mx-auto">
          <div ref={logoRef} className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3">
              {logoImage ? (
                <Image
                  src={urlFor(logoImage).width(36).height(36).url()}
                  alt={siteName}
                  width={36}
                  height={36}
                  className="rounded"
                />
              ) : (
                <div className="w-9 h-9 border border-[#0d9488]/30 rounded flex items-center justify-center bg-[#0d9488]/5">
                  <span className="text-[#0d9488] font-semibold text-lg tracking-tight">{logoText}</span>
                </div>
              )}
              <span className="text-[17px] font-semibold text-[#0a0a0b] tracking-tight">{siteName}</span>
            </Link>
          </div>

          <div className="flex items-center justify-end flex-1 pl-8">
            <div ref={linksRef} className="hidden lg:flex items-center h-full gap-0">
              {navItems.map((item, index) => (
                item.hasDropdown ? (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => setIsSolutionsOpen(true)}
                    onMouseLeave={() => setIsSolutionsOpen(false)}
                  >
                    <button className="flex items-center h-[72px] px-5 relative hover:text-[#0a0a0b] transition-colors gap-1.5">
                      <span className="text-[14px] font-medium text-[#52525b] hover:text-[#0a0a0b] transition-colors">{item.text}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-[#a1a1aa]" />
                    </button>
                    {isSolutionsOpen && item.dropdownItems && (
                      <div className="absolute top-full left-0 w-56 bg-white border border-[#e4e4e7] rounded-lg shadow-lg py-2 mt-0">
                        {item.dropdownItems.map((dropdownItem, dropIndex) => (
                          <Link key={dropIndex} href={dropdownItem.href} className="block px-4 py-3 hover:bg-[#f4f4f5] transition-colors">
                            <span className="text-[14px] font-medium text-[#0a0a0b]">{dropdownItem.text}</span>
                            {dropdownItem.description && (
                              <p className="text-[12px] text-[#71717a] mt-0.5">{dropdownItem.description}</p>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink key={index} text={item.text} href={item.href} />
                )
              ))}
            </div>

            <div ref={ctaRef} className="hidden lg:flex items-center ml-8 gap-5">
              <div className="w-px h-5 bg-[#e4e4e7]" />
              <Link
                href={navCTA.href}
                className="bg-[#0a0a0b] text-white px-5 py-2.5 rounded-md text-[13px] font-semibold hover:bg-[#27272a] transition-colors"
              >
                {navCTA.text}
              </Link>
            </div>

            <div className="lg:hidden ml-4 relative z-50">
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
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-0 bottom-0 top-[72px] z-[100] bg-white lg:hidden overflow-y-auto">
          <div className="flex flex-col min-h-full px-8 pt-6 pb-12 bg-white">
            {/* Search Bar */}
            <div className="relative mb-8">
              <div className="flex items-center border-b border-[#0d9488]/20 pb-3">
                <Search className="w-5 h-5 text-[#0d9488]/60" />
                <input
                  type="text"
                  placeholder="Find insights..."
                  className="bg-transparent border-none outline-none flex-1 ml-4 text-[17px] placeholder-[#0d9488]/30 font-medium text-[#0a0a0b]"
                  autoFocus
                />
              </div>
            </div>

            {/* Main Navigation Items */}
            <div className="flex flex-col">
              {navItems.map((item, index) => (
                <div key={index} className="border-b border-gray-100">
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-6 group"
                  >
                    <span className="text-[25px] font-medium tracking-tight text-[#0a0a0b]">{item.text}</span>
                    <ChevronRight className="w-6 h-6 text-[#a1a1aa] group-active:text-[#0d9488] transition-colors" />
                  </Link>

                  {/* Optional: Brief sub-links hint if it has dropdown */}
                  {item.hasDropdown && item.dropdownItems && (
                    <div className="flex flex-wrap gap-x-4 gap-y-2 pb-4">
                      {item.dropdownItems.slice(0, 2).map((sub, i) => (
                        <Link
                          key={i}
                          href={sub.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-[13px] text-[#71717a] font-medium hover:text-[#0d9488] transition-colors"
                        >
                          {sub.text}
                        </Link>
                      ))}
                      {item.dropdownItems.length > 2 && (
                        <span className="text-[13px] text-[#a1a1aa]">...</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Secondary Navigation Grid */}
            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 pb-8">
              {secondaryNavItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#0d9488] text-[15px] font-semibold tracking-tight hover:opacity-80 transition-opacity"
                >
                  {item.text}
                </Link>
              ))}
            </div>

            <div className="mt-auto pt-8 border-t border-gray-100">
              <p className="text-[12px] text-[#a1a1aa] font-medium mb-1">GAMMA CAPITAL</p>
              <p className="text-[11px] text-[#a1a1aa] leading-relaxed">
                Institutional-grade market intelligence.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function NavLink({ text, href }: { text: string; href: string }) {
  return (
    <Link href={href} className="group flex items-center h-[72px] px-5 relative hover:text-[#0a0a0b] transition-colors">
      <span className="text-[14px] font-medium text-[#52525b] group-hover:text-[#0a0a0b] transition-colors">{text}</span>
    </Link>
  )
}