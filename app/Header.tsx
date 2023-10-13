import Link from 'next/link';
import React from 'react';
import styles from './Header.module.scss';
import { getCartItemsTotalServerAction } from './serverActions';

async function Header() {
  const itemsTotal = await getCartItemsTotalServerAction();
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
          <Link
            className={styles.checkout}
            data-test-id="cart-checkout"
            href="/checkout"
          >
            Checkout Items total:{' '}
            <span data-test-id="cart-count">{itemsTotal}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
