import Link from 'next/link';
import React from 'react';
import {
  getCartDataServerAction,
  getCartItemsTotalPriceServerAction,
} from '../serverActions';
import CheckoutForm from './CheckoutForm';

export default async function CheckoutPage() {
  const subTotal = await getCartItemsTotalPriceServerAction();
  const cardData = await getCartDataServerAction();

  return (
    <div>
      <h1>Checkout</h1>

      {cardData.length ? (
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
