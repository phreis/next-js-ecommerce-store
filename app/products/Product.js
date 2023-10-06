import Image from 'next/image.js';
import styles from './Product.module.scss';

export default function Product(props) {
  return (
    <div className={styles.productContainer}>
      <a
        data-test-id={`product-${props.product.id}`}
        href={`/products/${props.product.id}`}
      >
        <Image
          src={props.product.image}
          width={100}
          height={100}
          alt={props.product.name}
        />
        <div className={styles.priceTag}>
          <div className={styles.productName}>{props.product.name}</div>
          <div className={styles.productPrice}>
            Price {props.product.price} €
          </div>
        </div>
      </a>
    </div>
  );
}
