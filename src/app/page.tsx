import NavigationHeader from "@/components/sections/navigation-header";
import HeroSection from "@/components/sections/hero-section";
import WhatWeDo from "@/components/sections/what-we-do";
import TestimonialCTA from "@/components/sections/testimonial-cta";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <NavigationHeader />
      <main>
        <HeroSection />
        <WhatWeDo />
        <TestimonialCTA />
      </main>
      <Footer />
    </div>
  );
}