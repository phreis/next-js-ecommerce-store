import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';
import { getProduct } from '../../database/products.js';
import ProductRemover from '../ProductRemover.js';

// import { getCartItems } from '../../database/cartData.js';

export function getCartData() {
  const allItemsRaw = cookies().get('cart');
  return allItemsRaw
    ? allItemsRaw.value
      ? JSON.parse(allItemsRaw.value)
      : false
    : [];
}

export function getCartProducts() {
  return getCartData().map((item) => ({
    product: getProduct(item.id),
    quantity: item.quantity,
  }));
}
export function getCartItemsTotal() {
  const cartData = getCartData();
  if (cartData) {
    return cartData.reduce(
      (prev, curr) => ({
        quantity: prev.quantity + curr.quantity,
      }),
      { quantity: 0 }, // initial Value,
    ).quantity;
  } else {
    return 0;
  }
}
export function getCartItemsTotalPrice() {
  let subtotal = 0;
  getCartProducts().forEach((item) => {
    subtotal += item.quantity * item.product.price;
  });
  return subtotal;
}
function Cart() {
  // setProductsInCart([...productsInCart], getCartItems());

  if (getCartData().length) {
    return (
      <div>
        <ul>
          {getCartProducts().map((item) => (
            <li key={`product-${item.product.id}`}>
              {item.quantity} pieces of {item.product.name} @{' '}
              {item.product.price} each. Total:{' '}
              {item.quantity * item.product.price}
              <ProductRemover id={item.product.id} />
            </li>
          ))}
        </ul>
        Subtotal: {getCartItemsTotalPrice()}
        <div>
          <Link role="button" href={`/checkout`}>
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

export default Cart;