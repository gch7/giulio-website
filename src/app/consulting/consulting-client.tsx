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
  Zap
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Service navigation items
const serviceNavItems = [
  { id: 'portfolio-review', title: 'Portfolio Review', icon: PieChart },
  { id: 'strategy-design', title: 'Strategy Design', icon: Compass },
  { id: 'options', title: 'Options', icon: TrendingUp },
  { id: 'structured-products', title: 'Structured Products', icon: Shield },
  { id: 'real-estate', title: 'Real Estate & Other Assets', icon: Building2 },
  { id: 'crypto', title: 'Crypto', icon: Bitcoin },
];

// Feature data for each section
const portfolioFeatures = [
  { icon: BarChart3, title: 'Multi-Asset Analysis', desc: 'Equities, options, ETFs, fixed income, crypto & more' },
  { icon: Target, title: 'Stress Testing', desc: 'Scenario analysis and VaR/CVaR modelling' },
  { icon: Activity, title: 'Correlation Mapping', desc: 'Identify hidden risks and inefficiencies' },
];

const strategyFeatures = [
  { icon: Lightbulb, title: 'Options-Driven', desc: 'Integrating short-term tactics with long-term positioning' },
  { icon: Layers, title: 'Bespoke Architecture', desc: 'Built around your objectives and risk tolerance' },
  { icon: Zap, title: 'Algorithm Design', desc: 'Systematise execution and signal logic' },
];

const optionsFeatures = [
  { icon: LineChart, title: 'Flow Analysis', desc: 'Monitor institutional-grade options flow' },
  { icon: Activity, title: 'GEX & Greeks', desc: 'Delta hedging, vanna/charm effects' },
  { icon: Target, title: 'Volatility Regimes', desc: 'Skew, term structure analysis' },
];

const structuredFeatures = [
  { icon: Shield, title: 'Product Evaluation', desc: 'Autocallables, Phoenix notes, express products' },
  { icon: Layers, title: 'Payoff Design', desc: 'Risk transfer and hedging analysis' },
  { icon: TrendingUp, title: 'Options Replication', desc: 'Enhanced flexibility and efficiency' },
];

const realEstateFeatures = [
  { icon: Map, title: 'Switzerland & Italy', desc: 'Deep expertise in key markets' },
  { icon: BarChart3, title: 'Yield Modelling', desc: 'Cash-flow projections and risk mapping' },
  { icon: Wallet, title: 'Strategic Integration', desc: 'Multi-asset portfolio approach' },
];

const cryptoFeatures = [
  { icon: Activity, title: 'Market Structure', desc: 'Liquidity cycles and macro correlations' },
  { icon: Target, title: 'Risk Sizing', desc: 'Measured positioning and structural awareness' },
  { icon: Layers, title: 'Network Insights', desc: 'Access to experienced crypto professionals' },
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

      gsap.fromTo(
        section.querySelectorAll('.feature-card'),
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
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

  // Feature Card Component
  const FeatureCard = ({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) => (
    <div className="feature-card group bg-white rounded-2xl p-6 border border-[#e4e4e7] hover:border-[#0d9488]/30 hover:shadow-lg hover:shadow-[#0d9488]/5 transition-all duration-300">
      <div className="w-12 h-12 bg-gradient-to-br from-[#0d9488]/10 to-[#0d9488]/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 text-[#0d9488]" />
      </div>
      <h4 className="text-[16px] font-semibold text-[#0a0a0b] mb-2">{title}</h4>
      <p className="text-[14px] text-[#71717a] leading-relaxed">{desc}</p>
    </div>
  );

  // Service Section Component
  const ServiceSection = ({
    id,
    icon: Icon,
    title,
    description,
    highlight,
    features,
    bgAlt = false,
    iconGradient = "from-[#0d9488] to-[#0f766e]",
    shadowColor = "shadow-[#0d9488]/20"
  }: {
    id: string;
    icon: React.ElementType;
    title: string;
    description: string[];
    highlight: string;
    features: { icon: React.ElementType; title: string; desc: string }[];
    bgAlt?: boolean;
    iconGradient?: string;
    shadowColor?: string;
  }) => (
    <section id={id} className={`service-section w-full py-24 px-6 md:px-12 ${bgAlt ? 'bg-[#f4f4f5]' : 'bg-[#fafafa]'}`}>
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Content */}
          <div className="section-content">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 bg-gradient-to-br ${iconGradient} rounded-2xl flex items-center justify-center shadow-lg ${shadowColor}`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-[28px] md:text-[36px] font-semibold text-[#0a0a0b] tracking-[-0.02em]">{title}</h2>
            </div>

            <div className="space-y-4 mb-8">
              {description.map((text, index) => (
                <p key={index} className="text-[16px] text-[#52525b] leading-[1.8]">
                  {text}
                </p>
              ))}
            </div>

            {/* Highlight Box */}
            <div className="bg-gradient-to-r from-[#0d9488]/5 to-transparent border-l-4 border-[#0d9488] pl-5 py-4 pr-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0d9488] mt-0.5 flex-shrink-0" />
                <p className="text-[15px] text-[#0a0a0b] font-medium leading-relaxed">
                  {highlight}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Feature Cards */}
          <div className="grid sm:grid-cols-1 gap-4">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );

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

          {/* Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#0d9488]/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#0d9488]/5 rounded-full blur-[100px] pointer-events-none"></div>

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

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
              <div className="text-center">
                <div className="text-[32px] md:text-[40px] font-bold text-white mb-1">6</div>
                <div className="text-[13px] text-[#71717a] uppercase tracking-wider">Core Services</div>
              </div>
              <div className="text-center">
                <div className="text-[32px] md:text-[40px] font-bold text-white mb-1">Multi-Asset</div>
                <div className="text-[13px] text-[#71717a] uppercase tracking-wider">Coverage</div>
              </div>
              <div className="text-center">
                <div className="text-[32px] md:text-[40px] font-bold text-white mb-1">Institutional</div>
                <div className="text-[13px] text-[#71717a] uppercase tracking-wider">Precision</div>
              </div>
            </div>

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
        <section id="service-nav" className="w-full bg-white py-16 px-6 md:px-12 border-b border-[#e4e4e7]">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-[24px] md:text-[28px] font-semibold text-[#0a0a0b] mb-3">Our Advisory Services</h2>
              <p className="text-[15px] text-[#71717a]">Click to explore each service in detail</p>
            </div>
            <div ref={navCardsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {serviceNavItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`group flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-300 text-center ${activeSection === item.id
                      ? 'bg-[#0d9488] border-[#0d9488] shadow-lg shadow-[#0d9488]/20'
                      : 'bg-white border-[#e4e4e7] hover:border-[#0d9488]/30 hover:shadow-md'
                      }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${activeSection === item.id
                      ? 'bg-white/20'
                      : 'bg-[#f4f4f5] group-hover:bg-[#0d9488]/10'
                      }`}>
                      <IconComponent className={`w-6 h-6 transition-colors ${activeSection === item.id
                        ? 'text-white'
                        : 'text-[#71717a] group-hover:text-[#0d9488]'
                        }`} />
                    </div>
                    <h3 className={`text-[13px] font-semibold leading-tight transition-colors ${activeSection === item.id
                      ? 'text-white'
                      : 'text-[#0a0a0b]'
                      }`}>
                      {item.title}
                    </h3>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Portfolio Review Section */}
        <ServiceSection
          id="portfolio-review"
          icon={PieChart}
          title="Portfolio Review"
          description={[
            "A disciplined, multi-asset review designed to reveal how your portfolio truly behaves.",
            "We analyse every component to identify hidden risks, inefficiencies and structural imbalances: equities, options, ETFs, fixed income, structured products, crypto, real estate and alternatives.",
            "Using institutional tools such as scenario analysis, stress testing, correlation mapping, VaR/CVaR and factor modelling, we highlight where performance is being lost and how risk can be repositioned."
          ]}
          highlight="The result is a clear, refined interpretation of your exposures and a practical roadmap to bring order, coherence and discipline to your investment process."
          features={portfolioFeatures}
        />

        {/* Strategy Design Section */}
        <ServiceSection
          id="strategy-design"
          icon={Compass}
          title="Strategy Design"
          description={[
            "We design investment strategies that combine institutional structure with private-investor flexibility.",
            "Our philosophy is opportunistic and options-driven, integrating short-term tactics with medium- and long-term positioning.",
            "Each strategy is built around your objectives, risk tolerance and liquidity profile, ranging from tailored frameworks to fully bespoke architectures."
          ]}
          highlight="Every strategy defines how to express an idea, how to size it, how to hedge it, and how to evolve it as conditions change — creating a disciplined, repeatable system rather than isolated trades."
          features={strategyFeatures}
          bgAlt={true}
        />

        {/* Options Section */}
        <ServiceSection
          id="options"
          icon={TrendingUp}
          title="Options"
          description={[
            "Options flow is the core of Gamma Capital. Our primary edge comes from monitoring and interpreting institutional-grade options flow and unusual activity.",
            "We connect flow to derivatives mechanics — GEX, delta hedging dynamics, vanna/charm effects, volatility regimes, skew, and term structure — to frame how options markets influence price action.",
          ]}
          highlight="Whether the objective is tactical exposure, yield enhancement, convexity management, or hedging, our approach translates complex market signals into clear, risk-aware frameworks — with the structure and precision of a professional derivatives desk."
          features={optionsFeatures}
        />

        {/* Structured Products Section */}
        <ServiceSection
          id="structured-products"
          icon={Shield}
          title="Structured Products"
          description={[
            "Our structured-product advisory blends academic depth with institutional insight gained through exposure to portfolio managers at UBS and studies at USI Lugano.",
            "We help investors evaluate and design a wide range of structures, from autocallables and Phoenix notes to reverse convertibles, express products and capital-protected solutions."
          ]}
          highlight="When appropriate, we replicate or enhance these payoffs using options to achieve greater flexibility and efficiency."
          features={structuredFeatures}
          bgAlt={true}
        />

        {/* Real Estate Section */}
        <ServiceSection
          id="real-estate"
          icon={Building2}
          title="Real Estate & Other Assets"
          description={[
            "Our real estate perspective is shaped by direct experience in Switzerland and Italy, with deep familiarity in markets such as Lugano, Chiasso, Venice, Como, Udine and Rome.",
            "We analyse property opportunities with the same rigor applied to financial assets — cash-flow projections, yield modelling, risk mapping, seasonality, and strategic integration within a broader portfolio."
          ]}
          highlight="From short-stay optimisation to long-term capital allocation, we help clients treat real estate not as isolated purchases but as deliberate components of a multi-asset strategy."
          features={realEstateFeatures}
        />

        {/* Crypto Section */}
        <ServiceSection
          id="crypto"
          icon={Bitcoin}
          title="Crypto"
          description={[
            "Active in the crypto markets since 2017, we bring historical context and institutional discipline to an asset class often dominated by noise.",
            "We focus on market structure, liquidity cycles, risk sizing, macro correlations and scenario-based positioning."
          ]}
          highlight="Crypto is approached not as speculation, but as an asymmetric asset requiring measured sizing, structural awareness and strategic integration within a diversified portfolio."
          features={cryptoFeatures}
          bgAlt={true}
          iconGradient="from-[#f59e0b] to-[#d97706]"
          shadowColor="shadow-[#f59e0b]/20"
        />

        {/* Final CTA Section */}
        <section className="w-full bg-gradient-to-b from-[#0a0a0b] to-[#18181b] py-24 px-6 md:px-12 relative overflow-hidden">
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
              <span className="text-[13px] font-medium text-white/70">Ready to Start?</span>
            </div>

            <h2 className="text-[32px] md:text-[42px] font-medium text-white mb-6 tracking-[-0.02em]">
              Ready to Elevate Your<br />Investment Process?
            </h2>
            <p className="text-[17px] text-[#a1a1aa] mb-10 leading-relaxed max-w-xl mx-auto">
              Schedule a consultation to discuss how Gamma Capital can bring institutional-level
              precision and clarity to your portfolio.
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
