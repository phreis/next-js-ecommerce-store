import Link from 'next/link';
import React from 'react';
import styles from './Header.module.scss';
import { getCartItemsTotal } from './serverActions.js';

async function Header() {
  const itemsTotal = await getCartItemsTotal();
  return (
    <header>
      <nav>
        <div className={styles.links}>
          <Link href="/">Home</Link>
          <Link data-test-id="products-link" href="/products">
            Products
          </Link>
          <Link data-test-id="cart-link" href="/cart">
            Shopping cart
          </Link>
          <Link href="/checkout">Checkout</Link>
        </div>
      </nav>
      <div data-test-id="cart-count">Items total: {itemsTotal}</div>
    </header>
  );
}

export default Header;
