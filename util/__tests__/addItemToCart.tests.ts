// Unit: Test add new Item to cart

import { expect, test } from '@jest/globals';
import { CartItemType, getNewItems } from '../../app/serverActions';

test('add new Item to cart', async () => {
  const existingItems: CartItemType[] = [
    {
      id: 1,
      quantity: 1,
    },
    {
      id: 2,
      quantity: 10,
    },
  ];
  const itemToBeAdded: CartItemType = {
    id: 2,
    quantity: 10,
  };

  expect(await getNewItems(itemToBeAdded, existingItems)).toStrictEqual([
    {
      id: 1,
      quantity: 1,
    },
    {
      id: 2,
      quantity: 20,
    },
  ]);
});
