import Link from 'next/link';
import React from 'react';
import { getCartData } from '../cart/Cart.js';
import CheckoutForm from './CheckoutForm.js';

function CheckoutPage() {
  return (
    <div>
      <h1>Checkout</h1>
      {getCartData().length ? (
        <CheckoutForm />
      ) : (
        <p>
          Your cart is empty!{' '}
          <Link role="button" href="/products">
            Continue shopping
          </Link>
        </p>
      )}
    </div>
  );
}

export default CheckoutPage;
