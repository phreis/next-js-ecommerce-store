import 'server-only';
import { cache } from 'react';
import { sql } from './connect';

//import { getProduct } from './products';

// type id: number;

type Product = {
  id: number;
  name: string;
  image: string;
  slug: string;
  price: number;
};

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

export const getProducts = cache(async () => {
  return await sql<Product[]>`
    SELECT * FROM products
  `;
});

export const getProduct = cache(async (id: Product['id']) => {
  return await sql<Product[]>`
    SELECT * FROM products WHERE id = ${id};
  `;
});
