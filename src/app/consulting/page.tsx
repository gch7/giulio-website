import type { Metadata } from 'next';
import ConsultingPageClient from './consulting-client';

export const metadata: Metadata = {
  title: 'Consulting Services | Gamma Capital',
  description: 'Expert investment consulting services including portfolio review, strategy design, and risk framework development. Work directly with experienced analysts.',
};

export default function ConsultingPage() {
  return <ConsultingPageClient />;
}
