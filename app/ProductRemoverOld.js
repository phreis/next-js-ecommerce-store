'use client';
import React, { useState } from 'react';
import { removeCartItemServerAction } from './serverActions';

function ProductRemover(props) {
  const [quantity, setQuantity] = useState(1);
  return (
    <div>
      <form>
        <button
          formAction={async () => {
            await removeCartItemServerAction({ id: props.id });
          }}
        >
          Remove
        </button>
      </form>
    </div>
  );
}

export default ProductRemover;
