import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import React from 'react';
import { Product as ProductType } from '../migrations/00000-createTableProduct';
import { addCartItemServerAction, CartItemType } from './serverActions';

export default function CartItemAdder({ id }: { id: ProductType['id'] }) {
  async function addItem(formData: FormData) {
    'use server';
    /*     await addCartItemServerAction({
      id: id,
      quantity: Number(formData.get('quantity')),
    }); */

    const newCartItem: CartItemType = {
      id: id,
      quantity: Number(formData.get('quantity')),
    };

    await addCartItemServerAction(newCartItem);

    revalidatePath(`/products/${id}`); // invalidate next.js path, which results to initialized form fields on checkout page
    headers(); // Hack - to make the site refresh
    // redirect(`/products/${product.id}`);
  }
  return (
    <div>
      <form id="form" action={addItem}>
        <input
          data-test-id="product-quantity"
          type="number"
          name="quantity"
          defaultValue="1"
          min="1"
        />
        <button
          data-test-id="product-add-to-cart"
          name="intent"
          value="addItem"
        >
          Add to cart
        </button>
      </form>
    </div>
  );
}
