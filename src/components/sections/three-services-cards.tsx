'use client';

import Link from 'next/link';
import { BarChart3, Users, Building2, Network, Rocket, ChevronRight, type LucideIcon } from 'lucide-react';
import type { ThreeCardsSectionData, ServiceCard as ServiceCardType } from '@/types/sanity';

// Icon mapping for CMS-driven icons
const iconMap: Record<string, LucideIcon | React.FC<{ className?: string }>> = {
  BarChart3: BarChart3,
  Users: Users,
  Building2: Building2,
  Network: Network,
  Rocket: Rocket,
  Discord: ({ className }: { className?: string }) => (
    <svg className={className || "w-5 h-5"} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  ),
};

// Default content (fallback when no CMS data)
const defaultCards: ServiceCardType[] = [
  {
    _key: 'card-1',
    icon: 'BarChart3',
    title: 'Strategy Insights',
    description: 'Data-driven market analysis and actionable intelligence for informed decisions.',
    href: '/solutions/strategy-insights',
    linkText: 'Learn more',
  },
  {
    _key: 'card-2',
    icon: 'Discord',
    title: 'Discord Community',
    description: 'Real-time alerts, market discussions, and direct access to our research team.',
    href: '/memberships',
    linkText: 'View plans',
  },
  {
    _key: 'card-3',
    icon: 'Users',
    title: 'Advisory Services',
    description: 'Portfolio review, strategy design, and risk framework development.',
    href: '/consulting',
    linkText: 'Get started',
  },
];

interface ThreeServicesCardsProps {
  data?: ThreeCardsSectionData;
}

export default function ThreeServicesCards({ data }: ThreeServicesCardsProps) {
  // Use CMS data or fallback to defaults
  const cards = data?.cards ?? defaultCards;

  // Helper to get icon component
  const getIcon = (iconName?: string) => {
    if (!iconName) return BarChart3;
    return iconMap[iconName] || BarChart3;
  };

  return (
    <section className="w-full bg-white py-12 md:py-24 px-6 md:px-12 border-t border-[#e4e4e7]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card) => {
          const IconComponent = getIcon(card.icon);
          return (
            <Link
              key={card._key}
              href={card.href}
              className="group relative border border-[#0a0a0b]/10 rounded-xl p-7 bg-[#fafafa] hover:bg-white hover:border-[#0a0a0b]/20 hover:shadow-sm flex flex-col h-full transition-all duration-300"
            >
              <div className="w-10 h-10 bg-white border border-[#e4e4e7] rounded-lg flex items-center justify-center mb-5 group-hover:border-[#0d9488]/30 transition-colors">
                <div className="text-[#0d9488]">
                  <IconComponent className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-[18px] font-semibold leading-[1.3] mb-2 tracking-tight text-[#0a0a0b]">
                {card.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-[#71717a] mb-5 flex-1">
                {card.description}
              </p>
              <div className="flex items-center gap-2 text-[#0d9488] font-medium text-[13px]">
                <span>{card.linkText || 'Learn more'}</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}