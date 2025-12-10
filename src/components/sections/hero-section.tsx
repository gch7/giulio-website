'use client';

import Link from 'next/link';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Threads from '../Threads';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty('--x', `${e.clientX - rect.left}px`);
    btn.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: -20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8 }
    );

    if (titleRef.current) {
      const titles = titleRef.current.querySelectorAll('h1, h2');
      tl.fromTo(
        titles,
        { opacity: 0, y: 60, clipPath: "inset(100% 0% 0% 0%)" },
        { 
          opacity: 1, 
          y: 0, 
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          stagger: 0.15 
        },
        "-=0.5"
      );
    }

    tl.fromTo(
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

    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 60, scale: 0.95 },
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

    if (statsRef.current) {
      const statItems = statsRef.current.querySelectorAll('.stat-item');
      
      gsap.fromTo(
        statItems,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      const numbers = statsRef.current.querySelectorAll('.stat-number');
      numbers.forEach((num) => {
        const text = num.textContent || '';
        const match = text.match(/[\d.]+/);
        if (match) {
          const endValue = parseFloat(match[0]);
          const prefix = text.slice(0, text.indexOf(match[0]));
          const suffix = text.slice(text.indexOf(match[0]) + match[0].length);
          
          gsap.fromTo(
            { val: 0 },
            { val: endValue },
            {
              val: endValue,
              duration: 2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: statsRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse"
              },
              onUpdate: function() {
                const currentVal = this.targets()[0].val;
                const formatted = endValue % 1 === 0 
                  ? Math.round(currentVal).toLocaleString()
                  : currentVal.toFixed(1);
                (num as HTMLElement).textContent = prefix + formatted + suffix;
              }
            }
          );
        }
      });
    }
  }, []);

  return (
    <div className="relative w-full min-h-[1100px]">
      <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <Threads
          amplitude={1}
          distance={0}
          enableMouseInteraction={true}
        />
      </div>
      
      <section ref={sectionRef} className="sm:px-6 lg:px-8 md:py-24 w-full max-w-7xl mx-auto pt-16 px-4 pb-20 relative" style={{ zIndex: 1 }}>
        <div style={{ zIndex: 1 }}>
          <div ref={badgeRef} className="flex items-center justify-center">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wide border rounded-full px-3 py-1 text-slate-300/80 bg-white/5 border-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-[#c9a227]">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
              </svg>
              Institutional Intelligence
            </span>
          </div>

          <div ref={titleRef} className="text-center max-w-3xl mt-6 mx-auto">
            <h1 className="md:text-6xl text-4xl font-semibold text-slate-50 tracking-tight">Market Intelligence for</h1>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-slate-50 mt-1">
              <span className="bg-clip-text text-transparent italic font-['Playfair_Display'] bg-gradient-to-r from-slate-200 via-[#c9a227] to-[#e8d48a]">
                Sophisticated Investors
              </span>
            </h2>
            <p ref={paragraphRef} className="mt-6 text-base md:text-lg text-slate-400 max-w-xl mx-auto">
              Gamma Capital delivers institutional-grade research, exclusive community access, and personalized consulting to elevate your investment strategy.
            </p>

            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <div className="relative inline-block group">
                <button
                  ref={buttonRef}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={(e) => e.currentTarget.style.setProperty('--o', '1')}
                  onMouseLeave={(e) => e.currentTarget.style.setProperty('--o', '0')}
                  className="btn-glow relative z-10 overflow-hidden transition-transform duration-150 ease-out active:scale-[0.98] text-white bg-neutral-900/60 border-white/20 border rounded-xl py-3.5 px-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                >
                  <Link href="/memberships" className="relative z-10 inline-flex items-center gap-2 font-semibold text-[14px]">
                    View Memberships
                    <svg className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <span className="pointer-events-none absolute bottom-0 left-1/2 right-1/2 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80 transition-[left,right] duration-500 ease-out group-hover:left-0 group-hover:right-0" />
                  <span className="glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
                </button>
                <span 
                  aria-hidden="true" 
                  className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 h-6 w-52 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: 'radial-gradient(60% 100% at 50% 50%, rgba(201,162,39,.45), rgba(201,162,39,.22) 35%, transparent 70%)',
                    filter: 'blur(10px) saturate(120%)'
                  }}
                />
              </div>

              <Link 
                href="/consulting" 
                className="bg-transparent text-white px-7 py-3.5 rounded-xl text-[14px] font-medium border border-[#27272a] hover:border-[#52525b] hover:bg-[#111113] transition-colors"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full mt-20">
          <Link href="/solutions/strategy-insights" className="group relative border border-white/10 rounded-xl p-7 bg-white/5 backdrop-blur-xl hover:border-white/20 hover:bg-white/[0.08] card-hover flex flex-col h-full transition-all duration-300">
            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center mb-5">
              <svg className="w-5 h-5 text-[#c9a227]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-[18px] font-semibold leading-[1.3] mb-2 tracking-tight text-white">
              Strategy Insights
            </h3>
            <p className="text-[14px] leading-relaxed text-[#71717a] mb-5 flex-1">
              Data-driven market analysis and actionable intelligence for informed decisions.
            </p>
            <div className="flex items-center gap-2 text-[#c9a227] font-medium text-[13px]">
              <span>Learn more</span>
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link href="/memberships" className="group relative border border-white/10 rounded-xl p-7 bg-white/5 backdrop-blur-xl hover:border-white/20 hover:bg-white/[0.08] card-hover flex flex-col h-full transition-all duration-300">
            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center mb-5">
              <svg className="w-5 h-5 text-[#c9a227]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </div>
            <h3 className="text-[18px] font-semibold leading-[1.3] mb-2 tracking-tight text-white">
              Discord Community
            </h3>
            <p className="text-[14px] leading-relaxed text-[#71717a] mb-5 flex-1">
              Real-time alerts, market discussions, and direct access to our research team.
            </p>
            <div className="flex items-center gap-2 text-[#c9a227] font-medium text-[13px]">
              <span>View plans</span>
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link href="/consulting" className="group relative border border-white/10 rounded-xl p-7 bg-white/5 backdrop-blur-xl hover:border-white/20 hover:bg-white/[0.08] card-hover flex flex-col h-full transition-all duration-300">
            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center mb-5">
              <svg className="w-5 h-5 text-[#c9a227]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-[18px] font-semibold leading-[1.3] mb-2 tracking-tight text-white">
              Advisory Services
            </h3>
            <p className="text-[14px] leading-relaxed text-[#71717a] mb-5 flex-1">
              Portfolio review, strategy design, and risk framework development.
            </p>
            <div className="flex items-center gap-2 text-[#c9a227] font-medium text-[13px]">
              <span>Get started</span>
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>

        <div ref={statsRef} className="mt-20 pt-16 border-t border-[#1a1a1d]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center stat-item">
              <div className="text-[32px] md:text-[40px] font-semibold text-white tracking-tight stat-number">500+</div>
              <div className="text-[13px] text-[#52525b] mt-1 uppercase tracking-wider">Active Members</div>
            </div>
            <div className="text-center stat-item">
              <div className="text-[32px] md:text-[40px] font-semibold text-white tracking-tight stat-number">$2.1B</div>
              <div className="text-[13px] text-[#52525b] mt-1 uppercase tracking-wider">AUM Advised</div>
            </div>
            <div className="text-center stat-item">
              <div className="text-[32px] md:text-[40px] font-semibold text-white tracking-tight stat-number">12+</div>
              <div className="text-[13px] text-[#52525b] mt-1 uppercase tracking-wider">Years Experience</div>
            </div>
            <div className="text-center stat-item">
              <div className="text-[32px] md:text-[40px] font-semibold text-white tracking-tight stat-number">94%</div>
              <div className="text-[13px] text-[#52525b] mt-1 uppercase tracking-wider">Client Retention</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}