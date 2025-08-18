# Loyalty Program Data Structures

This document outlines potential data structures for a future loyalty program. Implementing these fields does not affect the current checkout flow.

## Customer Metafields
- `customer.metafields.loyalty.points` (integer): total loyalty points accumulated.
- `customer.metafields.loyalty.tier` (string): membership tier such as `bronze`, `silver`, or `gold`.
- `customer.metafields.loyalty.joined_at` (datetime): timestamp when the customer joined the program.

## Order Metafields
- `order.metafields.loyalty.points_awarded` (integer): points granted for the order.
- `order.metafields.loyalty.points_redeemed` (integer): points used toward the order.

These metafields provide a foundation for tracking loyalty rewards while keeping checkout untouched until the program is activated.
