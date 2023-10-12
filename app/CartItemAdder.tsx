'use client';
import React, { useState } from 'react';
import { Product as ProductType } from '../migrations/00000-createTableProduct';
import { cartItemAdderFormAction, CartItemType } from './serverActions';

export default function CartItemAdder({ id }: { id: ProductType['id'] }) {
  const initialQuantity: CartItemType['quantity'] = 1;
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      <form id="form" onSubmit={(ev) => ev.preventDefault}>
        <input name="id" value={id} hidden={true} />
        <input
          data-test-id="product-quantity"
          type="number"
          name="quantity"
          value={quantity}
          min={1}
          onChange={(env) => setQuantity(Number(env.currentTarget.value))}
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
