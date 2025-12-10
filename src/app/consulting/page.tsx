'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import NavigationHeader from "@/components/sections/navigation-header";
import Footer from "@/components/sections/footer";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Portfolio Review",
    description: "Comprehensive analysis of your current holdings with actionable recommendations for optimization and risk reduction.",
    features: [
      "Position sizing analysis",
      "Sector allocation review",
      "Correlation assessment",
      "Rebalancing recommendations",
    ],
  },
  {
    title: "Strategy Design",
    description: "Custom investment strategy development tailored to your goals, risk tolerance, and market outlook.",
    features: [
      "Goal-based planning",
      "Entry & exit criteria",
      "Asset selection framework",
      "Performance benchmarks",
    ],
  },
  {
    title: "Risk Frameworks",
    description: "Develop robust risk management systems to protect your capital during market volatility.",
    features: [
      "Stop-loss strategies",
      "Position sizing rules",
      "Hedging techniques",
      "Drawdown management",
    ],
  },
];

export default function ConsultingPage() {
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLElement>(null);
  const finalCtaRef = useRef<HTMLElement>(null);

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

    if (stepsRef.current) {
      const steps = stepsRef.current.querySelectorAll('.step-item');
      gsap.fromTo(
        steps,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    gsap.fromTo(
      finalCtaRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: finalCtaRef.current,
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
            <div ref={badgeRef} className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#9a7b1a]/10 border border-[#9a7b1a]/20 rounded-full mb-8">
              <span className="w-1.5 h-1.5 bg-[#9a7b1a] rounded-full"></span>
              <span className="text-[12px] font-medium text-[#9a7b1a] tracking-wide uppercase">Expert Advisory</span>
            </div>
            <h1 ref={titleRef} className="text-[36px] md:text-[48px] font-medium tracking-[-0.03em] leading-[1.1] mb-6 text-[#0a0a0b]">
              Personalized<br />
              <span className="text-[#71717a]">Consulting Solutions</span>
            </h1>
            <p ref={paragraphRef} className="text-[17px] text-[#71717a] font-normal leading-relaxed max-w-xl mx-auto mb-10">
              Work directly with our team of experienced analysts to optimize your investment approach and build robust strategies.
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

        <section className="w-full bg-[#fafafa] py-12 px-6 md:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {services.map((service, index) => (
                <div key={index} className="border border-[#e4e4e7] rounded-xl p-7 bg-white card-hover">
                  <div className="w-10 h-10 bg-[#f4f4f5] border border-[#e4e4e7] rounded-lg flex items-center justify-center mb-5">
                    <svg className="w-5 h-5 text-[#9a7b1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-[18px] font-semibold text-[#0a0a0b] mb-3">{service.title}</h3>
                  <p className="text-[14px] text-[#71717a] leading-relaxed mb-5">{service.description}</p>
                  <ul className="flex flex-col gap-2.5">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <svg className="w-3.5 h-3.5 text-[#9a7b1a] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[13px] text-[#52525b]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={stepsRef} className="w-full bg-[#f4f4f5] py-20 px-6 md:px-12 border-t border-[#e4e4e7]">
          <div className="max-w-[700px] mx-auto">
            <h2 className="text-[28px] font-semibold text-center mb-4 text-[#0a0a0b]">How It Works</h2>
            <p className="text-center text-[#71717a] mb-12 text-[15px]">Simple process to get started with our consulting services</p>
            
            <div className="flex flex-col gap-6">
              {[
                { step: "01", title: "Initial Consultation", desc: "Schedule a free 30-minute call to discuss your goals and current situation." },
                { step: "02", title: "Custom Proposal", desc: "Receive a tailored proposal outlining the scope, timeline, and investment." },
                { step: "03", title: "Deep Dive Analysis", desc: "Our team conducts thorough research and analysis specific to your needs." },
                { step: "04", title: "Strategy Delivery", desc: "Receive comprehensive deliverables with ongoing support for implementation." },
              ].map((item, index) => (
                <div key={index} className="step-item flex gap-5 items-start">
                  <div className="w-10 h-10 bg-white border border-[#e4e4e7] text-[#9a7b1a] rounded-lg flex items-center justify-center flex-shrink-0 text-[13px] font-semibold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-[16px] font-semibold text-[#0a0a0b] mb-1">{item.title}</h3>
                    <p className="text-[14px] text-[#71717a]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={finalCtaRef} className="w-full bg-[#fafafa] py-20 px-6 md:px-12 border-t border-[#e4e4e7]">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-[28px] md:text-[36px] font-medium text-[#0a0a0b] mb-5">Ready to Get Started?</h2>
            <p className="text-[16px] text-[#71717a] mb-8">
              Book a free consultation call to discuss how we can help you achieve your investment goals.
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-[#0a0a0b] text-white px-7 py-3.5 rounded-md text-[14px] font-semibold hover:bg-[#27272a] transition-colors"
            >
              Contact Us Today
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}