import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

const PLANS = {
  explorer: {
    name: 'Explorer Membership',
    monthly: 4900,
    annual: 47000,
  },
  analyst: {
    name: 'Analyst Membership',
    monthly: 14900,
    annual: 143000,
  },
  institutional: {
    name: 'Institutional Membership',
    monthly: 49900,
    annual: 479000,
  },
};

export async function POST(request: Request) {
  try {
    const { plan, billing } = await request.json();

    if (!plan || !billing) {
      return NextResponse.json(
        { error: 'Missing plan or billing parameter' },
        { status: 400 }
      );
    }

    const planKey = plan as keyof typeof PLANS;
    const planData = PLANS[planKey];

    if (!planData) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      );
    }

    const isAnnual = billing === 'annual';
    const amount = isAnnual ? planData.annual : planData.monthly;
    const interval = isAnnual ? 'year' : 'month';

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: planData.name,
              description: `${isAnnual ? 'Annual' : 'Monthly'} subscription to ${planData.name}`,
            },
            unit_amount: amount,
            recurring: {
              interval,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${request.headers.get('origin')}/memberships/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/memberships`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
