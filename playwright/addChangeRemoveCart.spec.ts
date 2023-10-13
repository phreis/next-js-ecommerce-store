import { expect, test } from '@playwright/test';

test('E2E: Add to cart, change quantity and remove from cart', async ({
  page,
}) => {
  // Goto Landing page, check for heading
  await page.goto('http://localhost:3000/');
  await expect(
    page.getByRole('heading', { name: 'Life Essentials' }),
  ).toBeVisible();

  // Goto Products
  await page.getByTestId('products-link').click();
  await page.waitForURL('http://localhost:3000/products');
  await expect(page).toHaveURL('http://localhost:3000/products');

  // Select product #1
  await page.getByTestId('product-1').click();
  await page.waitForURL('http://localhost:3000/products/1');
  await expect(page).toHaveURL('http://localhost:3000/products/1');

  // set order quantity to 10
  await page.locator('[data-test-id="product-quantity"]').click();
  await page.locator('[data-test-id="product-quantity"]').fill('10');
  await page.locator('[data-test-id="product-quantity"]').press('Enter');

  // Check if Header has updated
  await expect(
    page.locator('[data-test-id="cart-checkout"] > span'),
  ).toHaveText('10');

  // Goto shopping cart
  await page.locator('[data-test-id="cart-link"]').click();
  await page.waitForURL('http://localhost:3000/cart');
  await expect(page).toHaveURL('http://localhost:3000/cart');

  // check order quantity to be 10
  const orderedQuantity = await page.getByRole('spinbutton').inputValue();
  await expect(Number(orderedQuantity)).toBe(10);

  // Remove order item and check for text
  await page.getByRole('button', { name: 'Remove' }).click();
  // await page.getByRole('button', { name: 'Remove' }).click();
  await expect(
    await page.getByText('Your cart is empty!Continue shopping'),
  ).toHaveText('Your cart is empty!Continue shopping');
});
