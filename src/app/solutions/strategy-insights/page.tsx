import type { Metadata } from 'next';
import StrategyInsightsClient from './strategy-insights-client';

export const metadata: Metadata = {
  title: 'Strategy Insights | Gamma Capital',
  description: 'Actionable market intelligence and data-driven analysis including market research, technical signals, risk assessment, and opportunity identification.',
};

export default function StrategyInsightsPage() {
  return <StrategyInsightsClient />;
}
