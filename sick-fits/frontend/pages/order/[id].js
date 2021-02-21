import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import DisplayError from '../../components/ErrorMessage';
import OrderStyles from '../../components/styles/OrderStyles';
import formatMoney from '../../lib/formatMoney';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order: Order(where: { id: $id }) {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        quantity
        price
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

export default function OrderPage() {
  const router = useRouter();
  const { id } = router.query;

  const { error, loading, data } = useQuery(SINGLE_ORDER_QUERY, {
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { order } = data;
  return (
    <OrderStyles>
      <Head>
        <title> Sick Fits - {order.id}</title>
      </Head>
      <p>
        <span>Order Id:</span>
        <span>{order.id}</span>
      </p>
      <p>
        <span>Charge:</span>
        <span>{order.charge}</span>
      </p>
      <p>
        <span>Total:</span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <p>
        <span>Items Count:</span>
        <span>{order.items.length}</span>
      </p>
      <div className="items">
        {order.items.map((orderItem) => (
          <div className="order-item" key={orderItem.id}>
            <img
              src={orderItem.photo.image.publicUrlTransformed}
              alt={orderItem.name}
            />
            <div className="item-details">
              <h2>{orderItem.name}</h2>
              <p>Qty: {orderItem.quantity}</p>
              <p>Each: {formatMoney(orderItem.price)}</p>
              <p>
                Sub Total: {formatMoney(orderItem.price * orderItem.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
}
