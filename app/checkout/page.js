import Link from 'next/link';
import React from 'react';
import { getCartData, getCartItemsTotalPrice } from '../cart/Cart.js';
import CheckoutForm from './CheckoutForm.js';

export default async function CheckoutPage() {
  const subTotal = await getCartItemsTotalPrice();
  return (
    <div>
      <h1>Checkout</h1>

      {getCartData().length ? (
        <>
          Subtotal:{subTotal}
          <CheckoutForm />
        </>
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
