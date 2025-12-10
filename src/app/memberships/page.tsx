import type { Metadata } from 'next';
import MembershipsPageClient from './memberships-client';

export const metadata: Metadata = {
  title: 'Discord Memberships | Gamma Capital',
  description: 'Join our exclusive Discord community for real-time market insights, trade alerts, and connect with sophisticated investors. Choose from Explorer, Analyst, or Institutional tiers.',
};

export default function MembershipsPage() {
  return <MembershipsPageClient />;
}
