import { useRouter } from 'next/router';

function Product() {
  const router = useRouter();
  const { id } = router.query;

  return <div>Hey I'm a Single Product {id}</div>;
}

export default Product;
