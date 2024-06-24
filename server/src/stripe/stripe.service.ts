// src/stripe/stripe.service.ts
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

import { Estimate } from 'src/estimate/entities/estimate.entity';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(
      'sk_test_51LKnmcIoW1Bc39s3o4g0BIzCjhStxA4q9AtmHqGtqu4BCQYyV9IsBo1XfKdfY3m9tKRXYx2k7fCSZ2RUT2q8prkB00iPQEp4D8',
    );
  }

  async createCheckoutSession(estimate: Estimate) {
    const session = await this.stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      invoice_creation: {
        enabled: true,
      },
      line_items: [
        {
          price_data: {
            currency: 'USD',
            product_data: {
              name: estimate.estimate_reference,
              description: estimate.estimate_date.toString().slice(0, 10),
            },
            unit_amount_decimal: (estimate.estimate_total * 100).toString(),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: estimate.customer.customer_email,
      return_url: `http://localhost:3000/estimate/return?session_id={CHECKOUT_SESSION_ID}&est_id=${estimate.id}`,
    });

    return session;
  }

  async retrieveSession(sessionId: string) {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId);
    return {
      status: session.status,
      customer_email: session.customer_details.email,
    };
  }
}
