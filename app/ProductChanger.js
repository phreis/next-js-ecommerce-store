import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { changeCartItemServerAction } from './serverActions';

export default function ProductChanger(props) {
  async function changeItem(formData) {
    'use server';

    await changeCartItemServerAction({
      id: props.id,
      quantity: Number(formData.get('quantity')),
    });

    // revalidatePath(`/products/${product.id}`); // invalidate next.js path, which results to initialized form fields on checkout page
    // headers(); // Hack - to make the site refresh
    // redirect(`/products/${product.id}`);
  }
  return (
    <div>
      <form id="form" action={changeItem}>
        <input
          type="number"
          name="quantity"
          defaultValue={props.quantity}
          min="1"
        />
        <button name="intent" value="changeItem" hidden="true">
          Change quantity
        </button>
      </form>
    </div>
  );
}
