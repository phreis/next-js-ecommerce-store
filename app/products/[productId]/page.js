import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProduct } from '../../../database/products';
import ProductAdder from '../../ProductAdder';

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
      <Image
        src={singleProduct.image}
        width={200}
        height={200}
        alt={singleProduct.name}
      />
      <ProductAdder id={singleProduct.id} />
    </div>
  );
}
