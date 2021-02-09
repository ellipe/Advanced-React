import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import Head from 'next/head';
import styled from 'styled-components';
import DisplayError from './ErrorMessage';

export const GET_PRODUCT = gql`
  query GET_PRODUCT($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const SingleProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  max-width: var(--maxWidth);
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

function SingleProduct({ id }) {
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading</p>;
  if (error) return <DisplayError error={error} />;

  const { Product } = data;

  return (
    <SingleProductStyles>
      <Head>
        <title>Sick Fits | {Product.name}</title>
      </Head>
      <img src={Product.photo.image.publicUrlTransformed} alt={Product.name} />
      <div className="details">
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
      </div>
    </SingleProductStyles>
  );
}

SingleProduct.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SingleProduct;
