import Link from 'next/link';
import React from 'react';
import {
  cartFormAction,
  getCartItemsTotalPriceServerAction,
  getCartProductsServerAction,
} from '../serverActions';
import styles from './Cart.module.scss';

export default async function Cart() {
  const cartProducts = await getCartProductsServerAction();
  const subTotal = await getCartItemsTotalPriceServerAction();

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
              <span data-test-id={`cart-product-quantity-${item.product?.id}`}>
                {item.quantity}
              </span>
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
              <button
                data-test-id={`cart-product-remove-${item.product?.id}`}
                name="removeItem"
                value={item.product?.id}
              >
                Remove
              </button>
            </div>
          ))}
        </form>
        <div>
          Subtotal:<span data-test-id="cart-total"> {subTotal}</span>
        </div>
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
        Your cart is empty! <span data-test-id="cart-total"> {subTotal}</span>
        <Link role="button" href="/products">
          Continue shopping
        </Link>
      </p>
    );
  }
}
