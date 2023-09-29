import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { addCartItemServerAction } from './serverActions';

function ProductAdder(product) {
  async function addItem(formData) {
    'use server';
    await addCartItemServerAction({
      id: product.id,
      quantity: Number(formData.get('quantity')),
    });

    revalidatePath(`/products/${product.id}`); // invalidate next.js path, which results to initialized form fields on checkout page
    headers(); // Hack - to make the site refresh
    // redirect(`/products/${product.id}`);
  }
  return (
    <div>
      <form id="form" action={addItem}>
        <input type="number" name="quantity" defaultValue="1" min="1" />
        <button name="intent" value="addItem">
          Add to cart
        </button>
      </form>
    </div>
  );
}

export default ProductAdder;
