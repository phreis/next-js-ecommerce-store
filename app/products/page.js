import Link from 'next/link';
import { getProducts } from '../../database/products';

export default async function HomePage() {
  const prod = await getProducts();
  return (
    <main>
      <h1>All products</h1>
      {prod.map((product) => (
        <li key={`product-${product.id}`}>
          <Link href={`/products/${product.id}`}>
            {product.id} {product.name}
          </Link>
        </li>
      ))}
    </main>
  );
}
