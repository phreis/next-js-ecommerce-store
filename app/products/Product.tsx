import { Product as ProductType } from '../../migrations/00000-createTableProduct';
import styles from './Product.module.scss';

export default function Product({ product }: { product: ProductType }) {
  return (
    <div className={styles.productContainer}>
      <a
        data-test-id={`product-${product.id}`}
        href={`/products/${product.id}`}
      >
        {product.image ? (
          <img
            src={product.image}
            width={100}
            height={100}
            alt={product.name}
          />
        ) : (
          ''
        )}
        <div className={styles.priceTag}>
          <div className={styles.productName}>{product.name}</div>
          <div className={styles.productPrice}>Price {product.price} €</div>
        </div>
      </a>
    </div>
  );
}
