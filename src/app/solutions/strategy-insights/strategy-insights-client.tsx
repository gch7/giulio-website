'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import NavigationHeader from "@/components/sections/navigation-header";
import Footer from "@/components/sections/footer";
import {
  Brain,
  Activity,
  Layers,
  Building2,
  Users,
  ArrowRight,
  ChevronDown,
  TrendingUp,
  BarChart3,
  Shield,
  Compass
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Section navigation items
const sectionNavItems = [
  { id: 'market-intelligence', title: 'Market Intelligence', icon: Brain },
  { id: 'options-intelligence', title: 'Options Intelligence', icon: Activity },
  { id: 'structured-products', title: 'Structured Products', icon: Layers },
  { id: 'real-estate', title: 'Real Estate', icon: Building2 },
  { id: 'strategic-network', title: 'Strategic Network', icon: Users },
];

export default function StrategyInsightsClient() {
  const heroRef = useRef<HTMLElement>(null);
  const navCardsRef = useRef<HTMLDivElement>(null);

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

    // Nav cards animation
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

    // Animate each section
    const sections = document.querySelectorAll('.intel-section');
    sections.forEach((section) => {
      gsap.fromTo(
        section.querySelector('.section-content'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Closing section animation
    gsap.fromTo(
      '.closing-section',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.closing-section',
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
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
        <section ref={heroRef} className="w-full bg-gradient-to-b from-[#0a0a0b] to-[#18181b] py-16 md:py-28 px-6 md:px-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          {/* Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#0d9488]/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#0d9488]/5 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-[1200px] mx-auto text-center relative z-10">
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 bg-[#0d9488]/20 border border-[#0d9488]/30 rounded-full mb-8">
              <span className="w-2 h-2 bg-[#0d9488] rounded-full animate-pulse"></span>
              <span className="text-[13px] font-medium text-[#0d9488] tracking-wide uppercase">Market Intelligence</span>
            </div>

            <h1 className="hero-title text-[42px] md:text-[56px] lg:text-[64px] font-medium tracking-[-0.03em] leading-[1.05] mb-8 text-white">
              Market Intelligence
            </h1>

            <p className="hero-subtitle text-[18px] md:text-[20px] text-[#a1a1aa] font-normal leading-relaxed max-w-3xl mx-auto mb-12">
              Data-driven insights, algorithms and institutional frameworks<br className="hidden md:block" />
              to understand markets and manage risk.
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
              <div className="text-center">
                <div className="text-[32px] md:text-[40px] font-bold text-white mb-1">5</div>
                <div className="text-[13px] text-[#71717a] uppercase tracking-wider">Core Areas</div>
              </div>
              <div className="text-center">
                <div className="text-[32px] md:text-[40px] font-bold text-white mb-1">Data-Driven</div>
                <div className="text-[13px] text-[#71717a] uppercase tracking-wider">Analysis</div>
              </div>
              <div className="text-center">
                <div className="text-[32px] md:text-[40px] font-bold text-white mb-1">Institutional</div>
                <div className="text-[13px] text-[#71717a] uppercase tracking-wider">Framework</div>
              </div>
            </div>

            <button
              onClick={() => scrollToSection('section-nav')}
              className="hero-scroll-indicator inline-flex flex-col items-center gap-2 text-[#71717a] hover:text-[#0d9488] transition-colors cursor-pointer"
            >
              <span className="text-[13px] font-medium">Explore Intelligence</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </section>

        {/* Section Navigation */}
        <section id="section-nav" className="w-full bg-white py-12 md:py-16 px-6 md:px-12 border-b border-[#e4e4e7]">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-[24px] md:text-[28px] font-semibold text-[#0a0a0b] mb-3">Our Intelligence Areas</h2>
              <p className="text-[15px] text-[#71717a]">Click to explore each area in detail</p>
            </div>
            <div ref={navCardsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {sectionNavItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="group flex flex-col items-center gap-3 p-5 rounded-2xl border bg-white border-[#e4e4e7] hover:border-[#0d9488]/30 hover:shadow-md transition-all duration-300 text-center"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#f4f4f5] group-hover:bg-[#0d9488]/10 transition-all duration-300">
                      <IconComponent className="w-6 h-6 text-[#71717a] group-hover:text-[#0d9488] transition-colors" />
                    </div>
                    <h3 className="text-[13px] font-semibold leading-tight text-[#0a0a0b]">
                      {item.title}
                    </h3>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 1: Market Intelligence (Core) */}
        <section id="market-intelligence" className="intel-section w-full py-12 md:py-24 px-6 md:px-12 bg-[#fafafa]">
          <div className="max-w-[1200px] mx-auto">
            <div className="section-content">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0d9488] to-[#0f766e] rounded-2xl flex items-center justify-center shadow-lg shadow-[#0d9488]/20">
                      <Brain className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <span className="text-[12px] font-medium text-[#0d9488] tracking-wide uppercase block mb-1">Core</span>
                      <h2 className="text-[28px] md:text-[36px] font-semibold text-[#0a0a0b] tracking-[-0.02em]">Market Intelligence</h2>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <p className="text-[16px] text-[#52525b] leading-[1.8]">
                      We develop advanced analytical frameworks and proprietary algorithms to interpret markets, manage portfolio risk and identify asymmetric opportunities.
                    </p>
                    <p className="text-[16px] text-[#52525b] leading-[1.8]">
                      Our models adapt to volatility, liquidity and macro regimes, and can be custom-built on request for specific strategies or portfolios.
                    </p>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 bg-[#0d9488] text-white px-6 py-3.5 rounded-xl text-[15px] font-semibold hover:bg-[#0f766e] transition-all duration-300 group shadow-lg shadow-[#0d9488]/20"
                  >
                    Contact us
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className="grid gap-4">
                  <div className="bg-white rounded-2xl p-6 border border-[#e4e4e7] hover:border-[#0d9488]/30 hover:shadow-lg hover:shadow-[#0d9488]/5 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0d9488]/10 to-[#0d9488]/5 rounded-xl flex items-center justify-center mb-4">
                      <BarChart3 className="w-6 h-6 text-[#0d9488]" />
                    </div>
                    <h4 className="text-[16px] font-semibold text-[#0a0a0b] mb-2">Advanced Analytics</h4>
                    <p className="text-[14px] text-[#71717a] leading-relaxed">Proprietary frameworks for market interpretation</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-[#e4e4e7] hover:border-[#0d9488]/30 hover:shadow-lg hover:shadow-[#0d9488]/5 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0d9488]/10 to-[#0d9488]/5 rounded-xl flex items-center justify-center mb-4">
                      <TrendingUp className="w-6 h-6 text-[#0d9488]" />
                    </div>
                    <h4 className="text-[16px] font-semibold text-[#0a0a0b] mb-2">Regime Adaptation</h4>
                    <p className="text-[14px] text-[#71717a] leading-relaxed">Models that adapt to volatility and macro conditions</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-[#e4e4e7] hover:border-[#0d9488]/30 hover:shadow-lg hover:shadow-[#0d9488]/5 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0d9488]/10 to-[#0d9488]/5 rounded-xl flex items-center justify-center mb-4">
                      <Compass className="w-6 h-6 text-[#0d9488]" />
                    </div>
                    <h4 className="text-[16px] font-semibold text-[#0a0a0b] mb-2">Custom Solutions</h4>
                    <p className="text-[14px] text-[#71717a] leading-relaxed">Bespoke models for specific strategies or portfolios</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Options Intelligence */}
        <section id="options-intelligence" className="intel-section w-full py-12 md:py-24 px-6 md:px-12 bg-[#f4f4f5]">
          <div className="max-w-[1200px] mx-auto">
            <div className="section-content">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0d9488] to-[#0f766e] rounded-2xl flex items-center justify-center shadow-lg shadow-[#0d9488]/20">
                      <Activity className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-[28px] md:text-[36px] font-semibold text-[#0a0a0b] tracking-[-0.02em]">Options Intelligence</h2>
                  </div>

                  <div className="space-y-4 mb-8">
                    <p className="text-[16px] text-[#52525b] leading-[1.8]">
                      Options are a key source of market information. We analyse institutional options flow, GEX, dealer positioning and volatility dynamics to understand where risk is building or being hedged.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-[#e4e4e7] mb-8">
                    <h4 className="text-[15px] font-semibold text-[#0a0a0b] mb-4">Our focus is on:</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-[#0d9488] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-[15px] text-[#52525b]">Flow-driven market behaviour</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-[#0d9488] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-[15px] text-[#52525b]">Gamma exposure and dealer hedging</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-[#0d9488] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-[15px] text-[#52525b]">Volatility regimes and term structure</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-[16px] text-[#52525b] leading-[1.8] italic border-l-4 border-[#0d9488] pl-4">
                    This intelligence supports timing, risk management and strategy design.
                  </p>
                </div>

                <div className="flex items-center justify-center">
                  <div className="relative w-full max-w-[400px] aspect-square">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0d9488]/10 to-[#0d9488]/5 rounded-3xl"></div>
                    <div className="absolute inset-4 bg-white rounded-2xl border border-[#e4e4e7] flex items-center justify-center">
                      <Activity className="w-24 h-24 text-[#0d9488]/20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Structured Products Intelligence */}
        <section id="structured-products" className="intel-section w-full py-12 md:py-24 px-6 md:px-12 bg-[#fafafa]">
          <div className="max-w-[1200px] mx-auto">
            <div className="section-content">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0d9488] to-[#0f766e] rounded-2xl flex items-center justify-center shadow-lg shadow-[#0d9488]/20">
                      <Layers className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-[28px] md:text-[36px] font-semibold text-[#0a0a0b] tracking-[-0.02em]">Structured Products Intelligence</h2>
                  </div>

                  <div className="space-y-4 mb-8">
                    <p className="text-[16px] text-[#52525b] leading-[1.8]">
                      We analyse and design structured payoffs from an institutional perspective.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-[#e4e4e7] mb-8">
                    <h4 className="text-[15px] font-semibold text-[#0a0a0b] mb-4">Our work focuses on:</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-[#0d9488] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-[15px] text-[#52525b]">Payoff asymmetry and embedded optionality</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-[#0d9488] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-[15px] text-[#52525b]">Issuer hedging logic</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-[#0d9488] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-[15px] text-[#52525b]">Regime-dependent performance</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-[#0d9488] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-[15px] text-[#52525b]">Efficiency vs complexity</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-[16px] text-[#52525b] leading-[1.8] italic border-l-4 border-[#0d9488] pl-4">
                    We also replicate or improve structured payoffs using options, removing unnecessary opacity.
                  </p>
                </div>

                <div className="grid gap-4">
                  <div className="bg-white rounded-2xl p-6 border border-[#e4e4e7] hover:border-[#0d9488]/30 hover:shadow-lg hover:shadow-[#0d9488]/5 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0d9488]/10 to-[#0d9488]/5 rounded-xl flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-[#0d9488]" />
                    </div>
                    <h4 className="text-[16px] font-semibold text-[#0a0a0b] mb-2">Payoff Analysis</h4>
                    <p className="text-[14px] text-[#71717a] leading-relaxed">Deep understanding of structured product mechanics</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-[#e4e4e7] hover:border-[#0d9488]/30 hover:shadow-lg hover:shadow-[#0d9488]/5 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0d9488]/10 to-[#0d9488]/5 rounded-xl flex items-center justify-center mb-4">
                      <Layers className="w-6 h-6 text-[#0d9488]" />
                    </div>
                    <h4 className="text-[16px] font-semibold text-[#0a0a0b] mb-2">Options Replication</h4>
                    <p className="text-[14px] text-[#71717a] leading-relaxed">Enhanced transparency through direct options strategies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Real Estate Advisory */}
        <section id="real-estate" className="intel-section w-full py-12 md:py-24 px-6 md:px-12 bg-[#f4f4f5]">
          <div className="max-w-[1200px] mx-auto">
            <div className="section-content">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0d9488] to-[#0f766e] rounded-2xl flex items-center justify-center shadow-lg shadow-[#0d9488]/20">
                      <Building2 className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <span className="text-[12px] font-medium text-[#0d9488] tracking-wide uppercase block mb-1">Market Intelligence</span>
                      <h2 className="text-[28px] md:text-[36px] font-semibold text-[#0a0a0b] tracking-[-0.02em]">Real Estate Advisory</h2>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <p className="text-[16px] text-[#52525b] leading-[1.8]">
                      Our real estate intelligence combines financial analysis with direct operational experience in Switzerland and Italy.
                    </p>
                    <p className="text-[16px] text-[#52525b] leading-[1.8]">
                      We analyse opportunities in markets such as Lugano, Chiasso, Venice, Como, Udine and Rome, focusing on yield, risk, cash flow and strategic allocation.
                    </p>
                    <p className="text-[16px] text-[#52525b] leading-[1.8]">
                      Real estate is treated as part of a broader multi-asset framework, not as an isolated investment.
                    </p>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 bg-[#0d9488] text-white px-6 py-3.5 rounded-xl text-[15px] font-semibold hover:bg-[#0f766e] transition-all duration-300 group shadow-lg shadow-[#0d9488]/20"
                  >
                    Contact us
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {['Lugano', 'Venice', 'Como', 'Rome'].map((city) => (
                    <div key={city} className="bg-white rounded-2xl p-6 border border-[#e4e4e7] hover:border-[#0d9488]/30 hover:shadow-lg hover:shadow-[#0d9488]/5 transition-all duration-300 text-center">
                      <Building2 className="w-8 h-8 text-[#0d9488] mx-auto mb-3" />
                      <h4 className="text-[15px] font-semibold text-[#0a0a0b]">{city}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Strategic Network & Access */}
        <section id="strategic-network" className="intel-section w-full py-12 md:py-24 px-6 md:px-12 bg-[#fafafa]">
          <div className="max-w-[1200px] mx-auto">
            <div className="section-content">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0d9488] to-[#0f766e] rounded-2xl flex items-center justify-center shadow-lg shadow-[#0d9488]/20">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-[28px] md:text-[36px] font-semibold text-[#0a0a0b] tracking-[-0.02em]">Strategic Network & Access</h2>
                  </div>

                  <div className="space-y-4 mb-8">
                    <p className="text-[16px] text-[#52525b] leading-[1.8]">
                      Gamma Capital operates within a selective network of professionals across finance, real estate and alternative investments.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-[#e4e4e7] mb-8">
                    <h4 className="text-[15px] font-semibold text-[#0a0a0b] mb-4">This network provides access to:</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-[#0d9488] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-[15px] text-[#52525b]">High-level market insight</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-[#0d9488] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-[15px] text-[#52525b]">Experienced operators</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-[#0d9488] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-[15px] text-[#52525b]">Strategic alignment and introductions, where appropriate</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-[16px] text-[#52525b] leading-[1.8] italic border-l-4 border-[#0d9488] pl-4 mb-8">
                    Not a service, but a strategic advantage for selected clients.
                  </p>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 bg-[#0d9488] text-white px-6 py-3.5 rounded-xl text-[15px] font-semibold hover:bg-[#0f766e] transition-all duration-300 group shadow-lg shadow-[#0d9488]/20"
                  >
                    Contact us
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className="flex items-center justify-center">
                  <div className="relative w-full max-w-[400px] aspect-square">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0d9488]/10 to-[#0d9488]/5 rounded-3xl"></div>
                    <div className="absolute inset-4 bg-white rounded-2xl border border-[#e4e4e7] flex items-center justify-center">
                      <Users className="w-24 h-24 text-[#0d9488]/20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Closing Section */}
        <section className="closing-section w-full bg-gradient-to-b from-[#0a0a0b] to-[#18181b] py-16 md:py-24 px-6 md:px-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          {/* Gradient Orb */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0d9488]/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-[800px] mx-auto text-center relative z-10">
            <h2 className="text-[28px] md:text-[36px] font-medium text-white mb-6 tracking-[-0.02em]">
              Institutional insight, applied with clarity.
            </h2>
            <p className="text-[17px] text-[#a1a1aa] mb-10 leading-relaxed max-w-xl mx-auto">
              Ready to leverage our market intelligence for your investment process?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-[#0d9488] text-white px-8 py-4 rounded-xl text-[15px] font-semibold hover:bg-[#0f766e] transition-all duration-300 group shadow-lg shadow-[#0d9488]/20"
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
