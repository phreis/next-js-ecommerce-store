'use server';
import { cookies } from 'next/headers';
import { getCartData } from './cart/Cart.js';

export async function addCartItemServerAction(item) {
  // {product: String ,quantiy: Number}
  let newItems;

  const allItems = getCartData();

  // In case the product is the cart already, just increase the quantiy
  const productAlreadyThere = allItems.find((itm) => itm.id === item.id);
  if (productAlreadyThere) {
    productAlreadyThere.quantity += item.quantity;
    newItems = allItems;
  } else {
    newItems = [...allItems, item];
  }

  await cookies().set('cart', JSON.stringify(newItems));
}
