import Link from 'next/link';
import React from 'react';
import {
  cartFormAction,
  getCartItemsTotalPrice,
  getCartProducts,
} from '../serverActions';
import styles from './Cart.module.scss';

export default async function Cart() {
  const cartProducts = await getCartProducts();
  const subTotal = await getCartItemsTotalPrice();

  if (cartProducts.length) {
    return (
      <div>
        <form id="form" action={cartFormAction}>
          {cartProducts.map((item) => (
            <div
              className={styles.cartContainer}
              data-test-id={`cart-product-${item.product?.id}`}
              key={`product-${item.product?.id}`}
            >
              <input
                type="number"
                name={`quantity-id-${item.product?.id}`}
                defaultValue={item.quantity}
                min="1"
              />
              <button name="changeQuantity" value="" hidden={true}>
                Change quantity
              </button>
              pieces of {item.product?.name} @ {item.product?.price} each.
              Total:
              {item.product?.price ? item.quantity * item.product.price : 0}
              <button name="removeItem" value={item.product?.id}>
                Remove
              </button>
            </div>
          ))}
        </form>
        <div data-test-id="cart-total">Subtotal: {subTotal}</div>
        <div>
          <Link data-test-id="cart-checkout" role="button" href="/checkout">
            Checkout
          </Link>
          <Link role="button" href="/products">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <p>
        Your cart is empty!{' '}
        <Link role="button" href="/products">
          Continue shopping
        </Link>
      </p>
    );
  }
}
