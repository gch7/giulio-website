import type { Metadata } from 'next';
import SolutionsPageClient from './solutions-client';

export const metadata: Metadata = {
  title: 'Solutions | Gamma Capital',
  description: 'Comprehensive investment solutions including market intelligence, Discord memberships, consulting, real estate advisory, and strategic network access.',
};

export default function SolutionsPage() {
  return <SolutionsPageClient />;
}
