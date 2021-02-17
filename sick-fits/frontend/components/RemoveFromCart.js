import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from '../lib/useAuth';

const DELETE_CART_ITEM = gql`
  mutation DELETE_CART_ITEM($id: ID!) {
    deleteCartItem(id: $id) {
      id
      __typename
    }
  }
`;

const BigButton = styled.button`
  font-size: 3.5rem;
  background: none;
  border: 0;
  &:hover {
    cursor: pointer;
    color: var(--red);
  }
`;

const deleteCartItemFromApolloCache = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteCartItem));
};

export default function RemoveFromCart({ id }) {
  const [removeFromCart, { loading, data, error }] = useMutation(
    DELETE_CART_ITEM,
    {
      variables: {
        id,
      },
      update: deleteCartItemFromApolloCache,
      // optimisticResponse: {
      //   deleteCartItem: {
      //     id,
      //     __typename: 'CartItem',
      //   },
      // },
    }
  );

  return (
    <BigButton
      disabled={loading}
      type="button"
      onClick={removeFromCart}
      title="Remove this item from cart"
    >
      &times;
    </BigButton>
  );
}

RemoveFromCart.propTypes = {
  id: PropTypes.string.isRequired,
};
