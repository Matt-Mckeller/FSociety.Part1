# W5 — Payment & Subscriptions

> Stripe integration, free/premium tier definitions, subscription management, billing history.

**Status:** Not yet planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md)

## To Define
- Tier definitions — see [decisions.md](../decisions.md) for pricing/limits
- Free tier is **configurable** via `FREE_TIER_ENABLED` env var (default: disabled)
- Feature gating per tier
- Stripe integration (Checkout, Customer Portal, Webhooks)
- Subscription lifecycle (create, upgrade, downgrade, cancel)
- Data model: Subscription (userId, tier, stripeCustomerId, status, currentPeriodEnd), PaymentEvent
- Backend module: payment resolver, Stripe webhook handler
- Frontend components: PricingTable, CheckoutForm, BillingHistory, SubscriptionStatus
- API surface: mutations (createCheckout, cancelSubscription), queries (getSubscription, getBillingHistory)
- Dependencies: C1 (database), C2 (authentication)
- Acceptance criteria
