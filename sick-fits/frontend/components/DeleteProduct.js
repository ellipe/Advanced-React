import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const ButtonStyles = styled.button`
  cursor: pointer;
  outline: none;
  border: 0;
  border-bottom: 3px solid transparent;
  &:hover {
    border-bottom: 3px solid red;
  }
`;

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

const evictFromChache = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteProduct));
};

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: {
      id,
    },
    update: evictFromChache,
  });

  const handleDelete = () => {
    if (confirm('Do you really want to delete this product?')) {
      deleteProduct().catch(() => {
        console.log('Cannot delete this product');
      });
    }
  };

  return (
    <ButtonStyles disabled={loading} type="button" onClick={handleDelete}>
      {children}
    </ButtonStyles>
  );
}

DeleteProduct.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.any,
};
