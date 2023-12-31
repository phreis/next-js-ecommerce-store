'use server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getProduct } from '../database/products';
import { Product as ProductType } from '../migrations/00000-createTableProduct';

export type CartItemType = {
  id: ProductType['id'];
  quantity: number;
};

/** Returns the actual cart content from the cookie 'cart'
 */
export async function getCartDataServerAction(): Promise<CartItemType[]> {
  const allItemsRaw = await cookies().get('cart');
  return allItemsRaw
    ? allItemsRaw.value
      ? JSON.parse(allItemsRaw.value)
      : false
    : [];
}

export async function getNewItems(
  itemToBeAdded: CartItemType,
  allItems: Array<CartItemType>,
) {
  // In case the product is the cart already, just increase the quantiy
  const productAlreadyThere = allItems.find(
    (itm: CartItemType) => itm.id === itemToBeAdded.id,
  );
  if (productAlreadyThere) {
    productAlreadyThere.quantity += itemToBeAdded.quantity;
    return await allItems;
  } else {
    return await [...allItems, itemToBeAdded];
  }
}

/** Adds a CartItem to the shopping cart.
 * In case the product is the cart already, the quantiy is increased
 */
export async function addCartItemServerAction(item: CartItemType) {
  const allItems = await getCartDataServerAction();

  const newItems = await getNewItems(item, allItems);

  await cookies().set('cart', JSON.stringify(newItems));
}

/** Changes the quantity of an existing CartItem */
export async function changeCartItemServerAction(item: CartItemType) {
  let newItems;

  const allItems = await getCartDataServerAction();

  // In case the product is the cart already, just increase the quantiy
  const productAlreadyThere = allItems.find(
    (itm: CartItemType) => itm.id === item.id,
  );
  if (productAlreadyThere) {
    productAlreadyThere.quantity = item.quantity;
    newItems = allItems;
  }

  await cookies().set('cart', JSON.stringify(newItems));
}

/** Removes a CartItem from the cart */
export async function removeCartItemServerAction(id: CartItemType['id']) {
  const allItems = await getCartDataServerAction();

  const allItemsNew = allItems.filter((item: CartItemType) => item.id !== id);

  await cookies().set('cart', JSON.stringify(allItemsNew));
}
export async function clearCartItemServerAction() {
  await cookies().delete('cart');
}

/** Returns the actual shopping cart (Product and Quantity) */
export async function getCartProductsServerAction() {
  const allItems = await getCartDataServerAction();
  return await Promise.all(
    allItems.map(async (item: CartItemType) => {
      const [product] = await getProduct(item.id);
      return {
        product: product,
        quantity: item.quantity,
      };
    }),
  );
}

/** Returns the number of items in the cart */
export async function getCartItemsTotalServerAction() {
  const cartData = await getCartDataServerAction();
  if (cartData.length) {
    return cartData.reduce(
      (prev, curr) => ({
        quantity: prev.quantity + curr.quantity,
      }),
      { quantity: 0 }, // initial Value,
    ).quantity;
  } else {
    return 0;
  }
}

/** Returns the total price  of all items in the cart */
export async function getCartItemsTotalPriceServerAction() {
  let subtotal = 0;
  const cartProducts = await getCartProductsServerAction();
  cartProducts.forEach((item) => {
    if (item.product?.price) {
      subtotal += item.quantity * item.product.price;
    }
  });

  return subtotal;
}

export async function cartItemAdderFormAction(formData: FormData) {
  const id = Number(formData.get('id'));

  const newCartItem: CartItemType = {
    id: id,
    quantity: Number(formData.get('quantity')),
  };

  await addCartItemServerAction(newCartItem);

  revalidatePath(`/products/${id}`); // invalidate next.js path, which results to initialized form fields on checkout page
  // headers(); // Hack - to make the site refresh
}

/** Form Action called from Cart.jsx. Implements:
 * 1. Removing an Item from the Cart
 * 2. Changeing the cart quantity the Items in the cart according to user input
 */
export async function cartFormAction(formData: FormData) {
  const cartProducts = await getCartProductsServerAction();

  // Remove Item
  /*   fromData: (value: <idToBeDeleted>)
  { name: 'quantity-id-3', value: '3' },
  { name: 'quantity-id-5', value: '1' },
  { name: 'removeItem', value: '5' } */
  const idToBeDeleted = formData.get('removeItem');
  if (idToBeDeleted) {
    await removeCartItemServerAction(Number(idToBeDeleted));
  }

  // Change Quantity
  if (formData.has('changeQuantity')) {
    /*  formData: (value: <quantity> )
    { name: 'quantity-id-1', value: '1' },
    { name: 'changeQuantity', value: '' },
    { name: 'quantity-id-3', value: '3' } */

    for (const pair of formData.entries()) {
      const id = /quantity-id-(\d+)/g.exec(pair[0]);
      if (id) {
        // we have a quantiy form field. Did the quantity change?
        const itemIdToCheck = Number(id[1]);
        const quantityNew = Number(pair[1]);

        if (
          cartProducts.find(
            (cartProduct) =>
              cartProduct.product?.id === itemIdToCheck &&
              cartProduct.quantity !== quantityNew,
          )
        ) {
          const changedCartItem: CartItemType = {
            id: itemIdToCheck,
            quantity: quantityNew,
          };
          await changeCartItemServerAction(changedCartItem);
        }
      }
    }
  }
}
export async function checkoutFormAction() {
  await clearCartItemServerAction();

  // invalidate next.js path, which results to initialized form fields on checkout page
  revalidatePath('/checkout');
  redirect('/thankyou');
}
