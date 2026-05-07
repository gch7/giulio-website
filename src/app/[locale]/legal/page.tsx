import type { Metadata } from 'next';
import NavigationHeader from '@/components/sections/navigation-header';
import Footer from '@/components/sections/footer';
import { sanityFetch } from '@/sanity/lib/client';
import { SITE_SETTINGS_QUERY, UI_STRINGS_QUERY } from '@/sanity/lib/queries';
import type { SiteSettings, UIStrings } from '@/types/sanity';
import type { Locale } from '@/i18n/config';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'it' ? 'Note Legali | Gamma Capital' : 'Legal Notice | Gamma Capital',
    description:
      locale === 'it'
        ? 'Note legali e disclaimer Gamma Capital ai sensi della LSerFi e della LIsFi.'
        : 'Gamma Capital legal notice and disclaimer under FinSA and FinIA.',
  };
}

const content = {
  it: {
    title: 'Avviso Legale',
    intro:
      "Gamma Capital è uno studio di education quantitativa e tecnologia per i mercati. Non è autorizzata dall'Autorità federale di vigilanza sui mercati finanziari (FINMA) come istituto finanziario. Non figura nel registro svizzero dei consulenti alla clientela.",
    notDoTitle: 'Cosa NON facciamo',
    notDo: [
      "Non prestiamo consulenza in investimenti ai sensi della Legge sui servizi finanziari (LSerFi/FinSA).",
      "Non gestiamo patrimoni di clienti ai sensi della Legge sugli istituti finanziari (LIsFi/FinIA).",
      "Non eseguiamo ordini per conto di clienti, non offriamo brokeraggio, non riceviamo né trasmettiamo ordini.",
      "Non rilasciamo raccomandazioni personali concernenti operazioni con strumenti finanziari.",
      "Non valutiamo l'adeguatezza o l'idoneità di operazioni rispetto al profilo finanziario di alcun individuo.",
      "Non costruiamo algoritmi che operano sui conti dei clienti.",
    ],
    doTitle: 'Cosa facciamo',
    doList: [
      "Pubblichiamo contenuti educativi (masterclass, materiale didattico, tutorial) sui mercati finanziari, le opzioni, i flussi istituzionali, l'AI quantitativa.",
      "Offriamo strumenti tecnologici self-service che presentano dati di mercato in modo neutrale.",
      "Distribuiamo research e market commentary in modo identico a tutti gli abbonati di un determinato livello.",
      "Manteniamo una community privata su Discord per discussione collaborativa.",
    ],
    riskTitle: 'Avvertenza sui rischi',
    risk:
      "Investire in strumenti finanziari, inclusi opzioni, prodotti strutturati e digital assets, comporta rischio significativo di perdita. Le performance passate non sono indicative di risultati futuri. Ogni decisione operativa è di esclusiva responsabilità di chi la prende. Per consulenza personalizzata rivolgersi a consulenti finanziari registrati nel registro svizzero o a istituti autorizzati FINMA.",
    lastUpdatedLabel: 'Ultimo aggiornamento',
    lastUpdated: '2026',
  },
  en: {
    title: 'Legal Notice',
    intro:
      "Gamma Capital is a quant education and technology studio for the markets. It is not authorised by the Swiss Financial Market Supervisory Authority (FINMA) as a financial institution. It is not registered in the Swiss client adviser register.",
    notDoTitle: 'What we do NOT do',
    notDo: [
      "We do not provide investment advice under the Financial Services Act (FinSA / LSerFi).",
      "We do not manage client assets under the Financial Institutions Act (FinIA / LIsFi).",
      "We do not execute orders on behalf of clients, do not provide brokerage, do not receive or transmit orders.",
      "We do not issue personal recommendations regarding transactions in financial instruments.",
      "We do not assess the suitability or appropriateness of transactions against the financial profile of any individual.",
      "We do not build algorithms that operate on client accounts.",
    ],
    doTitle: 'What we do',
    doList: [
      "We publish educational content (masterclasses, learning material, tutorials) on financial markets, options, institutional flow, and quantitative AI.",
      "We offer self-service technology tools that present market data neutrally.",
      "We distribute research and market commentary identically to all subscribers of a given tier.",
      "We maintain a private Discord community for collaborative discussion.",
    ],
    riskTitle: 'Risk warning',
    risk:
      "Investing in financial instruments — including options, structured products, and digital assets — involves substantial risk of loss. Past performance is not indicative of future results. Every operational decision is the sole responsibility of the person making it. For personalised advice, please refer to financial advisers registered in the Swiss register or to FINMA-authorised institutions.",
    lastUpdatedLabel: 'Last updated',
    lastUpdated: '2026',
  },
};

export default async function LegalPage({ params }: PageProps) {
  const { locale } = await params;

  const [siteSettings, uiStrings] = await Promise.all([
    sanityFetch<SiteSettings | null>({
      query: SITE_SETTINGS_QUERY,
      params: { locale },
      tags: ['siteSettings'],
    }),
    sanityFetch<UIStrings | null>({
      query: UI_STRINGS_QUERY,
      params: { locale },
      tags: ['uiStrings'],
    }),
  ]);

  const t = content[locale === 'it' ? 'it' : 'en'];

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <NavigationHeader siteSettings={siteSettings} uiStrings={uiStrings} />
      <main>
        <section className="w-full bg-[#fafafa] py-10 md:py-20 px-6 md:px-12">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2563EB]/10 border border-[#2563EB]/20 rounded-full mb-5">
                <span className="text-[12px] font-medium text-[#2563EB] tracking-wide uppercase">
                  FINMA · LSerFi · LIsFi
                </span>
              </div>
              <h1 className="text-[32px] md:text-[48px] font-display font-medium tracking-[-0.03em] leading-[1.15] mb-6 text-[#111827]">
                {t.title}
              </h1>
              <p className="text-[15px] md:text-[17px] text-[#6B7280] leading-relaxed">
                {t.intro}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-10 border border-[#E5E7EB] mb-6">
              <h2 className="text-[20px] md:text-[24px] font-display font-semibold text-[#111827] mb-5">
                {t.notDoTitle}
              </h2>
              <ul className="space-y-3">
                {t.notDo.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#2563EB] flex-shrink-0" />
                    <span className="text-[14px] md:text-[15px] text-[#374151] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-10 border border-[#E5E7EB] mb-6">
              <h2 className="text-[20px] md:text-[24px] font-display font-semibold text-[#111827] mb-5">
                {t.doTitle}
              </h2>
              <ul className="space-y-3">
                {t.doList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#2563EB] flex-shrink-0" />
                    <span className="text-[14px] md:text-[15px] text-[#374151] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#0A1A2F] to-[#111827] rounded-2xl p-6 md:p-10 text-white mb-6">
              <h2 className="text-[20px] md:text-[24px] font-display font-semibold mb-5">
                {t.riskTitle}
              </h2>
              <p className="text-[14px] md:text-[15px] text-white/80 leading-relaxed">
                {t.risk}
              </p>
            </div>

            <p className="text-[12px] text-[#9CA3AF] text-center mt-8">
              {t.lastUpdatedLabel}: {t.lastUpdated}
            </p>
          </div>
        </section>
      </main>
      <Footer siteSettings={siteSettings} />
    </div>
  );
}
