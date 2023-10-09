import { getProducts } from '../../database/products';
import Product from './Product';
import styles from './Product.module.scss';

export default async function ProductsPage() {
  const prod = await getProducts();
  return (
    <main>
      <h1>All products</h1>
      <div className={styles.productGrid}>
        {prod.map((product) => (
          <div key={`product-${product.id}`}>
            <Product product={product} />
          </div>
        ))}
      </div>
    </main>
  );
}
