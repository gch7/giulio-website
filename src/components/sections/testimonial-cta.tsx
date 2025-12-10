'use client';

import Link from 'next/link';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse"
      },
      defaults: { ease: "power3.out" }
    });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7 }
    )
    .fromTo(
      titleRef.current,
      { opacity: 0, y: 50, clipPath: "inset(100% 0% 0% 0%)" },
      { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
      "-=0.4"
    )
    .fromTo(
      paragraphRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.6"
    );

    if (buttonsRef.current) {
      tl.fromTo(
        buttonsRef.current.children,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1 },
        "-=0.4"
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#111113] py-24 px-6 md:px-12 border-t border-[#1a1a1d]">
      <div className="max-w-[900px] mx-auto text-center">
        <div ref={badgeRef} className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1d] border border-[#27272a] rounded-full mb-8">
          <span className="text-[12px] font-medium text-[#71717a] tracking-wide">Trusted by institutional investors</span>
        </div>
        <h2 ref={titleRef} className="text-[32px] md:text-[44px] font-medium tracking-[-0.02em] leading-[1.15] mb-6 text-white">
          Ready to Gain an Edge<br />
          <span className="text-[#71717a]">in Today's Markets?</span>
        </h2>
        <p ref={paragraphRef} className="text-[17px] text-[#52525b] font-normal leading-relaxed max-w-xl mx-auto mb-10">
          Join our community of sophisticated investors gaining access to institutional-grade insights and personalized guidance.
        </p>
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link 
            href="/memberships" 
            className="bg-white text-[#0a0a0b] px-7 py-3.5 rounded-md text-[14px] font-semibold hover:bg-[#e4e4e7] transition-colors"
          >
            Explore Memberships
          </Link>
          <Link 
            href="/contact" 
            className="bg-transparent text-white px-7 py-3.5 rounded-md text-[14px] font-medium border border-[#27272a] hover:border-[#52525b] hover:bg-[#1a1a1d] transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}