import Link from 'next/link';
import React from 'react';
import { getCartItemsTotal } from './cart/Cart.js';

// TODO: get the number of items from cart

function Header() {
  return (
    <header>
      <nav>
        <div>
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
