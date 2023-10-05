import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';
import ProductChanger from '../ProductChanger.js';
import ProductRemover from '../ProductRemover.js';
import {
  cartFormAction,
  getCartItemsTotalPrice,
  getCartProducts,
  removeCartItemServerAction,
} from '../serverActions';

// import { getCartItems } from '../../database/cartData.js';

export default async function Cart() {
  const cartProducts = await getCartProducts();
  const subTotal = await getCartItemsTotalPrice();

  if (cartProducts.length) {
    return (
      <div>
        <ul>
          <form id="form" action={cartFormAction}>
            {cartProducts.map((item) => (
              <li
                data-test-id={`cart-product-${item.product.id}`}
                key={`product-${item.product.id}`}
              >
                <input
                  type="number"
                  name={`quantity-id-${item.product.id}`}
                  defaultValue={item.quantity}
                  min="1"
                />
                <button name="changeQuantity" value="" hidden={true}>
                  Change quantity
                </button>
                pieces of {item.product.name} @ {item.product.price} each.
                Total:
                {item.quantity * item.product.price}
                <button name="removeItem" value={item.product.id}>
                  Remove
                </button>
              </li>
            ))}
          </form>
        </ul>
        <div data-test-id="cart-total">Subtotal: {subTotal}</div>
        <div>
          <Link data-test-id="cart-checkout" role="button" href={`/checkout`}>
            Checkout
          </Link>
          <Link role="button" href={`/products`}>
            Continue shopping
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <p>
        Your cart is empty!{' '}
        <Link role="button" href={`/products`}>
          Continue shopping
        </Link>
      </p>
    );
  }
}
