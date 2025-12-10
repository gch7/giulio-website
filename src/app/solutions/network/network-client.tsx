'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import NavigationHeader from "@/components/sections/navigation-header";
import Footer from "@/components/sections/footer";
import { Network, Users, Briefcase, Calendar, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Briefcase,
    title: "Deal Flow Access",
    description: "Get early access to curated investment opportunities across multiple asset classes from our network of partners and institutions.",
    features: ["Pre-vetted opportunities", "Private placements", "Co-investment deals", "Early-stage access"],
  },
  {
    icon: Users,
    title: "Institutional Connections",
    description: "Connect with fund managers, family offices, and institutional investors through our exclusive network.",
    features: ["Fund manager introductions", "Family office access", "LP connections", "Strategic partnerships"],
  },
  {
    icon: Calendar,
    title: "Exclusive Events",
    description: "Attend invite-only events, roundtables, and conferences featuring industry leaders and top performers.",
    features: ["Private dinners", "Investment summits", "Expert roundtables", "Networking sessions"],
  },
];

export default function NetworkClient() {
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
        <section ref={heroRef} className="w-full bg-[#fafafa] py-24 px-6 md:px-12">
          <div className="max-w-[1200px] mx-auto text-center">
            <div ref={badgeRef} className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0d9488]/10 border border-[#0d9488]/20 rounded-full mb-8">
              <Network className="w-4 h-4 text-[#0d9488]" />
              <span className="text-[12px] font-medium text-[#0d9488] tracking-wide uppercase">Strategic Network</span>
            </div>
            <h1 ref={titleRef} className="text-[36px] md:text-[48px] font-medium tracking-[-0.03em] leading-[1.1] mb-6 text-[#0a0a0b]">
              Exclusive Access<br />
              <span className="text-[#71717a]">& Strategic Connections</span>
            </h1>
            <p ref={paragraphRef} className="text-[17px] text-[#71717a] font-normal leading-relaxed max-w-xl mx-auto mb-10">
              Unlock opportunities through our curated network of institutional investors, fund managers, and exclusive deal flow.
            </p>
            <Link 
              ref={ctaButtonRef}
              href="/contact" 
              className="inline-block bg-[#0a0a0b] text-white px-7 py-3.5 rounded-md text-[14px] font-semibold hover:bg-[#27272a] transition-colors"
            >
              Request Access
            </Link>
          </div>
        </section>

        <section className="w-full bg-[#fafafa] py-12 px-6 md:px-12">
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

        <section ref={ctaRef} className="w-full bg-[#f4f4f5] py-20 px-6 md:px-12 border-t border-[#e4e4e7]">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-[28px] md:text-[36px] font-medium text-[#0a0a0b] mb-5">Ready to Expand Your Network?</h2>
            <p className="text-[16px] text-[#71717a] mb-8">
              Connect with us to learn more about accessing our exclusive network and deal flow opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                href="/contact" 
                className="bg-[#0a0a0b] text-white px-7 py-3.5 rounded-md text-[14px] font-semibold hover:bg-[#27272a] transition-colors"
              >
                Contact Us
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
