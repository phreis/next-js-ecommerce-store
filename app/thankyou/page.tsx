import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: {
    default: 'Thank you for your order',
  },
};

function ThankYouPage() {
  const zeroDrone = 0;
  return (
    <div>
      <h1>Thank you for your order</h1>
      <span data-test-id="cart-total">{zeroDrone}</span>
      <p>
        <Link role="button" href="/products">
          Continue shopping
        </Link>
      </p>
    </div>
  );
}

export default ThankYouPage;
