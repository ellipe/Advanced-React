import { useRouter } from 'next/router';
import React from 'react';

export default function OrderPage() {
  const router = useRouter();
  const { id } = router.query;

  return <div>Hey {id}!!!</div>;
}
