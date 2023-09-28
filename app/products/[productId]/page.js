import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProduct } from '../../../database/products';
import ProductAdder from '../../ProductAdder';

export function generateMetadata({ params }) {
  const singleProduct = getProduct(Number(params.productId));

  return {
    title: singleProduct ? singleProduct.name : '',
  };
}

export default function ProductPage(props) {
  const singleProduct = getProduct(Number(props.params.productId));

  if (!singleProduct) {
    return notFound();
  }
  return (
    <div>
      This is a single product page
      <h1>{singleProduct.name}</h1>
      <ProductAdder id={singleProduct.id} />
    </div>
  );
}
