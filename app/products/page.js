import Image from 'next/image.js';
import { getProducts } from '../../database/products';

export default async function HomePage() {
  const prod = await getProducts();
  return (
    <main>
      <h1>All products</h1>
      {prod.map((product) => (
        <li key={`product-${product.id}`}>
          <a
            data-test-id={`product-${product.id}`}
            href={`/products/${product.id}`}
          >
            {product.id} {product.name}
            <Image
              src={product.image}
              width={200}
              height={200}
              alt={product.name}
            />
          </a>
        </li>
      ))}
    </main>
  );
}
