'use client';
import React, { useState } from 'react';
import { Product as ProductType } from '../migrations/00000-createTableProduct';
import { cartItemAdderFormAction, CartItemType } from './serverActions';

export default function CartItemAdder({ id }: { id: ProductType['id'] }) {
  const initialQuantity: CartItemType['quantity'] = 1;
  const [quantity, setQuantity] = useState(initialQuantity);

  return (
    <div>
      <form id="form" action={cartItemAdderFormAction}>
        <input name="id" value={id} hidden={true} readOnly={true} />
        <input
          data-test-id="product-quantity"
          type="number"
          name="quantity"
          value={quantity}
          min={1}
          onInput={(env) => setQuantity(Number(env.currentTarget.value))}
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
