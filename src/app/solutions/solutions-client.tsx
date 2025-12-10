'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import NavigationHeader from "@/components/sections/navigation-header";
import Footer from "@/components/sections/footer";
import { BarChart3, Users, Building2, Network, ArrowRight, TrendingUp, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const solutions = [
  {
    icon: BarChart3,
    title: 'Market Intelligence / Strategy Insights',
    description: 'Data-driven market analysis, research reports, and actionable insights to help you make informed investment decisions with confidence.',
    features: ['Deep market analysis', 'Sector research', 'Technical signals', 'Risk assessment'],
    href: '/solutions/strategy-insights',
    color: '#0d9488',
  },
  {
    icon: () => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    ),
    title: 'Discord Memberships',
    description: 'Join our exclusive community for real-time trade alerts, market discussions, and direct access to our research team.',
    features: ['Real-time alerts', 'Community access', 'Weekly webinars', 'Priority support'],
    href: '/memberships',
    color: '#5865F2',
  },
  {
    icon: Users,
    title: 'Consulting',
    description: 'Work directly with experienced analysts on portfolio reviews, strategy design, and risk framework development.',
    features: ['Portfolio review', 'Strategy design', 'Risk frameworks', '1-on-1 sessions'],
    href: '/consulting',
    color: '#0d9488',
  },
  {
    icon: Building2,
    title: 'Real Estate Advisory',
    description: 'Strategic guidance for real estate investments including market analysis, due diligence, and portfolio optimization.',
    features: ['Market analysis', 'Due diligence', 'Investment strategy', 'Portfolio diversification'],
    href: '/solutions/real-estate',
    color: '#0d9488',
  },
  {
    icon: Network,
    title: 'Strategic Network / Access',
    description: 'Gain access to exclusive deal flow, institutional connections, and curated investment opportunities.',
    features: ['Deal flow access', 'Institutional connections', 'Co-investment opportunities', 'Exclusive events'],
    href: '/solutions/network',
    color: '#0d9488',
  },
];

export default function SolutionsPageClient() {
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
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
    );

    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
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
        <section ref={heroRef} className="w-full bg-[#fafafa] py-24 px-6 md:px-12">
          <div className="max-w-[1200px] mx-auto text-center">
            <div ref={badgeRef} className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0d9488]/10 border border-[#0d9488]/20 rounded-full mb-8">
              <TrendingUp className="w-4 h-4 text-[#0d9488]" />
              <span className="text-[12px] font-medium text-[#0d9488] tracking-wide uppercase">Our Solutions</span>
            </div>
            <h1 ref={titleRef} className="text-[36px] md:text-[48px] font-medium tracking-[-0.03em] leading-[1.1] mb-6 text-[#0a0a0b]">
              Comprehensive<br />
              <span className="text-[#71717a]">Investment Solutions</span>
            </h1>
            <p ref={paragraphRef} className="text-[17px] text-[#71717a] font-normal leading-relaxed max-w-xl mx-auto">
              From market intelligence to personalized consulting, we provide the tools and insights you need to succeed in today&apos;s markets.
            </p>
          </div>
        </section>

        <section className="w-full bg-[#fafafa] pb-20 px-6 md:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div ref={cardsRef} className="flex flex-col gap-6">
              {solutions.map((solution, index) => {
                const IconComponent = solution.icon;
                return (
                  <Link
                    key={index}
                    href={solution.href}
                    className="group relative border border-[#e4e4e7] rounded-xl p-8 bg-white hover:border-[#0a0a0b]/20 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      <div className="flex-shrink-0">
                        <div 
                          className="w-14 h-14 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${solution.color}15` }}
                        >
                          <div style={{ color: solution.color }}>
                            <IconComponent className="w-6 h-6" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-[20px] font-semibold text-[#0a0a0b] mb-2">{solution.title}</h3>
                        <p className="text-[15px] text-[#71717a] leading-relaxed mb-4">{solution.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {solution.features.map((feature, i) => (
                            <span 
                              key={i} 
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f4f4f5] border border-[#e4e4e7] rounded-full text-[12px] text-[#52525b]"
                            >
                              <Shield className="w-3 h-3 text-[#0d9488]" />
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex-shrink-0 lg:self-center">
                        <div className="inline-flex items-center gap-2 text-[#0d9488] font-medium text-[14px] group-hover:gap-3 transition-all">
                          <span>Explore</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section ref={ctaRef} className="w-full bg-[#f4f4f5] py-20 px-6 md:px-12 border-t border-[#e4e4e7]">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-[28px] md:text-[36px] font-medium text-[#0a0a0b] mb-5">Not Sure Where to Start?</h2>
            <p className="text-[16px] text-[#71717a] mb-8">
              Book a free consultation call to discuss your goals and find the right solution for your investment needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                href="/contact" 
                className="bg-[#0a0a0b] text-white px-7 py-3.5 rounded-md text-[14px] font-semibold hover:bg-[#27272a] transition-colors"
              >
                Schedule a Call
              </Link>
              <Link 
                href="/memberships" 
                className="bg-transparent text-[#0a0a0b] px-7 py-3.5 rounded-md text-[14px] font-medium border border-[#e4e4e7] hover:border-[#a1a1aa] hover:bg-white transition-colors"
              >
                View Memberships
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
