'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import NavigationHeader from "@/components/sections/navigation-header";
import Footer from "@/components/sections/footer";
import {
  PieChart,
  Compass,
  TrendingUp,
  Shield,
  Building2,
  Bitcoin,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Target,
  Lightbulb,
  LineChart,
  Layers,
  Map,
  Wallet,
  Activity,
  Zap,
  Briefcase,
  type LucideIcon
} from 'lucide-react';
import type { ConsultingPage, SiteSettings, UIStrings } from '@/types/sanity';

gsap.registerPlugin(ScrollTrigger);

// Icon mapping for CMS-driven icons
const iconMap: Record<string, LucideIcon> = {
  PieChart,
  Compass,
  TrendingUp,
  Shield,
  Building2,
  Bitcoin,
  BarChart3,
  Target,
  Lightbulb,
  LineChart,
  Layers,
  Map,
  Wallet,
  Activity,
  Zap,
  Briefcase,
};

interface ConsultingPageClientProps {
  pageData?: ConsultingPage | null;
  siteSettings?: SiteSettings | null;
  uiStrings?: UIStrings | null;
}

export default function ConsultingPageClient({ pageData, siteSettings, uiStrings }: ConsultingPageClientProps) {
  // Extract CMS data with fallbacks
  const heroBadge = pageData?.heroBadge;
  const heroTitle = pageData?.heroTitle;
  const heroSubtitle = pageData?.heroSubtitle;
  const heroStats = pageData?.heroStats || [];

  const serviceNavTitle = pageData?.serviceNavTitle;
  const serviceNavSubtitle = pageData?.serviceNavSubtitle;

  const serviceNavItems = pageData?.serviceNavItems || [];
  const serviceSections = pageData?.serviceSections || [];

  const ctaTitle = pageData?.ctaTitle;
  const ctaDescription = pageData?.ctaDescription;
  const ctaButtonText = pageData?.ctaButtonText;
  const ctaButtonHref = pageData?.ctaButtonHref;

  const exploreServicesLabel = uiStrings?.exploreServicesLabel;
  const readyToStartBadge = uiStrings?.readyToStartBadge;

  const heroRef = useRef<HTMLElement>(null);
  const navCardsRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('');

  useGSAP(() => {
    // Hero animations
    const heroTl = gsap.timeline({ defaults: { ease: "power2.out" } });

    heroTl.fromTo(
      '.hero-badge',
      { opacity: 0, y: -10, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4 }
    )
      .fromTo(
        '.hero-title',
        { opacity: 0, y: 25, clipPath: "inset(100% 0% 0% 0%)" },
        { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.5 },
        "-=0.2"
      )
      .fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4 },
        "-=0.25"
      )
      .fromTo(
        '.hero-scroll-indicator',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3 },
        "-=0.15"
      );

    // Service nav cards animation
    if (navCardsRef.current) {
      gsap.fromTo(
        navCardsRef.current.children,
        { opacity: 0, y: 20, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: navCardsRef.current,
            start: "top 92%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Animate each service section
    const sections = document.querySelectorAll('.service-section');
    sections.forEach((section) => {
      gsap.fromTo(
        section.querySelector('.section-content'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 92%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(
        section.querySelectorAll('.feature-card'),
        { opacity: 0, y: 15, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = serviceNavItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(serviceNavItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [serviceNavItems]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  // Feature Card Component (Moved inline logic here)
  const FeatureCard = ({ icon, title, desc, accentColor }: { icon?: string | React.ElementType; title: string; desc: string; accentColor?: string }) => {
    const IconComponent = (icon && typeof icon === 'string' ? iconMap[icon] : icon) ?? PieChart;

    // Determine styles based on accent color or default blue
    const iconStyle = accentColor ? { color: accentColor } : {};
    const bgStyle = accentColor
      ? { background: `linear-gradient(135deg, ${accentColor}1A, ${accentColor}0D)` }
      : {};

    // Default classes for fallback
    const iconClass = accentColor ? "w-6 h-6" : "w-6 h-6 text-[#2563EB]";
    const bgClass = accentColor
      ? "w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
      : "w-12 h-12 bg-gradient-to-br from-[#2563EB]/10 to-[#2563EB]/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300";

    return (
      <div className="feature-card group bg-white rounded-2xl p-6 border border-[#E5E7EB] hover:border-[#2563EB]/30 hover:shadow-lg hover:shadow-[#2563EB]/5 transition-all duration-300">
        <div className={bgClass} style={bgStyle}>
          <IconComponent className={iconClass} style={iconStyle} />
        </div>
        <h4 className="text-[16px] font-semibold text-[#111827] mb-2">{title}</h4>
        <p className="text-[14px] text-[#6B7280] leading-relaxed">{desc}</p>
      </div>
    );
  };

  // Service Section Component
  const ServiceSection = ({
    id,
    icon: IconOrString,
    title,
    description,
    highlight,
    features,
    bgAlt = false,
    iconGradient = "from-[#2563EB] to-[#1E3A8A]",
    shadowColor = "shadow-[#2563EB]/20"
  }: {
    id: string;
    icon?: string | React.ElementType;
    title: string;
    description: string[];
    highlight: string;
    features: { icon?: string | React.ElementType; title: string; desc: string }[];
    bgAlt?: boolean;
    iconGradient?: string;
    shadowColor?: string;
  }) => {
    const Icon = (IconOrString && typeof IconOrString === 'string' ? iconMap[IconOrString] : IconOrString) ?? PieChart;

    // Extract primary color from gradient string (e.g., "from-[#F59E0B]")
    const colorMatch = iconGradient?.match(/from-\[#([0-9A-Fa-f]{6})\]/);
    const accentColor = colorMatch ? `#${colorMatch[1]}` : undefined;

    return (
      <section id={id} className={`service-section w-full py-12 md:py-24 px-6 md:px-12 ${bgAlt ? 'bg-[#F8F9FB]' : 'bg-white'}`}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Content */}
            <div className="section-content">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 bg-gradient-to-br ${iconGradient} rounded-2xl flex items-center justify-center shadow-lg ${shadowColor}`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-[28px] md:text-[36px] font-semibold text-[#111827] tracking-[-0.02em]">{title}</h2>
              </div>

              <div className="space-y-4 mb-8">
                {description.map((text, index) => (
                  <p key={index} className="text-[16px] text-[#374151] leading-[1.8]">
                    {text}
                  </p>
                ))}
              </div>

              {/* Highlight Box */}
              {highlight && (
                <div
                  className="pl-5 py-4 pr-4 rounded-r-lg border-l-4"
                  style={{
                    background: accentColor ? `linear-gradient(to right, ${accentColor}0D, transparent)` : undefined,
                    borderColor: accentColor,
                  }}
                >
                  {!accentColor && (
                    <style jsx>{`
                       .highlight-box-default {
                         background: linear-gradient(to right, rgba(37, 99, 235, 0.05), transparent);
                         border-left-color: #2563EB;
                       }
                     `}</style>
                  )}

                  <div className={`flex items-start gap-3 ${!accentColor ? "highlight-box-default" : ""}`} style={{ borderColor: accentColor }}>
                    <CheckCircle2
                      className="w-5 h-5 mt-0.5 flex-shrink-0"
                      style={{ color: accentColor || '#2563EB' }}
                    />
                    <p className="text-[15px] text-[#111827] font-medium leading-relaxed">
                      {highlight}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Feature Cards */}
            <div className="grid sm:grid-cols-1 gap-4">
              {features?.map((feature, index) => (
                <FeatureCard key={index} {...feature} accentColor={accentColor} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader siteSettings={siteSettings} uiStrings={uiStrings} />
      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="w-full bg-gradient-to-b from-[#0A1A2F] to-[#111827] py-16 md:py-28 px-6 md:px-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          {/* Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#2563EB]/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#2563EB]/5 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-[1200px] mx-auto text-center relative z-10">
            {heroBadge && (
              <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 bg-[#2563EB]/20 border border-[#2563EB]/30 rounded-full mb-8">
                <span className="w-2 h-2 bg-[#2563EB] rounded-full animate-pulse"></span>
                <span className="text-[13px] font-medium text-[#2563EB] tracking-wide uppercase">{heroBadge}</span>
              </div>
            )}

            <h1 className="hero-title text-[42px] md:text-[56px] lg:text-[64px] font-display font-medium tracking-[-0.03em] leading-[1.05] mb-8 text-white">
              {heroTitle}
            </h1>

            <p className="hero-subtitle text-[18px] md:text-[20px] text-[#9CA3AF] font-normal leading-relaxed max-w-3xl mx-auto mb-12">
              {heroSubtitle}
            </p>

            {/* Stats Row */}
            {heroStats.length > 0 && (
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
                {heroStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-[32px] md:text-[40px] font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-[13px] text-[#9CA3AF] uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            {exploreServicesLabel && (
              <button
                onClick={() => scrollToSection('service-nav')}
                className="hero-scroll-indicator inline-flex flex-col items-center gap-2 text-[#9CA3AF] hover:text-[#2563EB] transition-colors cursor-pointer"
              >
                <span className="text-[13px] font-medium">{exploreServicesLabel}</span>
                <ChevronDown className="w-5 h-5 animate-bounce" />
              </button>
            )}
          </div>
        </section>

        {/* Service Navigation Cards */}
        <section id="service-nav" className="w-full bg-white py-12 md:py-16 px-6 md:px-12 border-b border-[#E5E7EB]">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-[24px] md:text-[28px] font-semibold text-[#111827] mb-3">{serviceNavTitle}</h2>
              <p className="text-[15px] text-[#6B7280]">{serviceNavSubtitle}</p>
            </div>
            <div ref={navCardsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {serviceNavItems.map((item) => {
                const IconComponent = (typeof item.icon === 'string' ? iconMap[item.icon] : item.icon) ?? PieChart;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`group flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-300 text-center ${activeSection === item.id
                      ? 'bg-[#2563EB] border-[#2563EB] shadow-lg shadow-[#2563EB]/20'
                      : 'bg-white border-[#E5E7EB] hover:border-[#2563EB]/30 hover:shadow-md'
                      }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${activeSection === item.id
                      ? 'bg-white/20'
                      : 'bg-[#F8F9FB] group-hover:bg-[#2563EB]/10'
                      }`}>
                      <IconComponent className={`w-6 h-6 transition-colors ${activeSection === item.id
                        ? 'text-white'
                        : 'text-[#6B7280] group-hover:text-[#2563EB]'
                        }`} />
                    </div>
                    <h3 className={`text-[13px] font-semibold leading-tight transition-colors ${activeSection === item.id
                      ? 'text-white'
                      : 'text-[#111827]'
                      }`}>
                      {item.title}
                    </h3>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Service Sections */}
        {serviceSections.map((section, index) => (
          <ServiceSection
            key={section.id}
            id={section.id}
            icon={section.icon || 'PieChart'}
            title={section.title}
            description={section.description || []}
            highlight={section.highlight || ''}
            features={section.features || []}
            bgAlt={index % 2 !== 0}
            iconGradient={section.iconGradient}
            shadowColor={section.shadowColor}
          />
        ))}

        {/* Final CTA Section */}
        <section className="w-full bg-gradient-to-b from-[#0A1A2F] to-[#111827] py-16 md:py-24 px-6 md:px-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          {/* Gradient Orb */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#2563EB]/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-[800px] mx-auto text-center relative z-10">
            {readyToStartBadge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
                <span className="text-[13px] font-medium text-white/70">{readyToStartBadge}</span>
              </div>
            )}

            <h2 className="text-[32px] md:text-[42px] font-medium text-white mb-6 tracking-[-0.02em]">
              {ctaTitle}
            </h2>
            <p className="text-[17px] text-[#9CA3AF] mb-10 leading-relaxed max-w-xl mx-auto">
              {ctaDescription}
            </p>
            {ctaButtonHref && ctaButtonText && (
              <Link
                href={ctaButtonHref}
                className="inline-flex items-center gap-3 bg-[#2563EB] text-white px-8 py-4 rounded-xl text-[15px] font-semibold hover:bg-[#1E3A8A] transition-all duration-300 group shadow-lg shadow-[#2563EB]/20"
              >
                {ctaButtonText}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </section>
      </main>
      <Footer siteSettings={siteSettings} />
    </div>
  );
}
