import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { format } from 'prettier';
import DisplayError from '../components/ErrorMessage';
import formatMoney from '../lib/formatMoney';
import OrderItemStyles from '../components/styles/OrderItemStyles';

const ALL_ORDERS_QUERY = gql`
  query ALL_ORDERS_QUERY {
    allOrders {
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

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
  & > li {
    cursor: pointer;
  }
`;

const countItemsInAOrder = (order) =>
  order.items.reduce((tally, item) => tally + item.quantity, 0);

export default function OrdersPage() {
  const { error, loading, data } = useQuery(ALL_ORDERS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { allOrders } = data;
  console.dir(allOrders);
  return (
    <div>
      <Head>
        <title> Sick Fits - Orders</title>
      </Head>
      <h2>You have {allOrders.length} orders!</h2>
      <OrderUl>
        {allOrders.map((order) => (
          <OrderItemStyles key={order.id}>
            <Link href={`/order/${order.id}`}>
              <a>
                <div className="order-meta">
                  <p>Items: {countItemsInAOrder(order)}</p>
                  <p>Products: {order.items.length}</p>
                  <p>Total: {formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map((item) => (
                    <img
                      key={`image-${item.id}`}
                      src={item?.photo?.image?.publicUrlTransformed}
                      alt={item.name}
                    />
                  ))}
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </div>
  );
}
