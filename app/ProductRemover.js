import React from 'react';
import { removeCartItemServerAction } from './serverActions';

function ProductRemover(props) {
  async function removeItem() {
    'use server';
    await removeCartItemServerAction({ id: props.id });
  }

  return (
    <div>
      <form action={removeItem}>
        <button
          data-test-id={`cart-product-remove-${props.id}`}
          name="intent"
          value="removeItem"
        >
          Remove
        </button>
      </form>
    </div>
  );
}

export default ProductRemover;
