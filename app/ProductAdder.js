'use client';
import React, { useState } from 'react';
import { addCartItemServerAction } from './serverActions';

async function addCartItem(item) {
  await addCartItemServerAction(item);
}

function ProductAdder(product) {
  const [quantity, setQuantity] = useState(1);
  return (
    <div>
      <form>
        <input
          type="number"
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
        />
        <button
          formAction={async () => {
            await addCartItem({ id: product.id, quantity: quantity });
          }}
        >
          Add to cart
        </button>
      </form>
    </div>
  );
}

export default ProductAdder;
