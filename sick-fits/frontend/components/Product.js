import PropTypes from 'prop-types';
import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';
import useAuth from '../lib/useAuth';
import AddToCart from './AddToCart';

export default function Product({ product }) {
  const { user } = useAuth();
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product?.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      {user && (
        <div className="buttonList">
          <Link
            href={{
              pathname: '/update',
              query: {
                id: product.id,
              },
            }}
          >
            Edit Me
          </Link>
          <AddToCart id={product.id} />
          <DeleteProduct id={product.id}>Delete</DeleteProduct>
        </div>
      )}
    </ItemStyles>
  );
}

Product.propTypes = {
  product: PropTypes.object,
};
