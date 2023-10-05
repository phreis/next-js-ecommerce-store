import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';
import { getProduct } from '../../database/products';
import ProductChanger from '../ProductChanger.js';
import ProductRemover from '../ProductRemover.js';
import {
  changeCartItemServerAction,
  removeCartItemServerAction,
} from '../serverActions';

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

  async function cartFormAction(formData) {
    'use server';

    /*     await changeCartItemServerAction({
      id: props.id,
      quantity: Number(formData.get('quantity')),
    }); */
    // console.log(cartProducts);
    // console.log(formData);
    //Remove Item
    const idToBeDeleted = formData.get('removeItem');
    if (idToBeDeleted) {
      await removeCartItemServerAction(Number(idToBeDeleted));
    }
    //console.log(cartProducts);
    //cartProducts.forEach(async (elem) => console.log(elem));

    // Change Quantity
    if (formData.has('changeQuantity')) {
      // Display the key/value pairs
      for (const pair of formData.entries()) {
        //console.log(`${pair[0]}, ${pair[1]}`);
        const id = /quantity-id-(\d+)/g.exec(pair[0]);
        if (id) {
          //we have a qunatiy form field. Did quantity change?
          const itemIdToCheck = Number(id[1]);
          const quantity_new = Number(pair[1]);

          for (const cartProduct of cartProducts) {
            if (
              cartProduct.product.id === itemIdToCheck &&
              cartProduct.quantity !== quantity_new
            ) {
              await changeCartItemServerAction(
                cartProduct.product.id,
                quantity_new,
              );
            }
          }

          /*         const test = cartProducts.find(
            (itm) => itm.product.id === itemIdToCheck,
          ); */

          //console.log(cartProducts);
          //cartProducts.forEach((elem) => console.log(elem));

          /*           if (
            cartProducts.find(
              (itm) =>
                itm.product.id === itemIdToCheck &&
                itm.quantity !== quantity_new,
            )
          ) {
            // await changeCartItemServerAction(itm.product.id, quantity_new);
          } */
        }
      }
    }

    //  { name: 'quantity-id-1', value: '3' },
    //  { name: 'intent', value: 'changeItem' },
    //  { name: 'quantity-id-3', value: '5' }
    //
    //                   name={`{ id: ${item.product.id}, quantity: ${item.quantity}}`}
  }

  if (cartProducts.length) {
    return (
      <div>
        <ul>
          <form id="form" action={cartFormAction}>
            {cartProducts.map((item) => (
              <li
                data-test-id={`cart-product-${item.product.id}`}
                key={`product-${item.product.id}`}
              >
                <input
                  type="number"
                  name={`quantity-id-${item.product.id}`}
                  defaultValue={item.quantity}
                  min="1"
                />
                <button name="changeQuantity" value="" hidden={true}>
                  Change quantity
                </button>
                pieces of {item.product.name} @ {item.product.price} each.
                Total:
                {item.quantity * item.product.price}
                <button name="removeItem" value={item.product.id}>
                  Remove
                </button>
              </li>
            ))}
          </form>
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
