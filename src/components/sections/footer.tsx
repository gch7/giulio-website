'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Mail, Linkedin, Twitter, Facebook, Instagram, Youtube, Github } from 'lucide-react';
import type { SiteSettings } from '@/types/sanity';
import { getImageUrl } from '@/sanity/lib/image';
import { useParams } from 'next/navigation';
import { getLocalizedHref } from '@/lib/utils';

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
  facebook: ({ className }) => <Facebook className={className} />,
  instagram: ({ className }) => <Instagram className={className} />,
  youtube: ({ className }) => <Youtube className={className} />,
  github: ({ className }) => <Github className={className} />,
};

interface FooterProps {
  siteSettings?: SiteSettings | null;
}

export default function Footer({ siteSettings }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const params = useParams();
  const locale = params?.locale as string;

  // Use CMS data or return safe defaults/null
  const siteName = siteSettings?.siteName;
  const logoText = siteSettings?.logoText;
  const logoImage = siteSettings?.logo;
  const logoUrl = logoImage ? getImageUrl(logoImage, { width: 32, height: 32 }) : null;
  const footerDescription = siteSettings?.footerDescription;
  const socialLinks = siteSettings?.socialLinks || [];
  const footerColumns = siteSettings?.footerColumns || [];
  const contactEmail = siteSettings?.contactEmail;
  const copyrightText = siteSettings?.copyrightText;
  const disclaimer = siteSettings?.disclaimer;
  const connectColumnTitle = siteSettings?.connectColumnTitle;

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
    <footer ref={footerRef} className="bg-[#F8F9FB] border-t border-[#E5E7EB] text-[#111827]">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 py-16">
        <div ref={columnsRef} className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-4 md:col-span-1">
            <Link href={getLocalizedHref('/', locale)} className="flex items-center gap-3 mb-2">
              {logoUrl && (
                <Image
                  src={logoUrl}
                  alt={siteName || ''}
                  width={32}
                  height={32}
                  className="rounded"
                />
              )}
              {!logoUrl && logoText && (
                <div className="w-8 h-8 border border-[#2563EB]/30 rounded flex items-center justify-center bg-[#2563EB]/5">
                  <span className="text-[#2563EB] font-display font-semibold text-base tracking-tight">{logoText}</span>
                </div>
              )}
              {siteName && (
                <span className="text-[15px] font-display font-semibold text-[#111827] tracking-tight">{siteName}</span>
              )}
            </Link>
            {footerDescription && (
              <p className="text-[13px] text-[#6B7280] leading-relaxed">
                {footerDescription}
              </p>
            )}
            <div className="flex items-center gap-3 mt-2">
              {socialLinks.map((social, index) => {
                const iconKey = (social.iconName?.toLowerCase() || social.platform?.toLowerCase()) ?? '';
                const IconComponent = socialIconMap[iconKey] || Twitter;
                const href = social.platform === 'email' ? `mailto:${social.url}` : social.url;
                return (
                  <a
                    key={index}
                    href={href}
                    className="w-8 h-8 border border-[#E5E7EB] rounded-lg flex items-center justify-center hover:border-[#2563EB]/50 hover:bg-[#2563EB]/5 transition-colors"
                    target={social.platform !== 'email' ? '_blank' : undefined}
                    rel={social.platform !== 'email' ? 'noopener noreferrer' : undefined}
                  >
                    <IconComponent className="w-4 h-4 text-[#6B7280] hover:text-[#2563EB]" />
                  </a>
                );
              })}
            </div>
          </div>

          {footerColumns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-4">
              <h3 className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1 font-display">{column.title}</h3>
              <div className="flex flex-col gap-2.5">
                {column.links?.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    href={getLocalizedHref(link.href, locale)}
                    className="text-[13px] font-medium text-[#6B7280] hover:text-[#111827] transition-colors"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-4">
            {connectColumnTitle && (
              <h3 className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1 font-display">{connectColumnTitle}</h3>
            )}
            {contactEmail && (
              <div className="flex flex-col gap-2.5">
                <a href={`mailto:${contactEmail}`} className="text-[13px] font-medium text-[#6B7280] hover:text-[#111827] transition-colors flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" />
                  {contactEmail}
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="w-full h-px bg-[#E5E7EB] mb-8"></div>

        <div ref={bottomRef} className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] text-[#9CA3AF]">
            {copyrightText}
          </p>
          <p className="text-[11px] text-[#9CA3AF] max-w-2xl text-center md:text-right leading-relaxed">
            {disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}