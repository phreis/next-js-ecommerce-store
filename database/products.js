import 'server-only';

const products = [
  { id: 1, name: 'Product one', slug: 'product-one', price: 10 },
  { id: 2, name: 'Product two', slug: 'product-two', price: 10 },
  { id: 3, name: 'Product three', slug: 'product-three', price: 10 },
  { id: 4, name: 'Product four', slug: 'product-four', price: 10 },
  { id: 5, name: 'Product five', slug: 'product-five', price: 20 },
];

export function getProducts() {
  return products;
}

export function getProduct(id) {
  return products.find((product) => product.id === id);
}
