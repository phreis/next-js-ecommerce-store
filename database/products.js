import 'server-only';

const products = [
  {
    id: 1,
    name: 'Product one',
    image: '/images/product01.jpg',
    slug: 'product-one',
    price: 10,
  },
  {
    id: 2,
    name: 'Product two',
    image: '/images/product02.jpg',
    slug: 'product-two',
    price: 10,
  },
  {
    id: 3,
    name: 'Product three',
    image: '/images/product03.jpg',
    slug: 'product-three',
    price: 10,
  },
  {
    id: 4,
    name: 'Product four',
    image: '/images/product04.jpg',
    slug: 'product-four',
    price: 10,
  },
  {
    id: 5,
    name: 'Product five',
    image: '/images/product05.jpg',
    slug: 'product-five',
    price: 20,
  },
];

export function getProducts() {
  return products;
}

export function getProduct(id) {
  return products.find((product) => product.id === id);
}
