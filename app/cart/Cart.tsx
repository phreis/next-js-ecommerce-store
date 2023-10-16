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
              className={styles.cartItem}
              data-test-id={`cart-product-${item.product?.id}`}
              key={`product-${item.product?.id}`}
            >
              {item.product?.image ? (
                <img
                  data-test-id="product-image"
                  src={item.product.image}
                  width={100}
                  height={100}
                  alt={item.product.name}
                />
              ) : (
                ''
              )}
              <div className={styles.midBlock}>
                <span>{item.product?.name}</span>
                <span className={styles.price}>{item.product?.price} €</span>
                <span className={styles.midBlockBottomLeft}>
                  <label htmlFor={`quantity-id-${item.product?.id}`}>
                    Quantity:{' '}
                  </label>
                  <input
                    className={styles.quantityInput}
                    type="number"
                    name={`quantity-id-${item.product?.id}`}
                    defaultValue={item.quantity}
                    min="1"
                  />
                  <button name="changeQuantity" value="" hidden={true}>
                    Change quantity
                  </button>
                </span>
              </div>
              <span className={styles.rightBlock}>
                <button name="removeItem" value={item.product?.id}>
                  <img
                    src="/images/icon-trashcan.png"
                    width={30}
                    height={30}
                    alt="Remove"
                  />
                </button>
                Total:{' '}
                {item.product?.price ? item.quantity * item.product.price : 0} €
              </span>
            </div>
          ))}
        </form>
        <div className={styles.subtotal} data-test-id="cart-total">
          Subtotal: {subTotal} €
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
