import { useRouter } from 'next/router';
import SingleProduct from '../../components/SingleProduct';

function Product() {
  const router = useRouter();
  const { id } = router.query;

  return <SingleProduct id={id} />;
}

export default Product;
