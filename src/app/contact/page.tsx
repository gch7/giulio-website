import type { Metadata } from 'next';
import ContactPageClient from './contact-client';

export const metadata: Metadata = {
  title: 'Contact Us | Gamma Capital',
  description: 'Get in touch with Gamma Capital. Contact us about Discord memberships, consulting services, or general inquiries. We respond within 24-48 hours.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
