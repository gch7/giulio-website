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
  Check,
  Target,
  BarChart3,
  Layers,
  Activity,
  Zap,
  Lock
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Service navigation items
const serviceNavItems = [
  { id: 'portfolio-review', title: 'Portfolio Review', icon: PieChart, description: 'Structured assessment of your current portfolio.' },
  { id: 'strategy-design', title: 'Strategy Design', icon: Compass, description: 'Tailored frameworks for disciplined investing.' },
  { id: 'options', title: 'Options', icon: TrendingUp, description: 'Professional guidance on options positioning.' },
  { id: 'structured-products', title: 'Structured Products', icon: Shield, description: 'Clear insight into yield and protection structures.' },
  { id: 'real-estate', title: 'Real Estate & Other Assets', icon: Building2, description: 'High-level guidance on property and alternative assets.' },
  { id: 'crypto', title: 'Crypto', icon: Bitcoin, description: 'Risk-aware direction for digital asset exposure.' },
];

export default function ConsultingPageClient() {
  const heroRef = useRef<HTMLElement>(null);
  const navCardsRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('');

  useGSAP(() => {
    // Hero animations
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    heroTl.fromTo(
      '.hero-badge',
      { opacity: 0, y: -20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7 }
    )
      .fromTo(
        '.hero-title',
        { opacity: 0, y: 50, clipPath: "inset(100% 0% 0% 0%)" },
        { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.9 },
        "-=0.4"
      )
      .fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.5"
      )
      .fromTo(
        '.hero-scroll-indicator',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      );

    // Service nav cards animation
    if (navCardsRef.current) {
      gsap.fromTo(
        navCardsRef.current.children,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: navCardsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Animate each service section
    const sections = document.querySelectorAll('.service-section');
    sections.forEach((section) => {
      gsap.fromTo(
        section.querySelector('.section-header'),
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(
        section.querySelectorAll('.content-block'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
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
  }, []);

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

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <NavigationHeader />
      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="w-full bg-gradient-to-b from-[#0a0a0b] to-[#18181b] py-28 px-6 md:px-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="max-w-[1200px] mx-auto text-center relative z-10">
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 bg-[#0d9488]/20 border border-[#0d9488]/30 rounded-full mb-8">
              <span className="w-2 h-2 bg-[#0d9488] rounded-full animate-pulse"></span>
              <span className="text-[13px] font-medium text-[#0d9488] tracking-wide uppercase">Advisory Services</span>
            </div>

            <h1 className="hero-title text-[42px] md:text-[56px] lg:text-[64px] font-medium tracking-[-0.03em] leading-[1.05] mb-8 text-white">
              Consulting
            </h1>

            <p className="hero-subtitle text-[18px] md:text-[20px] text-[#a1a1aa] font-normal leading-relaxed max-w-3xl mx-auto mb-12">
              Institution-level advisory designed for private investors who demand precision,
              clarity, and actionable insight across every major asset class.
            </p>

            <button
              onClick={() => scrollToSection('service-nav')}
              className="hero-scroll-indicator inline-flex flex-col items-center gap-2 text-[#71717a] hover:text-[#0d9488] transition-colors cursor-pointer"
            >
              <span className="text-[13px] font-medium">Explore Services</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </section>

        {/* Service Navigation Cards */}
        <section id="service-nav" className="w-full bg-[#fafafa] py-16 px-6 md:px-12 border-b border-[#e4e4e7]">
          <div className="max-w-[1200px] mx-auto">
            <div ref={navCardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {serviceNavItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`group flex items-start gap-4 p-5 rounded-xl border transition-all duration-300 text-left ${activeSection === item.id
                        ? 'bg-[#0d9488]/5 border-[#0d9488]/30'
                        : 'bg-white border-[#e4e4e7] hover:border-[#0d9488]/30 hover:bg-[#0d9488]/5'
                      }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${activeSection === item.id
                        ? 'bg-[#0d9488]/10'
                        : 'bg-[#f4f4f5] group-hover:bg-[#0d9488]/10'
                      }`}>
                      <IconComponent className={`w-5 h-5 transition-colors ${activeSection === item.id
                          ? 'text-[#0d9488]'
                          : 'text-[#71717a] group-hover:text-[#0d9488]'
                        }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[15px] font-semibold text-[#0a0a0b] mb-1 flex items-center gap-2">
                        {item.title}
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-[13px] text-[#71717a] leading-snug">{item.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Portfolio Review Section */}
        <section id="portfolio-review" className="service-section w-full bg-[#fafafa] py-20 px-6 md:px-12">
          <div className="max-w-[1000px] mx-auto">
            <div className="section-header flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-[#0d9488]/10 rounded-xl flex items-center justify-center">
                <PieChart className="w-6 h-6 text-[#0d9488]" />
              </div>
              <div>
                <h2 className="text-[28px] md:text-[36px] font-semibold text-[#0a0a0b]">Portfolio Review</h2>
                <p className="text-[15px] text-[#71717a]">Structured assessment of your current portfolio</p>
              </div>
            </div>

            <div className="content-block bg-white rounded-2xl border border-[#e4e4e7] p-8 mb-6">
              <p className="text-[16px] text-[#52525b] leading-relaxed mb-6">
                A structured, comprehensive portfolio review is one of the pillars of Gamma Capital&apos;s advisory approach.
                Unlike standard portfolio check-ups that focus only on returns or diversification, our analysis is designed
                to reveal the true underlying structure of your risk, exposures, and decision-making patterns.
              </p>
              <p className="text-[16px] text-[#52525b] leading-relaxed">
                We analyse portfolios that include every major asset class: <span className="font-medium text-[#0a0a0b]">equities, options, futures, ETFs, fixed income,
                  structured products, crypto assets, commodities, real estate exposure, and alternative instruments</span>.
                This multi-asset view allows us to identify weaknesses and inefficiencies that are invisible to traditional retail frameworks.
              </p>
            </div>

            <div className="content-block grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-2xl border border-[#e4e4e7] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-5 h-5 text-[#dc2626]" />
                  <h3 className="text-[16px] font-semibold text-[#0a0a0b]">Errors We Identify</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    'Excessive concentration (sectorial or directional)',
                    'Hidden leverage and unintentional convexity',
                    'Correlation traps',
                    'Improper position sizing',
                    'Unhedged exposures in volatile regimes',
                    'Strategy inconsistency',
                    'Risk not aligned with investor objectives'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#0d9488] flex-shrink-0 mt-0.5" />
                      <span className="text-[14px] text-[#52525b]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-[#e4e4e7] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="w-5 h-5 text-[#0d9488]" />
                  <h3 className="text-[16px] font-semibold text-[#0a0a0b]">Our Techniques</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    'Scenario analysis (macro, volatility, liquidity, stress)',
                    'Statistical stress tests',
                    'Correlation structure mapping',
                    'Value at Risk (VaR) and Conditional VaR (CVaR)',
                    'Factor-based analysis (style and macro factors)',
                    'Monte Carlo simulations',
                    'PCA to detect hidden common exposures',
                    'Risk-adjusted return modelling'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#0d9488] flex-shrink-0 mt-0.5" />
                      <span className="text-[14px] text-[#52525b]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="content-block bg-gradient-to-br from-[#0d9488]/5 to-[#0d9488]/10 rounded-2xl border border-[#0d9488]/20 p-6">
              <p className="text-[15px] text-[#0a0a0b] leading-relaxed">
                <span className="font-semibold">The result:</span> A clear, comprehensive understanding of how your portfolio behaves in different environments — and what needs to change.
                Our role combines the precision of a technical reviewer, the clarity of a strategic advisor, and the practicality of a partner who brings order to chaotic or overly complex portfolios.
                You receive not just an analysis, but a <span className="font-semibold text-[#0d9488]">structured interpretation and a roadmap</span> to elevate your entire investment process.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full max-w-[1000px] mx-auto px-6 md:px-12">
          <div className="border-t border-[#e4e4e7]"></div>
        </div>

        {/* Strategy Design Section */}
        <section id="strategy-design" className="service-section w-full bg-[#fafafa] py-20 px-6 md:px-12">
          <div className="max-w-[1000px] mx-auto">
            <div className="section-header flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-[#0d9488]/10 rounded-xl flex items-center justify-center">
                <Compass className="w-6 h-6 text-[#0d9488]" />
              </div>
              <div>
                <h2 className="text-[28px] md:text-[36px] font-semibold text-[#0a0a0b]">Strategy Design</h2>
                <p className="text-[15px] text-[#71717a]">Tailored frameworks for disciplined investing</p>
              </div>
            </div>

            <div className="content-block bg-white rounded-2xl border border-[#e4e4e7] p-8 mb-6">
              <p className="text-[16px] text-[#52525b] leading-relaxed mb-6">
                Gamma Capital designs investment strategies that combine institution-level structure with the flexibility
                required by modern private investors. Our philosophy is <span className="font-medium text-[#0a0a0b]">opportunistic and options-driven</span>,
                integrating both short-term tactical opportunities and medium-to-long-term strategic positioning.
              </p>
              <p className="text-[16px] text-[#52525b] leading-relaxed">
                We build strategies across multiple horizons: short-term, medium-term and long-term depending on your objectives,
                risk tolerance and liquidity profile. The level of personalization ranges from fully bespoke architectures to
                adapted frameworks that are tested, repeatable and scalable.
              </p>
            </div>

            <div className="content-block bg-white rounded-2xl border border-[#e4e4e7] p-6 mb-6">
              <div className="flex items-center gap-3 mb-5">
                <Layers className="w-5 h-5 text-[#0d9488]" />
                <h3 className="text-[16px] font-semibold text-[#0a0a0b]">What Makes Our Approach Unique</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Institutional focus on options flow and dealer positioning',
                  'Structured product logic',
                  'Multi-asset integration (equities, derivatives, crypto, real estate)',
                  'Risk mapping and scenario-driven adaptability',
                  'Opportunistic tactics based on market microstructure',
                  'Volatility regime awareness'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-[#f4f4f5] rounded-lg p-3">
                    <Zap className="w-4 h-4 text-[#0d9488] flex-shrink-0 mt-0.5" />
                    <span className="text-[14px] text-[#52525b]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="content-block bg-[#0a0a0b] rounded-2xl p-6 mb-6">
              <h3 className="text-[16px] font-semibold text-white mb-4">Strategy Design at Gamma Capital Defines:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  'How to express an idea',
                  'How to size it',
                  'How to hedge it',
                  'How to adapt when conditions change',
                  'How to structure payoffs with intention and precision'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-[14px] text-[#a1a1aa]">
                    <ArrowRight className="w-3.5 h-3.5 text-[#0d9488]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="content-block bg-gradient-to-br from-[#0d9488]/5 to-[#0d9488]/10 rounded-2xl border border-[#0d9488]/20 p-6">
              <p className="text-[15px] text-[#0a0a0b] leading-relaxed">
                Clients receive strategies that are <span className="font-semibold">rational, disciplined and grounded in institutional methods</span>,
                but designed to work within the flexibility and autonomy of a private account.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full max-w-[1000px] mx-auto px-6 md:px-12">
          <div className="border-t border-[#e4e4e7]"></div>
        </div>

        {/* Options Section */}
        <section id="options" className="service-section w-full bg-[#fafafa] py-20 px-6 md:px-12">
          <div className="max-w-[1000px] mx-auto">
            <div className="section-header flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-[#0d9488]/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#0d9488]" />
              </div>
              <div>
                <h2 className="text-[28px] md:text-[36px] font-semibold text-[#0a0a0b]">Options</h2>
                <p className="text-[15px] text-[#71717a]">Professional guidance on options positioning</p>
              </div>
            </div>

            <div className="content-block bg-white rounded-2xl border border-[#e4e4e7] p-8 mb-6">
              <p className="text-[16px] text-[#52525b] leading-relaxed mb-6">
                Options represent the <span className="font-medium text-[#0a0a0b]">core analytical domain</span> of Gamma Capital —
                the discipline where our identity was shaped and where our expertise continues to expand.
              </p>
              <p className="text-[16px] text-[#52525b] leading-relaxed">
                Our work in derivatives is grounded in a rigorous understanding of market microstructure, volatility dynamics,
                and dealer-driven flows, allowing us to interpret the options market not as a series of isolated contracts
                but as a <span className="font-medium text-[#0a0a0b]">structural force influencing asset prices</span>.
              </p>
            </div>

            <div className="content-block bg-white rounded-2xl border border-[#e4e4e7] p-6 mb-6">
              <div className="flex items-center gap-3 mb-5">
                <Activity className="w-5 h-5 text-[#0d9488]" />
                <h3 className="text-[16px] font-semibold text-[#0a0a0b]">Our Analysis Covers</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { title: 'Greek Flows', desc: 'Gamma, vanna and charm flows and their impact on intraday and multi-day price stability' },
                  { title: 'Dealer Positioning', desc: 'Dealer positioning and hedging requirements, including expected rebalancing and liquidity shifts' },
                  { title: 'Volatility Regimes', desc: 'Regime identification: how different vol environments alter optimal strategy and risk premia' },
                  { title: 'Skew & Term Structure', desc: 'Skew and term structure interpretation, especially in stress environments' },
                  { title: 'Cross-Asset Volatility', desc: 'Cross-asset volatility relationships used by institutional desks' },
                  { title: 'Option Construction', desc: 'Tactical and strategic option construction, from directional exposure to complex yield-enhancement structures' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-[#f4f4f5] rounded-xl">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-[#e4e4e7]">
                      <span className="text-[12px] font-semibold text-[#0d9488]">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <div>
                      <h4 className="text-[14px] font-semibold text-[#0a0a0b] mb-1">{item.title}</h4>
                      <p className="text-[13px] text-[#71717a]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="content-block bg-gradient-to-br from-[#0d9488]/5 to-[#0d9488]/10 rounded-2xl border border-[#0d9488]/20 p-6">
              <p className="text-[15px] text-[#0a0a0b] leading-relaxed">
                Our consulting provides investors with more than strategy setups: it provides the ability to <span className="font-semibold">understand the market&apos;s underlying mechanics</span>,
                anticipate flow-driven movements, and operate with the clarity typical of professional derivatives desks.
                Whether building asymmetrical payoffs, enhancing yield, adjusting convexity, or managing tail risk,
                our framework <span className="font-semibold text-[#0d9488]">aligns optionality with your strategic objectives</span>.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full max-w-[1000px] mx-auto px-6 md:px-12">
          <div className="border-t border-[#e4e4e7]"></div>
        </div>

        {/* Structured Products Section */}
        <section id="structured-products" className="service-section w-full bg-[#fafafa] py-20 px-6 md:px-12">
          <div className="max-w-[1000px] mx-auto">
            <div className="section-header flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-[#0d9488]/10 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#0d9488]" />
              </div>
              <div>
                <h2 className="text-[28px] md:text-[36px] font-semibold text-[#0a0a0b]">Structured Products</h2>
                <p className="text-[15px] text-[#71717a]">Clear insight into yield and protection structures</p>
              </div>
            </div>

            <div className="content-block bg-white rounded-2xl border border-[#e4e4e7] p-8 mb-6">
              <p className="text-[16px] text-[#52525b] leading-relaxed">
                Our structured product advisory combines <span className="font-medium text-[#0a0a0b]">academic rigor, real institutional exposure, and practical payoff engineering</span>.
                The foundation lies in our economic training at USI Lugano, strengthened through interactions with UBS portfolio managers,
                giving us a dual perspective: how structures are conceived by issuers, and how they should be evaluated by sophisticated investors.
              </p>
            </div>

            <div className="content-block grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-2xl border border-[#e4e4e7] p-6">
                <h3 className="text-[16px] font-semibold text-[#0a0a0b] mb-4">Products We Analyze</h3>
                <ul className="space-y-3">
                  {[
                    'Autocallables with variable memory and conditional coupons',
                    'Reverse convertibles for targeted yield',
                    'Phoenix and Memory Phoenix notes',
                    'Capital-protected structures',
                    'Express notes and tactical payoff accelerators',
                    'Barrier and digital structures'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#0d9488]/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-[#0d9488]" />
                      </div>
                      <span className="text-[14px] text-[#52525b]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-[#e4e4e7] p-6">
                <h3 className="text-[16px] font-semibold text-[#0a0a0b] mb-4">Core Questions We Address</h3>
                <ul className="space-y-3">
                  {[
                    'What risk premium is the product harvesting?',
                    'How does the issuer hedge the payoff?',
                    'When does the structure become inefficient?',
                    'What implicit risks are transferred to the investor?',
                    'Can the payoff be replicated more effectively?'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#f4f4f5] flex items-center justify-center flex-shrink-0">
                        <span className="text-[11px] font-semibold text-[#71717a]">{i + 1}</span>
                      </div>
                      <span className="text-[14px] text-[#52525b]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="content-block bg-gradient-to-br from-[#0d9488]/5 to-[#0d9488]/10 rounded-2xl border border-[#0d9488]/20 p-6">
              <p className="text-[15px] text-[#0a0a0b] leading-relaxed">
                We also support clients in <span className="font-semibold">constructing custom payoffs via options</span>,
                allowing them to replicate or improve on traditional structured notes using the flexibility of advanced brokers.
                This empowers investors to access <span className="font-semibold text-[#0d9488]">institutional-grade payoff engineering</span> without unnecessary cost or opacity.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full max-w-[1000px] mx-auto px-6 md:px-12">
          <div className="border-t border-[#e4e4e7]"></div>
        </div>

        {/* Real Estate Section */}
        <section id="real-estate" className="service-section w-full bg-[#fafafa] py-20 px-6 md:px-12">
          <div className="max-w-[1000px] mx-auto">
            <div className="section-header flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-[#0d9488]/10 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-[#0d9488]" />
              </div>
              <div>
                <h2 className="text-[28px] md:text-[36px] font-semibold text-[#0a0a0b]">Real Estate & Other Assets</h2>
                <p className="text-[15px] text-[#71717a]">High-level guidance on property and alternative assets</p>
              </div>
            </div>

            <div className="content-block bg-white rounded-2xl border border-[#e4e4e7] p-8 mb-6">
              <p className="text-[16px] text-[#52525b] leading-relaxed">
                Gamma Capital provides real estate advisory with a perspective rarely found in the private advisory market:
                a combination of <span className="font-medium text-[#0a0a0b]">quantitative analysis, strategic macro understanding, and direct operational experience</span> across both Switzerland and Italy.
              </p>
            </div>

            <div className="content-block bg-white rounded-2xl border border-[#e4e4e7] p-6 mb-6">
              <h3 className="text-[16px] font-semibold text-[#0a0a0b] mb-4">Markets We Cover</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { city: 'Lugano', desc: 'Cross-border dynamics, rental segmentation' },
                  { city: 'Chiasso', desc: 'Yield-driven strategies, border economics' },
                  { city: 'Venice', desc: 'Premium tourist cycles, luxury optimization' },
                  { city: 'Como', desc: 'Lifestyle-driven demand, premium appreciation' },
                  { city: 'Udine', desc: 'Conservative yield-focused allocations' },
                  { city: 'Rome', desc: 'Metro patterns, neighborhood catalysts' }
                ].map((item, i) => (
                  <div key={i} className="bg-[#f4f4f5] rounded-xl p-4">
                    <h4 className="text-[14px] font-semibold text-[#0a0a0b] mb-1">{item.city}</h4>
                    <p className="text-[12px] text-[#71717a]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="content-block bg-white rounded-2xl border border-[#e4e4e7] p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-5 h-5 text-[#0d9488]" />
                <h3 className="text-[16px] font-semibold text-[#0a0a0b]">Our Advisory Includes</h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Opportunity screening based on expected cash flows',
                  'Yield modelling for short-stay and long-stay formats',
                  'Projected return analysis including renovation ROI',
                  'Integration of real estate into portfolio framework',
                  'Assessment of alternative assets and their role'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 bg-[#f4f4f5] rounded-lg p-3">
                    <Check className="w-4 h-4 text-[#0d9488] flex-shrink-0 mt-0.5" />
                    <span className="text-[13px] text-[#52525b]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="content-block bg-gradient-to-br from-[#0d9488]/5 to-[#0d9488]/10 rounded-2xl border border-[#0d9488]/20 p-6">
              <p className="text-[15px] text-[#0a0a0b] leading-relaxed">
                This multi-angle perspective allows clients to treat real estate not as isolated acquisitions,
                but as <span className="font-semibold text-[#0d9488]">strategic components of a well-engineered portfolio</span>.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full max-w-[1000px] mx-auto px-6 md:px-12">
          <div className="border-t border-[#e4e4e7]"></div>
        </div>

        {/* Crypto Section */}
        <section id="crypto" className="service-section w-full bg-[#fafafa] py-20 px-6 md:px-12">
          <div className="max-w-[1000px] mx-auto">
            <div className="section-header flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-[#0d9488]/10 rounded-xl flex items-center justify-center">
                <Bitcoin className="w-6 h-6 text-[#0d9488]" />
              </div>
              <div>
                <h2 className="text-[28px] md:text-[36px] font-semibold text-[#0a0a0b]">Crypto</h2>
                <p className="text-[15px] text-[#71717a]">Risk-aware direction for digital asset exposure</p>
              </div>
            </div>

            <div className="content-block bg-white rounded-2xl border border-[#e4e4e7] p-8 mb-6">
              <p className="text-[16px] text-[#52525b] leading-relaxed mb-6">
                Gamma Capital entered the digital asset space in <span className="font-medium text-[#0a0a0b]">2017</span>, gaining real exposure across multiple crypto cycles —
                from the structural collapses of early markets to the progressive institutionalisation of the asset class.
              </p>
              <p className="text-[16px] text-[#52525b] leading-relaxed">
                This long-term presence provides us with the historical context and practical insight needed to evaluate
                crypto risk, opportunity, and positioning with <span className="font-medium text-[#0a0a0b]">institutional discipline</span>.
              </p>
            </div>

            <div className="content-block bg-white rounded-2xl border border-[#e4e4e7] p-6 mb-6">
              <h3 className="text-[16px] font-semibold text-[#0a0a0b] mb-4">Our Focus Areas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Activity, title: 'Market Structure', desc: 'Market structure and liquidity cycles' },
                  { icon: Layers, title: 'Regime Classification', desc: 'Risk-on/off correlation, macro dependency, volatility states' },
                  { icon: BarChart3, title: 'On-Chain Signals', desc: 'Signals that offer real informational value' },
                  { icon: Target, title: 'Risk Sizing', desc: 'Exposure alignment with broader portfolio' },
                  { icon: TrendingUp, title: 'Market Interplay', desc: 'Between traditional markets and digital assets' },
                  { icon: Compass, title: 'Scenario Positioning', desc: 'Based positioning rather than speculative narratives' }
                ].map((item, i) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={i} className="flex items-start gap-4 p-4 bg-[#f4f4f5] rounded-xl">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-[#e4e4e7]">
                        <IconComponent className="w-4 h-4 text-[#0d9488]" />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-semibold text-[#0a0a0b] mb-0.5">{item.title}</h4>
                        <p className="text-[13px] text-[#71717a]">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="content-block bg-[#0a0a0b] rounded-2xl p-6 mb-6">
              <p className="text-[15px] text-[#a1a1aa] leading-relaxed">
                Our collaboration with highly competent crypto professionals and individuals with deep experience —
                <span className="text-white font-medium"> not influencer-level commentary</span> — enhances our ability to provide insights grounded in reality rather than hype.
              </p>
            </div>

            <div className="content-block bg-gradient-to-br from-[#0d9488]/5 to-[#0d9488]/10 rounded-2xl border border-[#0d9488]/20 p-6">
              <p className="text-[15px] text-[#0a0a0b] leading-relaxed">
                Our approach is not speculative; it is <span className="font-semibold">strategic</span>.
                Crypto is evaluated as an asymmetric asset class, one that requires disciplined sizing, macro awareness,
                and a clear understanding of where <span className="font-semibold text-[#0d9488]">value and risk truly reside</span>.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full bg-gradient-to-b from-[#0a0a0b] to-[#18181b] py-24 px-6 md:px-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="max-w-[700px] mx-auto text-center relative z-10">
            <h2 className="text-[32px] md:text-[42px] font-medium text-white mb-6 tracking-[-0.02em]">
              Ready to Elevate Your<br />Investment Process?
            </h2>
            <p className="text-[17px] text-[#a1a1aa] mb-10 leading-relaxed">
              Schedule a consultation to discuss how Gamma Capital can bring institutional-level
              precision and clarity to your portfolio.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-[#0d9488] text-white px-8 py-4 rounded-lg text-[15px] font-semibold hover:bg-[#0f766e] transition-all duration-300 group"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
