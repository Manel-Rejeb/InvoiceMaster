// src/stripe/stripe.controller.ts
import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Public } from 'src/shared/decorators/public.decorator';
import { Estimate } from 'src/estimate/entities/estimate.entity';

@Public()
@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-checkout-session')
  async createCheckoutSession(@Body() estimate: Estimate) {
    const session = await this.stripeService.createCheckoutSession(estimate);
    return { clientSecret: session.client_secret };
  }

  @Get('session-status')
  async getSessionStatus(@Query('session_id') sessionId: string) {
    return this.stripeService.retrieveSession(sessionId);
  }
}
