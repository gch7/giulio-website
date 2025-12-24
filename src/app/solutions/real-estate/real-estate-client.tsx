'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import NavigationHeader from "@/components/sections/navigation-header";
import Footer from "@/components/sections/footer";
import { Building2, TrendingUp, FileSearch, MapPin, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: TrendingUp,
    title: "Market Analysis",
    description: "Comprehensive market research covering trends, pricing dynamics, and emerging opportunities across different property types and regions.",
    features: ["Regional market reports", "Price trend analysis", "Supply/demand metrics", "Growth forecasts"],
  },
  {
    icon: FileSearch,
    title: "Due Diligence",
    description: "Thorough property and deal analysis to help you make informed investment decisions with confidence.",
    features: ["Financial modeling", "Risk assessment", "Comparable analysis", "Investment thesis review"],
  },
  {
    icon: MapPin,
    title: "Investment Strategy",
    description: "Tailored strategies aligned with your goals, whether for income generation, capital appreciation, or portfolio diversification.",
    features: ["Portfolio allocation", "Asset class selection", "Entry/exit timing", "Tax optimization"],
  },
];

export default function RealEstateClient() {
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: -20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7 }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 50, clipPath: "inset(100% 0% 0% 0%)" },
        { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.9 },
        "-=0.4"
      )
      .fromTo(
        paragraphRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.5"
      )
      .fromTo(
        ctaButtonRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 },
        "-=0.4"
      );

    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <NavigationHeader />
      <main>
        <section ref={heroRef} className="w-full bg-[#fafafa] py-12 md:py-24 px-6 md:px-12">
          <div className="max-w-[1200px] mx-auto text-center">
            <div ref={badgeRef} className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0d9488]/10 border border-[#0d9488]/20 rounded-full mb-8">
              <Building2 className="w-4 h-4 text-[#0d9488]" />
              <span className="text-[12px] font-medium text-[#0d9488] tracking-wide uppercase">Real Estate Advisory</span>
            </div>
            <h1 ref={titleRef} className="text-[36px] md:text-[48px] font-medium tracking-[-0.03em] leading-[1.1] mb-6 text-[#0a0a0b]">
              Strategic Real Estate<br />
              <span className="text-[#71717a]">Investment Guidance</span>
            </h1>
            <p ref={paragraphRef} className="text-[17px] text-[#71717a] font-normal leading-relaxed max-w-xl mx-auto mb-10">
              Navigate the real estate market with confidence through data-driven analysis and strategic advisory tailored to your investment goals.
            </p>
            <Link
              ref={ctaButtonRef}
              href="/contact"
              className="inline-block bg-[#0a0a0b] text-white px-7 py-3.5 rounded-md text-[14px] font-semibold hover:bg-[#27272a] transition-colors"
            >
              Schedule a Consultation
            </Link>
          </div>
        </section>

        <section className="w-full bg-[#fafafa] py-8 md:py-12 px-6 md:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div key={index} className="border border-[#e4e4e7] rounded-xl p-7 bg-white">
                    <div className="w-10 h-10 bg-[#f4f4f5] border border-[#e4e4e7] rounded-lg flex items-center justify-center mb-5">
                      <IconComponent className="w-5 h-5 text-[#0d9488]" />
                    </div>
                    <h3 className="text-[18px] font-semibold text-[#0a0a0b] mb-3">{service.title}</h3>
                    <p className="text-[14px] text-[#71717a] leading-relaxed mb-5">{service.description}</p>
                    <ul className="flex flex-col gap-2.5">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <Check className="w-3.5 h-3.5 text-[#0d9488] flex-shrink-0" />
                          <span className="text-[13px] text-[#52525b]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section ref={ctaRef} className="w-full bg-[#f4f4f5] py-12 md:py-20 px-6 md:px-12 border-t border-[#e4e4e7]">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-[28px] md:text-[36px] font-medium text-[#0a0a0b] mb-5">Ready to Invest Smarter?</h2>
            <p className="text-[16px] text-[#71717a] mb-8">
              Let us help you navigate the real estate market with confidence and make informed investment decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="bg-[#0a0a0b] text-white px-7 py-3.5 rounded-md text-[14px] font-semibold hover:bg-[#27272a] transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/solutions"
                className="bg-transparent text-[#0a0a0b] px-7 py-3.5 rounded-md text-[14px] font-medium border border-[#e4e4e7] hover:border-[#a1a1aa] hover:bg-white transition-colors"
              >
                View All Solutions
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
