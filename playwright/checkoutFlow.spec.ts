import { expect, test } from '@playwright/test';

test('E2E: Checkout flow, payment page, thank you page', async ({ page }) => {
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

  // Goto checkout page
  await page.locator('[data-test-id="cart-checkout"]').click();
  await page.waitForURL('http://localhost:3000/checkout');
  await expect(page).toHaveURL('http://localhost:3000/checkout');

  // Fill out form
  await page.locator('[data-test-id="checkout-first-name"]').click();
  await page.locator('[data-test-id="checkout-first-name"]').fill('Max');
  await page.locator('[data-test-id="checkout-first-name"]').press('Tab');
  await page.locator('[data-test-id="checkout-last-name"]').fill('Muster');
  await page.locator('[data-test-id="checkout-last-name"]').press('Tab');
  await page
    .locator('[data-test-id="checkout-email"]')
    .fill('mail@example.com');
  await page.locator('[data-test-id="checkout-email"]').press('Tab');
  await page
    .locator('[data-test-id="checkout-address"]')
    .fill('Musterstrasse 1');
  await page.locator('[data-test-id="checkout-address"]').press('Tab');
  await page.locator('[data-test-id="checkout-city"]').fill('Wien');
  await page.locator('[data-test-id="checkout-city"]').press('Tab');
  await page.locator('[data-test-id="checkout-postal-code"]').fill('1020');
  await page.locator('[data-test-id="checkout-postal-code"]').press('Tab');
  await page.locator('[data-test-id="checkout-country"]').fill('Austria');
  await page.locator('[data-test-id="checkout-country"]').press('Tab');
  await page
    .locator('[data-test-id="checkout-credit-card"]')
    .fill('1234123412341234');
  await page.locator('[data-test-id="checkout-credit-card"]').press('Tab');
  await page.locator('[data-test-id="checkout-expiration-date"]').fill('1223');
  await page.locator('[data-test-id="checkout-expiration-date"]').press('Tab');
  await page.locator('[data-test-id="checkout-security-code"]').fill('123');
  await page.locator('[data-test-id="checkout-security-code"]').press('Tab');
  await page.locator('[data-test-id="checkout-confirm-order"]').press('Enter');

  await page.waitForURL('http://localhost:3000/thankyou');
  await expect(page).toHaveURL('http://localhost:3000/thankyou');

  // Check for 'Thank you for your order' Heading
  await expect(
    await page.getByRole('heading', { name: 'Thank you for your order' }),
  ).toHaveText('Thank you for your order');

  // Check if Header has updated (set to 0)
  await expect(
    page.locator('[data-test-id="cart-checkout"] > span'),
  ).toHaveText('0');
});
