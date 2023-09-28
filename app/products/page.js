import Link from 'next/link';
import { getProducts } from '../../database/products.js';

export default function HomePage() {
  return (
    <main>
      <h1>All products</h1>
      {getProducts().map((product) => (
        <li key={`product-${product.id}`}>
          <Link href={`/products/${product.id}`}>
            {product.id} {product.name}
          </Link>
        </li>
      ))}
    </main>
  );
}
