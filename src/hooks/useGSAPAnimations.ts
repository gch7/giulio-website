"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useFadeInUp(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        delay,
        ease: "power3.out" 
      }
    );
  }, [delay]);

  return ref;
}

export function useStaggerFadeIn(staggerDelay = 0.1, startDelay = 0) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const children = containerRef.current.children;
    
    gsap.fromTo(
      children,
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: staggerDelay,
        delay: startDelay,
        ease: "power3.out" 
      }
    );
  }, [staggerDelay, startDelay]);

  return containerRef;
}

export function useScrollFadeIn() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 60 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return ref;
}

export function useScrollStagger(staggerDelay = 0.15) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const children = containerRef.current.children;
    
    gsap.fromTo(
      children,
      { opacity: 0, y: 50, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.8,
        stagger: staggerDelay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [staggerDelay]);

  return containerRef;
}

export function useTextReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    
    gsap.fromTo(
      ref.current,
      { 
        opacity: 0, 
        y: 80,
        clipPath: "inset(100% 0% 0% 0%)"
      },
      { 
        opacity: 1, 
        y: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return ref;
}

export function useParallax(speed = 0.5) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    
    gsap.to(ref.current, {
      y: () => speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }, [speed]);

  return ref;
}

export function useScaleIn() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    
    gsap.fromTo(
      ref.current,
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1,
        duration: 1,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return ref;
}

export function useCountUp(endValue: number, duration = 2) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    
    const obj = { value: 0 };
    
    gsap.to(obj, {
      value: endValue,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.round(obj.value).toLocaleString();
        }
      }
    });
  }, [endValue, duration]);

  return ref;
}

export function useMagneticHover(strength = 0.3) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    const el = ref.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    };
    
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return ref;
}

export function useSlideIn(direction: "left" | "right" | "up" | "down" = "up") {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    
    const directions = {
      left: { x: -100, y: 0 },
      right: { x: 100, y: 0 },
      up: { x: 0, y: 100 },
      down: { x: 0, y: -100 }
    };
    
    gsap.fromTo(
      ref.current,
      { 
        opacity: 0, 
        ...directions[direction]
      },
      { 
        opacity: 1, 
        x: 0, 
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [direction]);

  return ref;
}
