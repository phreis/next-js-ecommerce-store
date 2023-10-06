import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProduct } from '../../../database/products';
import CartItemAdder from '../../CartItemAdder';

export async function generateMetadata({ params }) {
  const singleProduct = await getProduct(Number(params.productId));

  return {
    title: singleProduct ? singleProduct.name : '',
  };
}

export default async function ProductPage(props) {
  const [singleProduct] = await getProduct(Number(props.params.productId));

  if (!singleProduct) {
    return notFound();
  }
  return (
    <div>
      This is a single product page
      <h1>{singleProduct.name}</h1>
      <img
        data-test-id="product-image"
        src={singleProduct.image}
        width={300}
        height={300}
        alt={singleProduct.name}
      />
      <p data-test-id="product-price">Price: {singleProduct.price}</p>
      <CartItemAdder id={singleProduct.id} />
    </div>
  );
}
