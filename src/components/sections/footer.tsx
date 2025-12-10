'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Mail, Linkedin, Twitter } from 'lucide-react';
import type { SiteSettings } from '@/types/sanity';
import { urlFor } from '@/sanity/lib/image';

gsap.registerPlugin(ScrollTrigger);

// Discord icon component
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

// Social icon mapping
const socialIconMap: Record<string, React.FC<{ className?: string }>> = {
  twitter: ({ className }) => <Twitter className={className} />,
  linkedin: ({ className }) => <Linkedin className={className} />,
  discord: DiscordIcon,
  email: ({ className }) => <Mail className={className} />,
};

// Default footer data (fallback)
const defaultFooterData = {
  siteName: 'Gamma Capital',
  logoText: 'Γ',
  footerDescription: 'Institutional-grade market intelligence and strategic advisory for sophisticated investors.',
  socialLinks: [
    { platform: 'twitter' as const, url: '#' },
    { platform: 'linkedin' as const, url: '#' },
  ],
  footerColumns: [
    {
      title: 'Solutions',
      links: [
        { text: 'Strategy Insights', href: '/solutions/strategy-insights' },
        { text: 'Discord Memberships', href: '/memberships' },
        { text: 'Consulting', href: '/consulting' },
      ],
    },
    {
      title: 'Company',
      links: [{ text: 'Contact', href: '/contact' }],
    },
  ],
  contactEmail: 'contact@gammacapital.com',
  copyrightText: '© 2024 Gamma Capital. All rights reserved.',
  disclaimer: 'Disclaimer: The information provided is for educational purposes only and should not be considered financial advice. Past performance is not indicative of future results.',
};

interface FooterProps {
  siteSettings?: SiteSettings | null;
}

export default function Footer({ siteSettings }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Use CMS data or fallback
  const siteName = siteSettings?.siteName || defaultFooterData.siteName;
  const logoText = siteSettings?.logoText || defaultFooterData.logoText;
  const logoImage = siteSettings?.logo;
  const footerDescription = siteSettings?.footerDescription || defaultFooterData.footerDescription;
  const socialLinks = siteSettings?.socialLinks || defaultFooterData.socialLinks;
  const footerColumns = siteSettings?.footerColumns || defaultFooterData.footerColumns;
  const contactEmail = siteSettings?.contactEmail || defaultFooterData.contactEmail;
  const copyrightText = siteSettings?.copyrightText || defaultFooterData.copyrightText;
  const disclaimer = siteSettings?.disclaimer || defaultFooterData.disclaimer;

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
    <footer ref={footerRef} className="bg-[#fafafa] border-t border-[#e4e4e7] text-[#0a0a0b]">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 py-16">
        <div ref={columnsRef} className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-2">
              {logoImage ? (
                <Image
                  src={urlFor(logoImage).width(32).height(32).url()}
                  alt={siteName}
                  width={32}
                  height={32}
                  className="rounded"
                />
              ) : (
                <div className="w-8 h-8 border border-[#0d9488]/30 rounded flex items-center justify-center bg-[#0d9488]/5">
                  <span className="text-[#0d9488] font-semibold text-base tracking-tight">{logoText}</span>
                </div>
              )}
              <span className="text-[15px] font-semibold text-[#0a0a0b] tracking-tight">{siteName}</span>
            </Link>
            <p className="text-[13px] text-[#a1a1aa] leading-relaxed">
              {footerDescription}
            </p>
            <div className="flex items-center gap-3 mt-2">
              {socialLinks.map((social, index) => {
                const IconComponent = socialIconMap[social.platform] || Twitter;
                const href = social.platform === 'email' ? `mailto:${social.url}` : social.url;
                return (
                  <a
                    key={index}
                    href={href}
                    className="w-8 h-8 border border-[#e4e4e7] rounded-lg flex items-center justify-center hover:border-[#0d9488]/50 hover:bg-[#0d9488]/5 transition-colors"
                    target={social.platform !== 'email' ? '_blank' : undefined}
                    rel={social.platform !== 'email' ? 'noopener noreferrer' : undefined}
                  >
                    <IconComponent className="w-4 h-4 text-[#71717a] hover:text-[#0d9488]" />
                  </a>
                );
              })}
            </div>
          </div>

          {footerColumns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-4">
              <h3 className="text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider mb-1">{column.title}</h3>
              <div className="flex flex-col gap-2.5">
                {column.links?.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    href={link.href}
                    className="text-[13px] font-medium text-[#52525b] hover:text-[#0a0a0b] transition-colors"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-4">
            <h3 className="text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider mb-1">Connect</h3>
            <div className="flex flex-col gap-2.5">
              <a href={`mailto:${contactEmail}`} className="text-[13px] font-medium text-[#52525b] hover:text-[#0a0a0b] transition-colors flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                {contactEmail}
              </a>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-[#e4e4e7] mb-8"></div>

        <div ref={bottomRef} className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] text-[#a1a1aa]">
            {copyrightText}
          </p>
          <p className="text-[11px] text-[#a1a1aa] max-w-2xl text-center md:text-right leading-relaxed">
            {disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}