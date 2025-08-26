// /api/create-checkout-session.ts
import Stripe from 'stripe';

export const config = {
  runtime: 'nodejs',
};

// This function handles the creation of a Stripe Checkout session.
export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return new Response(JSON.stringify({ error: 'Stripe secret key not configured.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  // Get the origin URL from the request headers.
  const origin = req.headers.get('origin') || 'http://localhost:3000';

  try {
    // Create a Checkout Session from the request body.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'MominAI Pro Plan',
              description: 'Unlimited app deployments and premium support.',
            },
            unit_amount: 2000, // $20.00 in cents
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      // Redirect URLs after payment.
      success_url: `${origin}/?dashboard=true`,
      cancel_url: `${origin}/`,
    });

    // Return the session ID to the client.
    return new Response(JSON.stringify({ sessionId: session.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    const error = err as Error;
    console.error(`Stripe Error: ${error.message}`);
    return new Response(JSON.stringify({ error: { message: error.message } }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}