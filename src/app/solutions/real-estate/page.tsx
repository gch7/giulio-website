import type { Metadata } from 'next';
import RealEstateClient from './real-estate-client';

export const metadata: Metadata = {
  title: 'Real Estate Advisory | Gamma Capital',
  description: 'Strategic real estate investment guidance including market analysis, due diligence, and investment strategy development for property investments.',
};

export default function RealEstatePage() {
  return <RealEstateClient />;
}
