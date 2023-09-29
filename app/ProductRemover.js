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
        <button name="intent" value="removeItem">
          Remove
        </button>
      </form>
    </div>
  );
}

export default ProductRemover;
