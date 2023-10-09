import { notFound } from 'next/navigation';
import { getProduct } from '../../../database/products';
import CartItemAdder from '../../CartItemAdder';

type Props = {
  params: { productId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props) {
  const [singleProduct] = await getProduct(Number(params.productId));

  return {
    title: singleProduct ? singleProduct.name : '',
  };
}

export default async function ProductPage({ params }: Props) {
  const [singleProduct] = await getProduct(Number(params.productId));

  if (!singleProduct) {
    return notFound();
  }
  return (
    <div>
      This is a single product page
      <h1>{singleProduct.name}</h1>
      {singleProduct.image ? (
        <img
          data-test-id="product-image"
          src={singleProduct.image}
          width={300}
          height={300}
          alt={singleProduct.name}
        />
      ) : (
        ''
      )}
      <p data-test-id="product-price">Price: {singleProduct.price}</p>
      <CartItemAdder id={singleProduct.id} />
    </div>
  );
}
