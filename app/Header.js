import Link from 'next/link';
import React from 'react';
import { getCartItemsTotal } from './cart/Cart.js';
import styles from './Header.module.scss';

function Header() {
  return (
    <header>
      <nav>
        <div className={styles.links}>
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/cart">Shopping cart</Link>
          <Link href="/checkout">Checkout</Link>
        </div>
      </nav>
      Items total: {getCartItemsTotal()}
    </header>
  );
}

export default Header;
