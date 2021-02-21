import { useState } from 'react';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import nProgress from 'nprogress';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import SickButton from './styles/SickButton';
import { useCart } from '../lib/useCart';
import { CURRENT_USER_QUERY } from '../lib/useAuth';

const stipeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

function CheckoutForm() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [checkout, { error: mutationError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  const { closeCart } = useCart();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    nProgress.start();
    setLoading(true);

    // Create payment method with stripe.
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    // handle erros
    if (error) {
      console.log('[error]', error);
      setError(error);
      return;
    }

    // send payment token to backend service
    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    });
    // finish page transition.
    nProgress.done();
    setLoading(false);

    closeCart();
    router.push({
      pathname: '/order/[id]',
      query: {
        id: order.data.checkout.id,
      },
    });
  };

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      <CardElement />
      <SickButton disabled={!stripe || loading}>Check Out Now!</SickButton>
    </CheckoutFormStyles>
  );
}

export default function Checkout() {
  return (
    <Elements stripe={stipeLib}>
      <CheckoutForm />
    </Elements>
  );
}
