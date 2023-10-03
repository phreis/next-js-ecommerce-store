import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';
import { getProduct } from '../../database/products';
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

export async function getCartProducts() {
  return await Promise.all(
    getCartData().map(async (item) => {
      const [product] = await getProduct(item.id);
      return {
        product: product,
        quantity: item.quantity,
      };
    }),
  );
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
export async function getCartItemsTotalPrice() {
  let subtotal = 0;
  const cartProducts = await getCartProducts();
  cartProducts.forEach((item) => {
    subtotal += item.quantity * item.product.price;
  });
  return subtotal;
}
export default async function Cart() {
  const cartProducts = await getCartProducts();
  const subTotal = await getCartItemsTotalPrice();

  if (cartProducts.length) {
    return (
      <div>
        <ul>
          {cartProducts.map((item) => (
            <li
              data-test-id={`cart-product-${item.product.id}`}
              key={`product-${item.product.id}`}
            >
              <div data-test-id={`cart-product-quantity-${item.product.id}`}>
                {item.quantity}
              </div>
              pieces of {item.product.name} @ {item.product.price} each. Total:
              {item.quantity * item.product.price}
              <ProductRemover id={item.product.id} />
            </li>
          ))}
        </ul>
        <div data-test-id="cart-total">Subtotal: {subTotal}</div>
        <div>
          <Link data-test-id="cart-checkout" role="button" href={`/checkout`}>
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
