"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ChevronDown, Menu, X, ChevronRight } from 'lucide-react';
import type { SiteSettings, UIStrings } from '@/types/sanity';
import { getImageUrl } from '@/sanity/lib/image';
import { LanguageSwitcher, LanguageSwitcherMobile } from '@/components/language-switcher';

interface NavigationHeaderProps {
  siteSettings?: SiteSettings | null;
  uiStrings?: UIStrings | null;
}

export default function NavigationHeader({ siteSettings, uiStrings }: NavigationHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = React.useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Use CMS data or return null/skeleton if critical data is missing
  const siteName = siteSettings?.siteName;
  const logoText = siteSettings?.logoText;
  const logoImage = siteSettings?.logo;
  const logoUrl = logoImage ? getImageUrl(logoImage, { width: 36, height: 36 }) : null;

  const navItems = siteSettings?.navItems || [];
  const navCTA = siteSettings?.navCTA;

  // New mobile fields
  const mobileSecondaryLinks = siteSettings?.mobileSecondaryLinks || [];
  const mobileFooterText = siteSettings?.mobileFooterText;

  // UI Strings
  const mobileMenuOpenLabel = uiStrings?.mobileMenuOpenLabel;
  const mobileMenuCloseLabel = uiStrings?.mobileMenuCloseLabel;
  const navigationBackLabel = uiStrings?.navigationBackLabel;
  const logoAriaLabel = uiStrings?.logoAriaLabel;

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

    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.6 },
        "-=0.3"
      );
    }
  }, []);

  return (
    <>
      <nav ref={navRef} className="sticky top-0 z-50 w-full bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E5E7EB]">
        <div className="relative flex h-[72px] items-center justify-between px-6 md:px-12 max-w-[1400px] mx-auto">
          <div ref={logoRef} className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3" aria-label={logoAriaLabel}>
              {logoUrl && (
                <Image
                  src={logoUrl}
                  alt={siteName || ''}
                  width={36}
                  height={36}
                  className="rounded"
                />
              )}
              {!logoUrl && logoText && (
                <div className="w-9 h-9 border border-[#2563EB]/30 rounded flex items-center justify-center bg-[#2563EB]/5">
                  <span className="text-[#2563EB] font-display font-semibold text-lg tracking-tight">{logoText}</span>
                </div>
              )}
              {siteName && (
                <span className="text-[17px] font-display font-semibold text-[#0A1A2F] tracking-tight">{siteName}</span>
              )}
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
                    <button className="flex items-center h-[72px] px-5 relative hover:text-[#2563EB] transition-colors gap-1.5">
                      <span className="text-[14px] font-medium text-[#6B7280] hover:text-[#111827] transition-colors">{item.text}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF]" />
                    </button>
                    {isSolutionsOpen && item.dropdownItems && (
                      <div className="absolute top-full left-0 w-56 bg-white border border-[#E5E7EB] rounded-lg shadow-lg py-2 mt-0">
                        {item.dropdownItems.map((dropdownItem, dropIndex) => (
                          <Link key={dropIndex} href={dropdownItem.href} className="block px-4 py-3 hover:bg-[#F8F9FB] transition-colors">
                            <span className="text-[14px] font-medium text-[#111827]">{dropdownItem.text}</span>
                            {dropdownItem.description && (
                              <p className="text-[12px] text-[#6B7280] mt-0.5">{dropdownItem.description}</p>
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

            {/* Language Switcher - Desktop */}
            <div className="hidden lg:flex items-center ml-6">
              <LanguageSwitcher />
            </div>

            {navCTA && (
              <div ref={ctaRef} className="hidden lg:flex items-center ml-6 gap-5">
                <div className="w-px h-5 bg-[#E5E7EB]" />
                <Link
                  href={navCTA.href}
                  className="bg-[#2563EB] text-white px-5 py-2.5 rounded-md text-[13px] font-semibold hover:bg-[#1E3A8A] transition-colors"
                >
                  {navCTA.text}
                </Link>
              </div>
            )}

            <div className="lg:hidden ml-4 relative z-50">
              <button
                onClick={toggleMobileMenu}
                className="p-2 -mr-2 text-[#111827] focus:outline-none"
                aria-label={isMobileMenuOpen ? mobileMenuCloseLabel : mobileMenuOpenLabel}
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

            {/* Main Navigation Items */}
            <div className="flex flex-col">
              {navItems.map((item, index) => (
                <div key={index} className="border-b border-gray-100">
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-6 group"
                  >
                    <span className="text-[25px] font-display font-medium tracking-tight text-[#111827]">{item.text}</span>
                    <ChevronRight className="w-6 h-6 text-[#9CA3AF] group-active:text-[#2563EB] transition-colors" />
                  </Link>
                </div>
              ))}
            </div>

            {/* Language Switcher - Mobile */}
            <div className="mt-8 pb-6 border-b border-gray-100">
              <LanguageSwitcherMobile />
            </div>

            {/* Secondary Navigation Grid */}
            {mobileSecondaryLinks.length > 0 && (
              <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 pb-8">
                {mobileSecondaryLinks.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[#2563EB] text-[15px] font-semibold tracking-tight hover:opacity-80 transition-opacity"
                  >
                    {item.text}
                  </Link>
                ))}
              </div>
            )}

            {/* Mobile Footer */}
            {(mobileFooterText || siteName) && (
              <div className="mt-auto pt-8 border-t border-gray-100">
                {siteName && <p className="text-[12px] text-[#9CA3AF] font-medium mb-1">{siteName.toUpperCase()}</p>}
                {mobileFooterText && (
                  <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
                    {mobileFooterText}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

function NavLink({ text, href }: { text: string; href: string }) {
  return (
    <Link href={href} className="group flex items-center h-[72px] px-5 relative hover:text-[#111827] transition-colors">
      <span className="text-[14px] font-medium text-[#6B7280] group-hover:text-[#111827] transition-colors">{text}</span>
    </Link>
  )
}