import Link from 'next/link';
import React from 'react';
import Cart from './Cart';
import styles from './Cart.module.scss';

function CartPage() {
  return (
    <div>
      <h1>Shopping cart</h1>
      <div className={styles.cartContainer}>
        <Cart />
      </div>
      <div className={styles.cartFooter}>
        <Link role="button" href="/products">
          Continue shopping
        </Link>
        <Link data-test-id="cart-checkout" role="button" href="/checkout">
          Checkout
        </Link>
      </div>
    </div>
  );
}

export default CartPage;
