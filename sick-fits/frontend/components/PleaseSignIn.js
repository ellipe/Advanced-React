import React from 'react';
import useAuth from '../lib/useAuth';
import SignIn from './SignIn';

export default function PleaseSignIn({ children }) {
  const { user } = useAuth();

  if (!user) return <SignIn />;
  return children;
}
