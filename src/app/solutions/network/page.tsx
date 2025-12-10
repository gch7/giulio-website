import type { Metadata } from 'next';
import NetworkClient from './network-client';

export const metadata: Metadata = {
  title: 'Strategic Network | Gamma Capital',
  description: 'Access exclusive deal flow, institutional connections, and curated investment opportunities through our strategic network.',
};

export default function NetworkPage() {
  return <NetworkClient />;
}
