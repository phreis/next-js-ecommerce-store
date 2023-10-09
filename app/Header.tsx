import Link from 'next/link';
import React from 'react';
import styles from './Header.module.scss';
import { getCartItemsTotal } from './serverActions';

async function Header() {
  const itemsTotal = await getCartItemsTotal();
  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <Link href="/">Home</Link>
          <Link data-test-id="products-link" href="/products">
            Products
          </Link>
        </div>
        <div className={styles.right}>
          <Link
            className={styles.shoppingCart}
            data-test-id="cart-link"
            href="/cart"
          >
            Shopping cart
          </Link>
          <Link className={styles.checkout} href="/checkout">
            Checkout{' '}
            <span data-test-id="cart-count">Items total: {itemsTotal}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
