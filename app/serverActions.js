'use server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getProduct } from '../database/products';

export async function getCartData() {
  const allItemsRaw = cookies().get('cart');
  return allItemsRaw
    ? allItemsRaw.value
      ? JSON.parse(allItemsRaw.value)
      : false
    : [];
}

export async function addCartItemServerAction(item) {
  let newItems;

  const allItems = await getCartData();

  // In case the product is the cart already, just increase the quantiy
  const productAlreadyThere = allItems.find((itm) => itm.id === item.id);
  if (productAlreadyThere) {
    productAlreadyThere.quantity += item.quantity;
    newItems = allItems;
  } else {
    newItems = [...allItems, item];
  }

  await cookies().set('cart', JSON.stringify(newItems));
}

export async function changeCartItemServerAction(id, quantity) {
  let newItems;

  const allItems = await getCartData();

  // In case the product is the cart already, just increase the quantiy
  const productAlreadyThere = allItems.find((itm) => itm.id === id);
  if (productAlreadyThere) {
    productAlreadyThere.quantity = quantity;
    newItems = allItems;
  }

  await cookies().set('cart', JSON.stringify(newItems));
}

export async function removeCartItemServerAction(id) {
  const allItems = await getCartData();

  const allItemsNew = allItems.filter((item) => item.id !== id);

  await cookies().set('cart', JSON.stringify(allItemsNew));
}
export async function clearCartItemServerAction() {
  await cookies().delete('cart');
}

export async function getCartProducts() {
  const allItems = await getCartData();
  if (allItems) {
    return await Promise.all(
      allItems.map(async (item) => {
        const [product] = await getProduct(item.id);
        return {
          product: product,
          quantity: item.quantity,
        };
      }),
    );
  }
}

export async function getCartItemsTotal() {
  const cartData = await getCartData();
  if (cartData) {
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

export async function getCartItemsTotalPrice() {
  let subtotal = 0;
  const cartProducts = await getCartProducts();
  if (cartProducts) {
    cartProducts.forEach((item) => {
      subtotal += item.quantity * item.product.price;
    });
  }

  return subtotal;
}
export async function cartFormAction(formData) {
  const cartProducts = await getCartProducts();

  cartProducts.forEach((elem) => console.log(elem));

  //Remove Item
  const idToBeDeleted = formData.get('removeItem');
  if (idToBeDeleted) {
    await removeCartItemServerAction(Number(idToBeDeleted));
  }
  //console.log(cartProducts);
  //cartProducts.forEach(async (elem) => console.log(elem));

  // Change Quantity
  if (formData.has('changeQuantity')) {
    // Display the key/value pairs
    for (const pair of formData.entries()) {
      //console.log(`${pair[0]}, ${pair[1]}`);
      const id = /quantity-id-(\d+)/g.exec(pair[0]);
      if (id) {
        //we have a qunatiy form field. Did quantity change?
        const itemIdToCheck = Number(id[1]);
        const quantity_new = Number(pair[1]);

        for (const cartProduct of cartProducts) {
          if (
            cartProduct.product.id === itemIdToCheck &&
            cartProduct.quantity !== quantity_new
          ) {
            await changeCartItemServerAction(
              cartProduct.product.id,
              quantity_new,
            );
          }
        }
      }
    }
  }
}
export async function checkoutFormAction(formData) {
  await clearCartItemServerAction();

  //    console.log(formData);
  revalidatePath('/checkout'); // invalidate next.js path, which results to initialized form fields on checkout page
  redirect('/thankyou');
}
