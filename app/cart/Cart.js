import { cookies } from 'next/headers';
import React from 'react';
import { getProduct } from '../../database/products.js';

// import { getCartItems } from '../../database/cartData.js';

export function getCartData() {
  const allItemsRaw = cookies().get('cart');
  return allItemsRaw ? JSON.parse(allItemsRaw.value) : [];
}

export function getCartProducts() {
  return getCartData().map((item) => ({
    product: getProduct(item.id),
    quantity: item.quantity,
  }));
}
export function getCartItemsTotal() {
  return getCartData().reduce((prev, curr) => ({
    quantity: prev.quantity + curr.quantity,
  })).quantity;
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

  return (
    <div>
      <ul>
        {getCartProducts().map((item) => (
          <li key={`product-${item.product.key}`}>
            {item.quantity} pieces of {item.product.name} @ {item.product.price}{' '}
            each. Total: {item.quantity * item.product.price}
          </li>
        ))}
      </ul>
      Subtotal: {getCartItemsTotalPrice()}
    </div>
  );
}

export default Cart;
