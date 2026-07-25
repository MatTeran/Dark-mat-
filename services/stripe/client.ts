import { assertStripeConfigured, env } from '../../lib/env';

/**
 * Stripe publishable configuration for @stripe/stripe-react-native.
 * Wire StripeProvider at the root once keys are available.
 */
export const stripeConfig = {
  get publishableKey(): string {
    return env.stripePublishableKey;
  },
  merchantIdentifier: 'merchant.com.darkmat.app',
  urlScheme: 'darkmat',
} as const;

export function isStripeReady(): boolean {
  return assertStripeConfigured();
}
