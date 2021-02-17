import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from '../lib/useAuth';
import { useCart } from '../lib/useCart';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

export default function AddToCart({ id }) {
  const { openCart } = useCart();

  const [addToCart, { loading, data, error }] = useMutation(
    ADD_TO_CART_MUTATION,
    {
      variables: {
        id,
      },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  const addProductToCart = async () => {
    await addToCart();
    openCart(); // challenge
  };

  return (
    <button disabled={loading} type="button" onClick={addProductToCart}>
      Add{loading && 'ing'} To Cart
    </button>
  );
}

AddToCart.propTypes = {
  id: PropTypes.string.isRequired,
};
